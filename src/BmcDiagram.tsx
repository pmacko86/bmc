import React from 'react';
import {
  Dimensions,
  LayoutRectangle,
  View,
} from "react-native";
import * as ReactNative from "react-native";
import Svg, {
  G,
  Text,
  TSpan,
  Path,
} from 'react-native-svg';

import Draggable from './Draggable';
import MeasureComponents from './MeasureComponents';
import SvgTransform from './SvgTransform';

// TODO Use this instead when not running in Expo
// import TextSize from 'react-native-text-size';


/**
 * The diagram data (SVGs converted to a single JSON).
 */
const DATA = require("./assets/diagrams.json");

/**
 * The font size to use when there is no size specified.
 */
const DEFAULT_FONT_SIZE = 14;


/**
 * Point coordinates.
 */
type XY = {
  x: number;
  y: number;
}


/**
 * A text extracted from the SVG.
 */
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
    this.fontSize = parseFloat(this.attrs.fontSize || "" + DEFAULT_FONT_SIZE);
    this.location = transform.apply(0, -this.fontSize);
    this.color = this.attrs.fill || "black";
  }
}


type BmcDiagramProps = {
  book: string;
  testMode?: boolean;
}


type BmcDiagramState = {
  layout?: LayoutRectangle;
  testLayouts?: LayoutRectangle[];
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

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    this.texts.sort((a, b) => {
      if (a.color !== b.color) return a.color < b.color ? -1 : 1;
      return collator.compare(a.text, b.text);
    });


    // Set the initial state

    this.state = {
      layout: undefined,
      correctTextLocation: correctTextLocation,
    };
  }


  /**
   * Compute the test layouts
   *
   * @param [LayoutRectangle[]] layouts the layouts with dimensions filled in.
   */
  doTestLayout(layouts: LayoutRectangle[]) {
    if (this.props.testMode && this.svgViewBox) {
      let tx = this.svgViewBox.x + this.svgViewBox.width;
      let ty = this.svgViewBox.y;
      let widest = 0;
      let paddingX = 15;
      let paddingY = 5;
      this.texts.forEach((t, i) => {
        t.testLocation = { x: tx, y: ty };
        ty += t.fontSize + paddingY;
        if (layouts[i].width > widest) widest = layouts[i].width;
        if (this.svgViewBox &&
          ty + t.fontSize > this.svgViewBox.y + this.svgViewBox.height) {
          ty = this.svgViewBox.y;
          tx += paddingX  + widest;
          widest = 0;
        }
      });
      this.setState({
        testLayouts: layouts,
      });
    }
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
  renderSvg(svg: any, key?: any) {

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
        <G key={key} {...attrs}>
          {svg.childs
            && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
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
        <Path key={key} {...attrs}>
          {svg.childs
            && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
        </Path>
      );
    }

    if (!this.props.testMode) {
      if (svg.type === "Text") {
        return (
          <Text key={key} {...attrs}>
            {svg.childs
              && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </Text>
        );
      }

      if (svg.type === "TSpan" || svg.name === "tspan") {
        return (
          <TSpan key={key} {...attrs}>
            {svg.childs
              && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
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
            {this.svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </Svg>
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
          <Draggable
            key={index}
            disabled={!atTestLocation}
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
            }}>
            <ReactNative.Text
              selectable={false}
              style={{
                color: t.color,
                fontSize: fontSize,
                letterSpacing: -1,
              }}
              >{t.text}</ReactNative.Text>
          </Draggable>);
        })}
        {this.props.testMode && !this.state.testLayouts &&
          <MeasureComponents onMeasure={layouts => this.doTestLayout(layouts)}>
            {this.props.testMode && this.texts.map((t, index) => {
              return (
                <ReactNative.Text
                  key={index}
                  style={{letterSpacing: -1}}
                  >{t.text}</ReactNative.Text>)
            })}
          </MeasureComponents>}
      </View>
    );
  }
}
