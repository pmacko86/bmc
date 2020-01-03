import React from 'react';
import {
  Dimensions,
  LayoutRectangle,
  Text,
  View,
} from "react-native";

import Svg from 'react-native-svg';
import * as SvgComponent from 'react-native-svg';

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
 * A text span
 */
class SvgTextSpan {

  text: string;
  attrs: any;
  transform: SvgTransform;

  color: string;
  origin: XY;
  scale: number;
  fontSize: number;
  fontSizeScaled: number;


  /**
   * The constructor.
   *
   * @param [string] text the text
   * @param [any] attrs the attributes
   * @param [SvgTransform] transform the transform
   */
  constructor(text: string, attrs: any, transform: SvgTransform) {

    this.text = text;
    this.attrs = attrs;
    this.transform = transform;


    // Derrived attributes

    this.color = this.attrs.fill || "black";
    this.fontSize = this.attrs.fontSize
      ? parseFloat(this.attrs.fontSize) : DEFAULT_FONT_SIZE;
    const vectorOne = this.transform.apply(1, 0);
    this.origin = this.transform.apply(0, 0);
    this.scale = Math.sqrt((vectorOne.x - this.origin.x)**2
      + (vectorOne.y - this.origin.y)**2);
    this.fontSizeScaled = this.fontSize * this.scale;
    this.origin.y -= this.fontSizeScaled;
  }


  /**
   * Get the location.
   *
   * @return [XY] the location.
   */
  location() {
    return this.origin;
  }


  /**
   * Render using React Native (not SVG).
   *
   * @param [any] key the key.
   * @param [number] scale the scale.
   * @param [boolean] ignoreLocation whether to ignore location.
   * @return [React.Component] the rendered component.
   */
  renderNative(key: any, scale: number = 1, ignoreLocation: boolean = false) {
    return (
      <Text
        key={key}
        selectable={false}
        style={[
          {
            color: this.color,
            fontSize: scale * this.fontSizeScaled,
            letterSpacing: -1,
          },
          !ignoreLocation ? {
            position: "absolute",
            left: scale * this.origin.x,
            top: scale * this.origin.y,
          } : {},
        ]}
        >{this.text.replace(/ /g, "\u00a0" /* &nbsp; */)}</Text>
    );
  }
}


/**
 * A text component extracted from the SVG, which can consist of zero
 * or more text spans.
 */
class SvgText {

  svg: {[key: string]: any};
  text: string;
  attrs: any;
  transform: SvgTransform;

  location: XY;
  fontSize: number;
  color: string;
  textSpans: SvgTextSpan[];

  testLocation?: XY;


  /**
   * The constructor.
   *
   * @oaram [{[key: string]: any}] svg the SVG
   * @param [SvgTransform] transform the transform
   */
  constructor(svg: {[key: string]: any}, transform: SvgTransform) {

    this.svg = svg;
    this.transform = transform;

    this.text = this.extractText(svg);
    this.attrs = svg.attrs;
    this.location = transform.apply(0, 0);

    // TODO Remove these
    this.fontSize = parseFloat(this.attrs.fontSize || "" + DEFAULT_FONT_SIZE);
    this.color = this.attrs.fill || "black";


    // Extract the individual text spans

    const locationTransform
      = SvgTransform.fromTranslate(-this.location.x, -this.location.y);
    this.textSpans = [];

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
        this.textSpans.push(new SvgTextSpan(svg.text, textAttrs,
          transform.then(locationTransform)));
      }
    };

    fn(this.svg, null, this.attrs);
  }


  /**
   * Extract the text (e.g. for sorting)
   *
   * @param [any] svg the SVG
   * @return [string] the extracted text
   */
  extractText(svg: any): string {

    if (svg.text) return svg.text;

    if (svg.type === "Text"
      || svg.type === "TSpan" || svg.name === "tspan") {
      if (svg.childs) {
        return svg.childs
          .map((c: any) => this.extractText(c))
          .reduce((t: string, c: string) => t + c, "");
      }
    }

    return "";
  }


  /**
   * Render using React Native (not SVG).
   *
   * @param [any] key the key.
   * @param [number] scale the scale.
   * @return [React.Component] the rendered component.
   */
  renderNative(key?: any, scale: number = 1) {
    return (
      <View
        key={key}
        style={{
          position: "relative"
        }}>
        {this.textSpans.map((s, i) => s.renderNative(i, scale))}
      </View>
    );
  }


  /**
   * Create a component for measurement.
   *
   * @param [any] key the key.
   * @param [number] scale the scale.
   * @return [React.Component] the rendered component.
   */
  renderMeasurementComponent(key?: any, scale: number = 1) {
    return (
      <MeasureComponents key={key} onMeasure={l => l/*this.handleMeasure(l)*/}>
        {this.textSpans.map((s, i) => s.renderNative(i, scale, true))}
      </MeasureComponents>
    );
  }
}


type SvgTextComponentProps = {
  text: SvgText;
  scale?: number;
}


type SvgTextComponentState = {
  spanLayouts?: LayoutRectangle[];
  overallLayout?: LayoutRectangle;
}


/**
 * A component for rendering a collection of SVG text spans.
 */
class SvgTextComponent
extends React.Component<SvgTextComponentProps, SvgTextComponentState> {

  /**
   * The constructor.
   *
   * @param [SvgTextComponentProps] props the properties.
   */
  constructor(props: SvgTextComponentProps) {
    super(props);
    this.state = {};
  }


  /**
   * Handle the measurement.
   *
   * @param [LayoutRectangle[]] layouts the layouts with dimensions filled in.
   */
  handleMeasure(layouts: LayoutRectangle[]) {
    var overall: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
    for (var i = 0; i < layouts.length; i++) {
      var p = this.props.text.textSpans[i].location();
      overall.width = Math.max(overall.width, layouts[i].width + p.x);
      overall.height = Math.max(overall.height, layouts[i].height + p.y);
    }
    this.setState({
      spanLayouts: layouts,
      overallLayout: overall,
    });
  }


  /**
   * Render the component.
   */
  render() {
    const scale = this.props.scale === undefined ? 1 : this.props.scale;
    return (
      <View
        style={{
          position: "relative",
          width: this.state.overallLayout
            ? this.state.overallLayout.width * scale + 1 : undefined,
          height: this.state.overallLayout
            ? this.state.overallLayout.height * scale : undefined,
        }}>
        {this.state.overallLayout
          && (this.props.text.textSpans.map((s, i) => s.renderNative(i, scale)))}
        <MeasureComponents key={-1} onMeasure={l => this.handleMeasure(l)}>
          {this.props.text.textSpans.map((s, i) => s.renderNative(i, 1, true))}
        </MeasureComponents>
      </View>
    );
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
        ty += layouts[i].height + paddingY;
        if (layouts[i].width > widest) widest = layouts[i].width;
        if (this.svgViewBox &&
          ty + layouts[i].height > this.svgViewBox.y + this.svgViewBox.height) {
          ty = this.svgViewBox.y;
          tx += paddingX + widest;
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
          svg.childs.map((c: any) => fn(c, transform));
        }
      }


      // Handle the text component

      if (svg.type === "Text") {
        r.push(new SvgText(svg, transform));
      }
    };

    fn(svg, null);
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
        <SvgComponent.G key={key} {...attrs}>
          {svg.childs
            && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
        </SvgComponent.G>
      );
    }

    if (svg.type === "Path") {
      if (attrs.d) {
        // TODO Split at Z instead to fix iOS rendering problems?
        attrs = Object.assign({}, attrs);
        attrs.d = attrs.d.replace("z", " Z ");
      }
      return (
        <SvgComponent.Path key={key} {...attrs}>
          {svg.childs
            && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
        </SvgComponent.Path>
      );
    }

    if (!this.props.testMode) {
      if (svg.type === "Text") {
        return (
          <SvgComponent.Text key={key} {...attrs}>
            {svg.childs
              && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </SvgComponent.Text>
        );
      }

      if (svg.type === "TSpan" || svg.name === "tspan") {
        return (
          <SvgComponent.TSpan key={key} {...attrs}>
            {svg.childs
              && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </SvgComponent.TSpan>
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
            {this.state.testLayouts && <SvgTextComponent
              text={t}
              scale={scale}
              />}
          </Draggable>);
        })}
        {this.props.testMode && !this.state.testLayouts &&
          <MeasureComponents onMeasure={layouts => this.doTestLayout(layouts)}>
            {this.props.testMode && this.texts.map((t, index) => {
              return <SvgTextComponent
                text={t}
                scale={scale}
                />;
            })}
          </MeasureComponents>}
      </View>
    );
  }
}
