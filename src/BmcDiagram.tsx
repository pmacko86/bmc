import Svg, {
  G,
  Text,
  TSpan,
  Path,
} from 'react-native-svg';

// Use this if you are using Expo
//import { Svg } from 'expo';
//const { Circle, Rect } = Svg;

//import Svg, { Circle, Rect } from 'react-native-svg';


import React from 'react';
import {
  //StyleSheet,
  View,
  PanResponderInstance,
  PanResponder,
  Animated,
  //Text,
  Dimensions
} from "react-native";


const DATA = require("./assets/diagrams.json");


type XY = {
  x: number;
  y: number;
}

type Layout = {
  x: number;
  y: number;
  height: number;
  width: number;
}


type BmcDiagramProps = {
  book: string;
}


type BmcDiagramState = {
  pan: Animated.ValueXY;
  layout: Layout | null;
}



/**
 * Class representing SVG transform.
 */
class SvgTransform {
  translate: XY;

  // TODO: Switch this to matrices?

  constructor() {
    this.translate = { x: 0, y: 0 };
  }

  clone(): SvgTransform {
    let r = new SvgTransform();
    r.translate = { x: this.translate.x, y: this.translate.y };
    return r;
  }

  merge(other: SvgTransform | null) {
    let r = this.clone();
    if (other === null) return r;
    r.translate.x += other.translate.x;
    r.translate.y += other.translate.y;
    return r;
  }

  apply(x: XY): XY;
  apply(x: number, y: number): XY;
  apply(p0: XY | number, p1?: number): XY {

    let x, y;
    if (typeof p0 === "number" && typeof p1 === "number") {
      x = p0;
      y = p1;
    }
    else if (typeof p0 === "object") {
      x = (p0 as XY).x;
      y = (p0 as XY).y;
    }
    else {
      x = 0;
      y = 0;
    }

    let r = { x: this.translate.x + x, y: this.translate.y + y };
    return r;
  }

  static fromTranslate(x: number, y: number): SvgTransform {
    let r = new SvgTransform();
    r.translate.x = x;
    r.translate.y = y;
    return r;
  }

  static parse(s: string): SvgTransform {
    let r = new SvgTransform();
    let parts = s.split(/\)[^a-zA-Z0-9]*/);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      let [fn, t] = parts[i].split("(", 2);
      let params = t.split(/ +/);
      if (fn === "translate" && params.length === 2) {
        r.translate.x = parseFloat(params[0]);
        r.translate.y = parseFloat(params[1]);
      }
    }
    return r;
  }
}



class SvgText {

  text: string;
  attrs: any;
  transform: SvgTransform;

  constructor(text: string, attrs: any, transform: SvgTransform) {
    this.text = text;
    this.attrs = attrs;
    this.transform = transform;
  }
}



export default class BmcDiagram
extends React.Component<BmcDiagramProps, BmcDiagramState> {

  _val: XY;
  panResponder: PanResponderInstance | undefined;
  _c: any;
  _v: View | undefined | null;


  constructor(props: BmcDiagramProps) {
    super(props);
    this._val = { x:0, y:0 }
    this.state = {
      pan: new Animated.ValueXY(),
      layout: null,
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 };
    this.state.pan.addListener((value) => this._val = value);
    this.state.pan.setValue({ x:0, y:0 });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        //console.log(gesture);
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 10
        }).start();
      }
    });
  }


  /**
   * Extract text.
   *
   * @param [any] svg the SVG JSON to render
   */
  extractSvgText(svg: any): SvgText[] {

    let r = new Array<SvgText>();

    const fn = (
      svg: any,
      transformSoFar: SvgTransform | null,
      textAttrs: any | null,
    ) => {

      // Determine the new transform

      let transform = transformSoFar || new SvgTransform();
      if (svg.attrs) {
        if (svg.attrs.transform) {
          transform = transform.merge(SvgTransform.parse(svg.attrs.transform));
        }
        if (svg.attrs.x || svg.attrs.y) {
          transform = transform.merge(SvgTransform.fromTranslate(
            svg.attrs.x ? parseFloat(svg.attrs.x) : 0,
            svg.attrs.y ? parseFloat(svg.attrs.y) : 0));
        }
      }


      // Recurse into containers

      if (svg.type === "G") {
        if (svg.childs) {
          svg.childs.map((c: any) => fn(c, transform, null));
        }
      }


      // Handle the text component and the text spans

      if (svg.type === "Text" || svg.type === "TSpan"
        || svg.name === "tspan") {
        if (!svg.childs) return;
        let a = textAttrs ? Object.assign({}, textAttrs) : {};
        if (svg.attrs) {
          for (const k of Object.keys(svg.attrs)) {
            a[k] = svg.attrs[k];
          }
        }
        svg.childs.map((c: any) => fn(c, transform, a));
      }


      // Handle the actual text

      if (svg.text && textAttrs) {
        r.push(new SvgText(svg.text, textAttrs, transform));
      }
    };

    fn(svg, null, null);
    return r;
  }


  /**
   * Render a SVG component.
   *
   * @param [any] svg the SVG JSON to render
   */
  renderSvg(svg: any) {

    if (svg.text) return svg.text;


    // Fix up attributes

    let attrs = svg.attrs;
    if (attrs === null || attrs === undefined) attrs = {};
    if (attrs.fontSize) {
      attrs = Object.assign({}, attrs);
      attrs.fontSize += "px";
    }


    // Render and recurse

    if (svg.type === "G") {
      return (
        <G {...attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </G>
      );
    }

    if (svg.type === "Path") {
      return (
        <Path {...attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </Path>
      );
    }

    if (svg.type === "Text") {
      return (
        <Text {...attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </Text>
      );
    }

    if (svg.type === "TSpan" || svg.name === "tspan") {
      return (
        <TSpan {...attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </TSpan>
      );
    }

    return null;
  }


  /**
   * Render the component.
   */
  render() {
    if (this.panResponder === undefined) return;

    const windowDimensions = Dimensions.get('window');
    if (windowDimensions.width <= 0) return;

    const svg = DATA[this.props.book.replace(/ /g, "_")];
    if (!svg || svg.type !== "Svg") return;
    if (!svg.attrs || !svg.attrs.viewBox) return;
    const svgViewBox = svg.attrs.viewBox
      .split(/[, ]+/).map((v: any) => parseFloat(v));
    if (svgViewBox.length !== 4) return;

    let svgWidth = windowDimensions.width;
    if (svgWidth > svgViewBox[2]) svgWidth = svgViewBox[2];
    let svgHeight = 1.0 * svgWidth * svgViewBox[3] / svgViewBox[2];

    //console.log(this.state.layout);
    //console.log(windowDimensions);

    // eslint-disable-next-line
    let texts: SvgText[] =
      (svg.childs.map((c: any) => this.extractSvgText(c))).flat();
    //console.log(texts);

    // TODO: Add scale
    // eslint-disable-next-line
    let layoutTransform = this.state.layout
      ? SvgTransform.fromTranslate(this.state.layout.x, this.state.layout.y)
      : new SvgTransform();

    return (
      <View>
        <View
          onLayout={e => {
            //style={{ width: svgWidth, height: svgHeight }}
            // Get the absolute position, so that we can then
            // position floatable components relative to it.
            // (or: Should we be using method "measure"?)
            this.setState({ layout: e.nativeEvent.layout });
          }}>
          <Svg
            width={svgWidth}
            height={svgHeight}
            viewBox={svg.attrs.viewBox}>
            {svg.childs.map((c: any) => this.renderSvg(c))}
          </Svg>
        {/*<Animated.View
          style={{ transform: this.state.pan.getTranslateTransform(),
            background: "lime"
           }}
          {...this.panResponder.panHandlers}>
        </Animated.View>*/}
      </View>
      {/*texts.map(t => {
        // TODO Adjust the font size given the layout transform
        let fontSize = parseFloat(t.attrs.fontSize || "16");
        let location = t.transform.merge(layoutTransform)
          .apply(0, -fontSize);
        return (
          <Animated.Text
            style={{
              position: "absolute",
              left: location.x,
              top: location.y,
              color: "green",
              fontSize: fontSize,
            }}>{t.text}</Animated.Text>);
        })*/}
      </View>
    );
  }
}
