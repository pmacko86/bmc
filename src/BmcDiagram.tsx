import Svg, {
  G,
  Text,
  TSpan,
  Path,
} from 'react-native-svg';

import * as math from "mathjs";

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


/**
 * Class representing SVG transform.
 */
class SvgTransform {
  matrix: math.Matrix;

  constructor(matrix?: math.Matrix) {
    if (matrix) {
      this.matrix = matrix;
    }
    else {
      this.matrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]], "dense");
    }
  }

  static fromTranslate(x: number, y: number): SvgTransform {
    let m = math.matrix([[1, 0, x], [0, 1, y], [0, 0, 1]], "dense");
    return new SvgTransform(m);
  }

  static fromScale(x: number, y?: number): SvgTransform {
    let yy = y === undefined ? x : y;
    let m = math.matrix([[x, 0, 0], [0, yy, 0], [0, 0, 1]], "dense");
    return new SvgTransform(m);
  }

  clone(): SvgTransform {
    let m = this.matrix;
    return new SvgTransform(m);
  }

  then(second: SvgTransform | null) {
    if (second === null) return this.clone();
    let m = math.multiply(second.matrix, this.matrix) as math.Matrix;
    return new SvgTransform(m);
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

    let v = math.matrix([[x], [y], [1]]);
    let r = math.multiply(this.matrix, v) as math.Matrix;
    let p = { x: r.get([0, 0]), y: r.get([1, 0]) };
    return p;
  }

  static parse(s: string): SvgTransform {
    let r = new SvgTransform();
    let parts = s.split(/\)[^a-zA-Z0-9]*/);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      let [fn, t] = parts[i].split("(", 2);
      let params = t.split(/ +/);
      if (fn === "translate" && params.length === 2) {
        let x = parseFloat(params[0]);
        let y = parseFloat(params[1]);
        r = r.then(SvgTransform.fromTranslate(x, y));
      }
      if (fn === "scale" && params.length === 1) {
        let x = parseFloat(params[0]);
        r = r.then(SvgTransform.fromScale(x, x));
      }
      if (fn === "scale" && params.length === 2) {
        let x = parseFloat(params[0]);
        let y = parseFloat(params[1]);
        r = r.then(SvgTransform.fromScale(x, y));
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


type DraggableTextProps = {
  text: string;
  style: {};
}


type DraggableTextState = {
  pan: Animated.ValueXY;
}


class DraggableText
extends React.Component<DraggableTextProps, DraggableTextState> {

  deltaPosition: XY;
  panResponder: PanResponderInstance | undefined;

  constructor(props: DraggableTextProps) {
    super(props);
    this.deltaPosition = { x: 0, y: 0 };
    this.state = { pan: new Animated.ValueXY() };
  }


  UNSAFE_componentWillMount() {
    this.deltaPosition = { x: 0, y: 0 };
    this.state.pan.addListener((value) => this.deltaPosition = value);
    this.state.pan.setValue({ x: 0, y: 0 });
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


  render() {
    if (!this.panResponder) return null;
    return (
      <Animated.Text
        selectable={false}
        style={[this.props.style, {
          transform: this.state.pan.getTranslateTransform(),
        }]}
        {...this.panResponder.panHandlers}
        >{this.props.text}</Animated.Text>);
  }
}


type BmcDiagramProps = {
  book: string;
  testMode?: boolean;
}


type BmcDiagramState = {
  layout: Layout | null;
}

export default class BmcDiagram
extends React.Component<BmcDiagramProps, BmcDiagramState> {

  svg: any;
  texts: SvgText[];


  constructor(props: BmcDiagramProps) {
    super(props);
    this.state = {
      layout: null,
    };

    this.svg = DATA[this.props.book.replace(/ /g, "_")];
    this.texts = !(this.svg && this.svg.childs) ? new Array<SvgText>(0) :
      (this.svg.childs.map((c: any) => this.extractSvgText(c))).flat();
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
          transform = transform.then(SvgTransform.parse(svg.attrs.transform));
        }
        if (svg.attrs.x || svg.attrs.y) {
          transform = transform.then(SvgTransform.fromTranslate(
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

    if (!this.props.testMode) {
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
    }

    return null;
  }


  /**
   * Render the component.
   */
  render() {

    const windowDimensions = Dimensions.get('window');
    if (windowDimensions.width <= 0) return;


    // Validate the SVG and fetch the view box

    if (!this.svg || this.svg.type !== "Svg") return;
    if (!this.svg.attrs || !this.svg.attrs.viewBox) return;
    const svgViewBox = this.svg.attrs.viewBox
      .split(/[, ]+/).map((v: any) => parseFloat(v));
    if (svgViewBox.length !== 4) return;


    // Compute the scale

    let svgWidth = windowDimensions.width;
    if (svgWidth > svgViewBox[2]) svgWidth = svgViewBox[2];
    let svgHeight = 1.0 * svgWidth * svgViewBox[3] / svgViewBox[2];
    let scale = 1.0 * svgWidth / svgViewBox[2];


    // Compute the layout transform

    let layoutTransform: SvgTransform;
    if (!this.state.layout) {
      layoutTransform = new SvgTransform();
    }
    else {
      let tm = SvgTransform.fromTranslate(this.state.layout.x,
        this.state.layout.y);
      let sm = SvgTransform.fromScale(scale);
      layoutTransform = tm.then(sm);
    }


    // Render

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
            viewBox={this.svg.attrs.viewBox}>
            {this.svg.childs.map((c: any) => this.renderSvg(c))}
          </Svg>
        {/*<Animated.View
          style={{ transform: this.state.pan.getTranslateTransform(),
            background: "lime"
           }}
          {...this.panResponder.panHandlers}>
        </Animated.View>*/}
      </View>
      {this.props.testMode && this.texts.map(t => {
        let fontSize = parseFloat(t.attrs.fontSize || "16") * scale;
        let location = t.transform.then(layoutTransform)
          .apply(0, -fontSize / scale);
        return (
          <DraggableText
            text={t.text}
            style={{
              position: "absolute",
              left: location.x,
              top: location.y,
              color: t.attrs.fill || "black",
              fontSize: fontSize,
            }}
            />);
        })}
      </View>
    );
  }
}
