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
  fontFamily: string;
  fontSize: number;
  fontSizeScaled: number;

  layout?: LayoutRectangle; // will be filled out asynchronously


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
    this.fontFamily = this.attrs.fontFamily || "Helvetica";
    this.fontSize = this.attrs.fontSize
      ? parseFloat(this.attrs.fontSize) : DEFAULT_FONT_SIZE;
    const vectorOne = this.transform.apply(1, 0);
    this.origin = this.transform.apply(0, 0);
    this.scale = Math.sqrt((vectorOne.x - this.origin.x)**2
      + (vectorOne.y - this.origin.y)**2);
    this.fontSizeScaled = this.fontSize * this.scale;
    this.origin.y -= this.fontSizeScaled;


    // If we have textLength, take advantage of it.

    if (this.attrs.textLength) {
      this.layout = {
        x: this.origin.x,
        y: this.origin.y,
        width: this.attrs.textLength,
        height: this.fontSize + 2,
      };
    }
  }


  /**
   * Get the location.
   *
   * @return [XY] the location.
   */
  get location(): XY {
    return this.origin;
  }


  /**
   * Clone.
   *
   * @return [SvgTextSpan] the cloned span.
   */
  clone(): SvgTextSpan {
    let r = new SvgTextSpan(this.text, this.attrs, this.transform);
    r.layout = this.layout;
    return r;
  }


  /**
   * Render using React Native (not SVG).
   *
   * @param [any] key the key.
   * @param [number] scale the scale.
   * @param [boolean] ignoreLocation whether to ignore location.
   * @param [boolean] asHint whether to render this as a hint.
   * @return [React.Component] the rendered component.
   */
  renderNative(key: any, scale: number = 1,
    ignoreLocation: boolean = false, asHint: boolean = false) {
    return (
      <Text
        key={key}
        selectable={false}
        style={[
          {
            color: !asHint ? this.color : "transparent",
            fontFamily: this.fontFamily,
            fontSize: scale * this.fontSizeScaled,
            //letterSpacing: -1,
          },
          !ignoreLocation ? {
            position: "absolute",
            left: scale * this.origin.x,
            top: scale * this.origin.y + 2,   // Everything seems shifted...
          } : {},
          !asHint ? {} : {
            textShadowColor: this.color,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: scale * this.fontSizeScaled * 2 / 3,
          },
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

  //svg: {[key: string]: any};
  //attrs: any;
  //transform: SvgTransform;
  text: string;

  location: XY;
  fontSize: number;
  color: string;
  textSpans: SvgTextSpan[];

  testLocation?: XY;
  layout?: LayoutRectangle;   // will be filled out asynchronously
  draggable?: Draggable | null;


  /**
   * The constructor.
   *
   * @oaram [{[key: string]: any}] svg the SVG
   * @param [SvgTransform] transform the transform
   */
  constructor(svg: {[key: string]: any}, transform: SvgTransform) {

    //this.svg = svg;
    //this.transform = transform;
    //this.attrs = svg.attrs;

    this.text = this.extractText(svg);
    this.location = transform.apply(0, 0);


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

        // Fix types

        if (textAttrs.textLength) {
          textAttrs.textLength = parseFloat(textAttrs.textLength);
        }


        // Add
        
        this.textSpans.push(new SvgTextSpan(svg.text, textAttrs,
          transform.then(locationTransform)));
      }
    };

    fn(svg, null, svg.attrs);


    // Base these on text spans

    const firstSpan = this.textSpans.length > 0 ? this.textSpans[0] : undefined;
    this.fontSize = firstSpan ? firstSpan.fontSize : DEFAULT_FONT_SIZE;
    this.color = firstSpan ? firstSpan.color : "black";


    // If we already know the layouts of all spans, take advantage of it.

    if (this.textSpans.map(t => !!t.layout).reduce((t, c) => t && c, true)) {
      this.layout = {
        x: this.location.x,
        y: this.location.y,
        width: 0,
        height: 0,
      }
      this.textSpans.forEach(t => {
        if (!t.layout || !this.layout) return;
        this.layout.width =
          Math.max(this.layout.width, t.layout.x + t.layout.width);
        this.layout.height =
          Math.max(this.layout.height, t.layout.y + t.layout.height);
      });
    }
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
   * Clone.
   *
   * @return [SvgText] the clone.
   */
  clone(): SvgText {
    let r = Object.create(this);
    r.location = { x: this.location.x, y: this.location.y };
    r.textSpans = this.textSpans.slice(0);
    return r;
  }


  /**
   * Merge with another component.
   *
   * @param [SvgText] other the other component.
   */
  merge(other: SvgText) {

    // TODO: This requires that "this" comes before "other." Fix that.

    let sameLine = Math.abs(this.location.y - other.location.y) <= 2;

    if (!sameLine) this.text += " ";
    this.text += other.text;

    var locationTransformForThis: SvgTransform;
    if (other.location.x >= this.location.x) {
      locationTransformForThis = new SvgTransform();
    }
    else {
      locationTransformForThis = SvgTransform.fromTranslate(
        this.location.x - other.location.x,
        0
      );
      this.textSpans.forEach(t => {
        t.transform = t.transform.then(locationTransformForThis);
        t.origin = locationTransformForThis.apply(t.origin);
        if (t.layout) {
          t.layout.x = t.location.x;
          t.layout.y = t.location.y;
        }
      });
      this.location.x = other.location.x;
    }

    let locationTransformForOther = SvgTransform.fromTranslate(
      other.location.x - this.location.x,
      other.location.y - this.location.y
    );

    other.textSpans.forEach(t => {
      var x = t.clone();
      x.transform = x.transform.then(locationTransformForOther);
      x.origin = locationTransformForOther.apply(x.origin);
      if (x.layout) {
        x.layout.x = x.location.x;
        x.layout.y = x.location.y;
      }
      this.textSpans.push(x);
    });

    if (!!this.layout && !!other.layout) {
      var thisX2 = this.layout.x + this.layout.width;
      var thisY2 = this.layout.y + this.layout.height;
      var otherX2 = other.layout.x + other.layout.width;
      var otherY2 = other.layout.y + other.layout.height;

      if (otherX2 > thisX2) this.layout.width  += otherX2 - thisX2;
      if (otherY2 > thisY2) this.layout.height += otherY2 - thisY2;
    }
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
}


type SvgTextComponentProps = {
  text: SvgText;
  asHint?: boolean;
  scale?: number;
  onMeasure?: (layout: LayoutRectangle) => void;
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

    let spanLayouts: (LayoutRectangle | undefined)[] | undefined
      = this.props.text.textSpans.map(t => t.layout);
    if (!spanLayouts.map(l => !!l).reduce((t, c) => t && c, true)) {
      spanLayouts = undefined;
    }

    this.state = {
      spanLayouts: spanLayouts as LayoutRectangle[] | undefined,
      overallLayout: this.props.text.layout,
    };

    if (this.state.spanLayouts && this.state.overallLayout
      && this.props.onMeasure) {
      this.props.onMeasure(this.state.overallLayout);
    }
  }


  /**
   * Handle the measurement.
   *
   * @param [LayoutRectangle[]] layouts the layouts with dimensions filled in.
   */
  handleMeasure(layouts: LayoutRectangle[]) {
    var overall: LayoutRectangle = {
      x: this.props.text.location.x,
      y: this.props.text.location.y,
      width: 0,
      height: 0
    };
    for (var i = 0; i < layouts.length; i++) {
      var p = this.props.text.textSpans[i].location;
      overall.width = Math.max(overall.width, layouts[i].width + p.x);
      overall.height = Math.max(overall.height, layouts[i].height + p.y);
      this.props.text.textSpans[i].layout = {
        x: p.x,
        y: p.y,
        width: layouts[i].width,
        height: layouts[i].height,
      }
    }
    this.props.text.layout = overall;
    this.setState({
      spanLayouts: layouts,
      overallLayout: overall,
    });
    if (this.props.onMeasure) {
      this.props.onMeasure(overall);
    }
  }


  /**
   * Render the component.
   */
  render() {
    const scale = this.props.scale === undefined ? 1 : this.props.scale;
    return (
      <View
        style={[
          {
            position: "relative",
            width: this.state.overallLayout
              ? this.state.overallLayout.width * scale + 1 : undefined,
            height: this.state.overallLayout
              ? this.state.overallLayout.height * scale : undefined,
          }
        ]}>
        {this.state.overallLayout
          && (this.props.text.textSpans.map((s, i) =>
            s.renderNative(i, scale, false, this.props.asHint)))}
        {!this.state.spanLayouts && !this.state.overallLayout &&
          <MeasureComponents key={-1} onMeasure={l => this.handleMeasure(l)}>
            {this.props.text.textSpans.map((s, i) => s.renderNative(i, 1, true))}
          </MeasureComponents>}
      </View>
    );
  }
}


type BmcDiagramProps = {
  book: string;
  testMode?: boolean;
  testHints?: boolean;
}


type BmcDiagramState = {
  layout?: LayoutRectangle;
  containerLayout?: LayoutRectangle;
  correctTextLocation: boolean[];
  hasTestLayouts?: boolean;
  totalWidth: number;
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


    // Set the initial state

    this.state = {
      layout: undefined,
      correctTextLocation: correctTextLocation,
      totalWidth: this.svgViewBox ? this.svgViewBox.width : 100,
    };
  }


  /**
   * Compute the test layouts
   */
  doTestLayout() {
    if (!this.props.testMode || !this.svgViewBox) return;


    // Remove duplicate elements and other elements worth removing

    let deleted = Array(this.texts.length).fill(false);

    var i, j;
    var done = false;
    while (!done) {
      done = true;

      for (i = 0; i < this.texts.length; i++) {
        if (deleted[i]) continue;
        let a = this.texts[i];


        // Too small

        if (a.fontSize < 3) {
          deleted[i] = true;
          continue;
        }


        // Check for duplicates

        for (j = 0; j < this.texts.length; j++) {
          if (i === j) continue;
          if (deleted[j]) continue;

          let b = this.texts[j];

          if (!a.layout || !b.layout) continue;
          if (a.fontSize !== b.fontSize) continue;
          if (a.color !== b.color) continue;


          // The same

          if (a.text === b.text && Math.abs(a.layout.x - b.layout.x) < 1 &&
            Math.abs(a.layout.y - b.layout.y) < 1) {
            deleted[j] = true;
            done = false;
            continue;
          }
        }
      }
    }


    // Merge relevant components

    done = false;
    while (!done) {
      done = true;

      for (i = 0; i < this.texts.length; i++) {
        if (deleted[i]) continue;
        for (j = 0; j < this.texts.length; j++) {
          if (i === j) continue;
          if (deleted[j]) continue;

          let a = this.texts[i];
          let b = this.texts[j];

          if (!a.layout || !b.layout) continue;
          if (a.fontSize !== b.fontSize) continue;
          if (a.color !== b.color) continue;


          // On the same line

          if (Math.abs(a.layout.y - b.layout.y) < 1 && a.layout.x < b.layout.x){
            if (Math.abs(a.layout.x + a.layout.width - b.layout.x) <= 2) {
              a.merge(b);
              deleted[j] = true;
              done = false;
              continue;
            }
          }


          // On top of each other

          if (Math.abs(a.layout.y + a.layout.height - b.layout.y) <= 2
            || (a.layout.y < b.layout.y
              && a.layout.y + a.layout.height > b.layout.y)) {

            // Hack: Do not merge red
            if (a.color === "red" || a.color.match(/^rgb\(2..,.*/)
              || a.color.match(/^#[c-fC-F].*/)) {
              continue;
            }

            // Left-justified
            if (Math.abs(a.layout.x - b.layout.x) <= 2) {
              a.merge(b);
              deleted[j] = true;
              done = false;
              continue;
            }

            // Center-justified
            if (Math.abs(a.layout.x + a.layout.width / 2
                - b.layout.x - b.layout.width / 2) <= 4) {
              a.merge(b);
              deleted[j] = true;
              done = false;
              continue;
            }

            // Right-justified
            if (Math.abs(a.layout.x + a.layout.width
                - b.layout.x - b.layout.width) <= 2) {
              a.merge(b);
              deleted[j] = true;
              done = false;
              continue;
            }
          }
        }
      }
    }

    this.texts = this.texts.filter((v, i) => !deleted[i]);


    // Sort the components

    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    this.texts.sort((a, b) => {
      //if (a.fontSize !== b.fontSize) return a.fontSize > b.fontSize ? -1 : 1;
      if (a.color !== b.color) return a.color < b.color ? -1 : 1;
      return collator.compare(a.text, b.text);
    });


    // Lay out the components

    let tx = this.svgViewBox.x + this.svgViewBox.width;
    let ty = this.svgViewBox.y;
    let widest = 0;
    let paddingX = 15;
    let paddingY = 5;

    this.texts.forEach(t => {
      if (t.layout === undefined) return;

      t.testLocation = { x: tx, y: ty };
      ty += t.layout.height + paddingY;
      if (t.layout.width > widest) widest = t.layout.width;
      if (this.svgViewBox &&
        ty + t.layout.height > this.svgViewBox.y + this.svgViewBox.height) {
        ty = this.svgViewBox.y;
        tx += paddingX + widest;
        widest = 0;
      }
    });

    let totalWidth = tx + widest + paddingY;


    // Update the state

    this.setState({
      hasTestLayouts: true,
      totalWidth: totalWidth,
    });
  }

  /**
   * Receive the measurement of a text component
   *
   * @param [SvgText] text the corresponding text source.
   * @param [LayoutRectangle layout the layout with dimensions filled in.
   */
  handleSvgTextComponentLayout(text: SvgText, layout: LayoutRectangle) {
    if (this.props.testMode && this.svgViewBox) {
      if (this.texts.map(t => !!t.layout).reduce((t, c) => t && c, true)) {
        // All layouts are now filled in
        this.doTestLayout();
      }
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

    let totalWidth = windowDimensions.width;
    if (totalWidth > this.state.totalWidth) totalWidth = this.state.totalWidth;
    let scale = 1.0 * totalWidth / this.state.totalWidth;

    let svgWidth = scale * this.svgViewBox.width;
    let svgHeight = 1.0 * svgWidth
      * this.svgViewBox.height / this.svgViewBox.width;

    if (this.state.containerLayout) {
      if (svgHeight > this.state.containerLayout.height) {
        scale *= this.state.containerLayout.height / svgHeight;
        svgHeight = this.state.containerLayout.height;
        svgWidth = scale * this.svgViewBox.width;
      }
    }


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
      <View
        style={{ flexGrow: 1, flexShrink: 1 }}
        onLayout={e => {
          this.setState({ containerLayout: e.nativeEvent.layout });
        }}>
        <View
          ref={r => { this.svgView = r; }}
          onLayout={e => {
            // Get the absolute position, so that we can then
            // position floatable components relative to it.
            this.setState({ layout: e.nativeEvent.layout });
          }}>
          <Svg
            width={svgWidth}
            height={svgHeight}
            viewBox={this.svg.attrs.viewBox}>
            {this.svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </Svg>
        </View>
        {this.props.testMode && this.props.testHints
            && this.texts.map((t, index) => {
          if (this.state.correctTextLocation[index]) return null;
          let location = layoutTransform.apply(t.location);
          return (
            <Draggable
              key={index}
              disabled={true}
              style={{
                position: "absolute",
                left: location.x,
                top: location.y,
              }}>
              {this.state.hasTestLayouts && <SvgTextComponent
                text={t}
                scale={scale}
                asHint={true}
                />}
            </Draggable>);
          })}
        {this.props.testMode && this.texts.map((t, index) => {
          let atTestLocation = !this.state.correctTextLocation[index];
          let location = layoutTransform.apply(
            atTestLocation && t.testLocation ? t.testLocation : t.location);
          let dropLocation: XY | undefined = undefined;
          if (atTestLocation && t.testLocation) {
            dropLocation = layoutTransform.apply(t.location);
          }
          let dropRadius = 35;
          return (
            <Draggable
              key={index}
              ref={d => t.draggable = d}
              disabled={!atTestLocation}
              dropLocation={dropLocation && {
                x: dropLocation.x-dropRadius,
                y: dropLocation.y-dropRadius,
                width: 2 * dropRadius,
                height: 2 * dropRadius
              }}
              dropLocationRelative={this.svgView}
              onDropToLocation={() => {
                let v = this.state.correctTextLocation.slice(0);
                v[index] = true;
                if (t.draggable && dropLocation) {
                  t.draggable.spring({
                    toValue: {
                      x: dropLocation.x - location.x,
                      y: dropLocation.y - location.y,
                    },
                    speed: 100,
                  },
                  () => this.setState({ correctTextLocation: v }));
                }
              }}
              style={{
                position: "absolute",
                left: location.x,
                top: location.y,
              }}>
              {this.state.hasTestLayouts && <SvgTextComponent
                text={t}
                scale={scale}
                />}
            </Draggable>);
          })}
        {this.props.testMode && !this.state.hasTestLayouts &&
          <View style={{
            width: 2000,
            height: 0,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
            {this.props.testMode && this.texts.map((t, index) => {
              return <SvgTextComponent
                key={index}
                text={t}
                scale={scale}
                onMeasure={layout => this.handleSvgTextComponentLayout(t, layout)}
                />;
            })}
          </View>}
      </View>
    );
  }
}
