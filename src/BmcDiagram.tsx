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
  Animated,
  Dimensions,
  LayoutRectangle,
  PanResponder,
  PanResponderInstance,
  View,
} from "react-native";
import * as ReactNative from "react-native";


const DATA = require("./assets/diagrams.json");


type XY = {
  x: number;
  y: number;
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

  location: XY;
  fontSize: number;
  color: string;

  testLocation?: XY;

  constructor(text: string, attrs: any, transform: SvgTransform) {
    this.text = text;
    this.attrs = attrs;
    this.transform = transform;
    this.fontSize = parseFloat(this.attrs.fontSize || "16");
    this.location = transform.apply(0, -this.fontSize);
    this.color = this.attrs.fill || "black";
  }
}


type DraggableTextProps = {
  text: string;
  draggable?: boolean;
  dropLocation?: LayoutRectangle;
  dropLocationRelative?: View | ReactNative.Text | null;
  onDropToLocation?: () => void;
  style: {};
}


type DraggableTextState = {
  pan: Animated.ValueXY;
}


class DraggableText
extends React.Component<DraggableTextProps, DraggableTextState> {

  ref: ReactNative.Text | null;

  deltaPosition: XY;
  panResponder: PanResponderInstance | undefined;


  constructor(props: DraggableTextProps) {
    super(props);
    this.deltaPosition = { x: 0, y: 0 };
    this.ref = null;
    this.state = { pan: new Animated.ValueXY() };
  }


  onRelease(gestureX: number, gestureY: number,
    relativeX: number, relativeY: number) {

    if (!this.props.dropLocation) {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 10
      }).start();
      return;
    }

    const gx = gestureX;
    const gy = gestureY;
    const dlx = this.props.dropLocation.x + relativeX;
    const dly = this.props.dropLocation.y + relativeY;

    if (gx >= dlx && gx < dlx + this.props.dropLocation.width
      && gy >= dly && gy < dly + this.props.dropLocation.height) {
      if (this.props.onDropToLocation) this.props.onDropToLocation();
    }
    else {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 10
      }).start();
    }
  }


  UNSAFE_componentWillMount() {
    this.deltaPosition = { x: 0, y: 0 };
    if (this.props.draggable) {
      this.state.pan.addListener((value) => this.deltaPosition = value);
      this.state.pan.setValue({ x: 0, y: 0 });
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          const gx = gesture.moveX;
          const gy = gesture.moveY;
          if (this.ref) {
            this.ref.measure((textX, textY, textW, textH, textPX, textPY) => {
              const dx = gx - textPX;
              const dy = gy - textPY;
              if (this.props.dropLocationRelative) {
                this.props.dropLocationRelative.measure(
                  (x, y, w, h, px, py) => {
                    this.onRelease(gx, gy, px + dx, py + dy);
                  }
                );
              }
              else {
                this.onRelease(gx, gy, dx, dy);
              }
            });
          }
        }
      });
    }
  }


  render() {
    let panHandlers = this.panResponder ? this.panResponder.panHandlers : [];
    return (
      <Animated.View
        style={{
          transform: !this.props.draggable
            ? null : this.state.pan.getTranslateTransform(),
          // @ts-ignore
          position: this.props.style.position,
          // @ts-ignore
          left: this.props.style.left,
          // @ts-ignore
          top: this.props.style.top,
        }}
        {...panHandlers}>
        <ReactNative.Text
          ref={r => { this.ref = r; }}
          selectable={false}
          style={[this.props.style, {
            position: "relative",
            left: 0,
            top: 0,
          }]}
          >{this.props.text}</ReactNative.Text>
      </Animated.View>);
  }
}


type BmcDiagramProps = {
  book: string;
  testMode?: boolean;
}


type BmcDiagramState = {
  layout?: LayoutRectangle;
  correctTextLocation: boolean[];
}


/**
 * The BMC diagram + a version for testing.
 *
 * This diagram is based on an SVG converted to the JSON format.
 */
export default class BmcDiagram
extends React.Component<BmcDiagramProps, BmcDiagramState> {

  svg: any;
  svgView: View | null;
  svgViewBox: LayoutRectangle | undefined;
  texts: SvgText[];


  /**
   * Create an instance of class BmcDiagram.
   *
   * @oaram [BmcDiagramProps] props the properties
   */
  constructor(props: BmcDiagramProps) {
    super(props);
    this.svgView = null;


    // Fetch and validate the SVG

    this.svg = DATA[this.props.book.replace(/ /g, "_")];
    if (!this.svg || this.svg.type !== "Svg") this.svg = null;


    // Fetch and parse the view box

    if (this.svg && this.svg.attrs && this.svg.attrs.viewBox) {
      const v = this.svg.attrs.viewBox.split(/[, ]+/)
        .map((v: any) => parseFloat(v));
      if (v.length === 4) {
        this.svgViewBox = {
          x: v[0],
          y: v[1],
          width: v[2],
          height: v[3],
        };
      }
    }


    // Extract the labels, so that they can be draggable.

    this.texts = !(this.svg && this.svg.childs) ? new Array<SvgText>(0) :
      (this.svg.childs.map((c: any) => this.extractSvgText(c))).flat();

    let correctTextLocation = new Array<boolean>(this.texts.length);
    for (let i = 0; i < correctTextLocation.length; i++) {
      correctTextLocation[i] = !this.props.testMode;
    }


    // Compute label locations, both for the diagram and for testing.

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    this.texts.sort((a, b) => {
      if (a.color !== b.color) return a.color < b.color ? -1 : 1;
      return collator.compare(a.text, b.text);
    });

    if (this.props.testMode && this.svgViewBox) {
      let tx = this.svgViewBox.x + this.svgViewBox.width;
      let ty = this.svgViewBox.y;
      let paddingY = 5;
      this.texts.forEach(t => {
        t.testLocation = { x: tx, y: ty };
        ty += t.fontSize + paddingY;
      });
    }


    // Set the initial state

    this.state = {
      layout: undefined,
      correctTextLocation: correctTextLocation,
    };
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
      if (attrs.d) {
        // TODO Split at Z instead to fix iOS rendering problems?
        attrs = Object.assign({}, attrs);
        attrs.d = attrs.d.replace("z", " Z ");
      }
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
    if (!this.svg || !this.svgViewBox) return;


    // Compute the scale

    let svgWidth = windowDimensions.width;
    if (svgWidth > this.svgViewBox.width) svgWidth = this.svgViewBox.width;
    let svgHeight = 1.0 * svgWidth
      * this.svgViewBox.height / this.svgViewBox.width;
    let scale = 1.0 * svgWidth / this.svgViewBox.width;


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
          ref={r => { this.svgView = r; }}
          onLayout={e => {
            // Get the absolute position, so that we can then
            // position floatable components relative to it.
            /*if (this.svgView) {
              this.svgView.measure((x, y, width, height, px, py) => {
                console.log([x, y, px, py])
                this.setState({ layout: {
                  x: px,
                  y: py,
                  width: width,
                  height: height,
                }});
              });
            }*/
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
      {this.props.testMode && this.texts.map((t, index) => {
        let atTestLocation = !this.state.correctTextLocation[index];
        let fontSize = t.fontSize * scale;
        let location = layoutTransform.apply(
          atTestLocation && t.testLocation ? t.testLocation : t.location);
        let dropLocation = undefined;
        if (atTestLocation && t.testLocation) {
          dropLocation = layoutTransform.apply(t.location);
        }
        return (
          <DraggableText
            text={t.text}
            draggable={atTestLocation}
            dropLocation={dropLocation && {
              x: dropLocation.x-50,
              y: dropLocation.y-50,
              width: 100,
              height: 100
            }}
            dropLocationRelative={this.svgView}
            onDropToLocation={() => {
              let v = this.state.correctTextLocation.slice(0);
              v[index] = true;
              this.setState({ correctTextLocation: v });
            }}
            style={{
              position: "absolute",
              left: location.x,
              top: location.y,
              color: t.color,
              fontSize: fontSize,
            }}
            />);
        })}
      </View>
    );
  }
}
