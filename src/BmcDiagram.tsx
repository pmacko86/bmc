import React from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollView,
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
 * The SVG text shift
 */
const SVG_TEXT_VERTICAL_SHIFT = 3;
const SVG_TEXT_HORIZONTAL_SHIFT = -1;

/**
 * The extra text shift
 */
const SVG_NATIVE_TEXT_VERTICAL_SHIFT = 4;
const SVG_NATIVE_TEXT_HORIZONTAL_SHIFT = -1;

/**
 * Whether to always use native rendering for text
 */
const ALWAYS_RENDER_TEXT_NATIVE = true;


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
  fontWeight: number;

  textLength?: number;
  measuredWidth?: number;
  layout?: LayoutRectangle;    // will be filled out asynchronously


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
    this.fontWeight = this.attrs.fontWeight || 400 /* normal */;
    this.fontSize = this.attrs.fontSize
      ? parseFloat(this.attrs.fontSize) : DEFAULT_FONT_SIZE;
    const vectorOne = this.transform.apply(1, 0);
    this.origin = this.transform.apply(0, 0);
    this.scale = Math.sqrt((vectorOne.x - this.origin.x)**2
      + (vectorOne.y - this.origin.y)**2);
    this.fontSizeScaled = this.fontSize * this.scale;
    this.origin.y -= this.fontSizeScaled;
    this.textLength = this.attrs.textLength;


    // If we have textLength, take advantage of it.

    // TODO Currently we don't do this, since we need to measure
    //      the texts anyways so that we can get measuredWidth for
    //      the purpose of adjusting letterSpacing. But we should be
    //      totally taking advantage of this!

    /*if (this.attrs.textLength) {
      this.layout = {
        x: this.origin.x,
        y: this.origin.y,
        width: this.attrs.textLength,
        height: this.fontSize + 2,
      };
    }*/
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
            fontWeight: this.fontWeight === 500 ? "500" : "400", // XXX
            letterSpacing:
              this.measuredWidth && this.textLength && this.text.length > 1
              ? (this.textLength - this.measuredWidth) * scale
                  / (this.text.length - 1)
              : 0,
          },
          !ignoreLocation ? {
            position: "absolute",
            left: scale * (this.origin.x + SVG_NATIVE_TEXT_HORIZONTAL_SHIFT),
            // Everything seems shifted...
            top: scale * (this.origin.y + SVG_NATIVE_TEXT_VERTICAL_SHIFT),
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
  layout?: LayoutRectangle;      // will be filled out asynchronously
  draggable?: Draggable | null;

  index: number;                 // will be filled out asynchronously
  equivalents: SvgText[];        // will be filled out asynchronously


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
    this.index = -1;
    this.equivalents = [];


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
      var thisX1 = this.layout.x;
      var thisY1 = this.layout.y;
      var thisX2 = this.layout.x + this.layout.width;
      var thisY2 = this.layout.y + this.layout.height;
      var otherX1 = other.layout.x;
      var otherY1 = other.layout.y;
      var otherX2 = other.layout.x + other.layout.width;
      var otherY2 = other.layout.y + other.layout.height;

      this.layout.x = Math.min(thisX1, otherX1);
      this.layout.y = Math.min(thisY1, otherY1);
      this.layout.width = Math.max(otherX2, thisX2) - Math.min(thisX1, otherX1);
      this.layout.height = Math.max(otherY2, thisY2) - Math.min(thisY1, otherY1);
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
    for (let i = 0; i < layouts.length; i++) {
      let span = this.props.text.textSpans[i];
      let p = span.location;
      // Keep the text length if we already have it
      let width = span.textLength ? span.textLength : layouts[i].width;
      let height = layouts[i].height;
      overall.width = Math.max(overall.width, width + p.x);
      overall.height = Math.max(overall.height, layouts[i].height + p.y);
      span.measuredWidth = layouts[i].width;
      span.layout = {
        x: p.x,
        y: p.y,
        width: width,
        height: height,
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


const BMC_DIAGRAM_TEXT_EXCEPTIONS: { [key: string]: string[] } = {
  "Matthew": [
    "Beatitudes",
  ],
  "Acts": [
    "1st Missionary Journey",
    "2nd Missionary Journey",
    "3rd Missionary Journey",
    "4th Missionary Journey",
  ],
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
  testScrollEnabled?: boolean;
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
  exemptedTexts: SvgText[];

  testLayoutSupportsScroll: boolean;
  testScrollEnabled: Animated.Value;

  diagramScale: Animated.Value;
  diagramTranslate: Animated.ValueXY;
  diagramMaxHeight: Animated.Value;


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


    // Extract the labels, and split them between exempted and draggable.

    let allTexts = !(this.svg && this.svg.childs) ? new Array<SvgText>(0) :
      (this.svg.childs.map((c: any) => this.extractSvgText(c))).flat();

    this.texts = [];
    this.exemptedTexts = [];
    for (let i = 0; i < allTexts.length; i++) {
      if (!this.isExempted(allTexts[i].text)) {
        this.texts.push(allTexts[i]);
      }
      else {
        this.exemptedTexts.push(allTexts[i]);
      }
    }

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

    this.testLayoutSupportsScroll = true;
    this.testScrollEnabled = new Animated.Value(1);

    this.diagramScale = new Animated.Value(1);
    this.diagramTranslate = new Animated.ValueXY();
    this.diagramMaxHeight = new Animated.Value(1000);
  }


  /**
   * Prepare the test components
   */
  prepareTestComponents() {
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

          if (Math.abs(a.layout.y + a.layout.height - b.layout.y) <= 4
            || (a.layout.y < b.layout.y
              && a.layout.y + a.layout.height > b.layout.y)) {

            // Hack: Do not merge chapter numbers
            if (a.color === "red"
              || a.color.match(/^rgb\(2..,.*/)  // red
              || a.color.match(/^#[c-fC-F].*/)  // red
              || a.color === "#005c5d" /* cyan */) {
              continue;
            }

            // Left-justified
            if (Math.abs(a.layout.x - b.layout.x) <= 2) {
              a.merge(b);
              deleted[j] = true;
              done = false;
              continue;
            }

            // Center-justified (10% error margin)
            if (Math.abs(a.layout.x + a.layout.width / 2
                - b.layout.x - b.layout.width / 2)
                <= 0.10 * Math.max(a.layout.width, b.layout.width)) {
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


    // Determine which components are equivalent

    for (i = 0; i < this.texts.length; i++) {
      for (j = i + 1; j < this.texts.length; j++) {
        let a = this.texts[i];
        let b = this.texts[j];

        if (a.text !== b.text) continue;
        if (a.fontSize !== b.fontSize) continue;
        if (a.color !== b.color) continue;

        a.equivalents.push(b);
        b.equivalents.push(a);
      }
    }


    // Assign indexes

    for (i = 0; i < this.texts.length; i++) {
      this.texts[i].index = i;
    }
  }


  /**
   * Compute the test layouts: Basic mouse interface
   */
  doTestLayoutMouseBasic() {
    if (!this.props.testMode || !this.svgViewBox) return;


    // Lay out the components

    let svgViewBoxY2 = this.svgViewBox.y + this.svgViewBox.height;
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
        ty + t.layout.height > svgViewBoxY2) {
        ty = this.svgViewBox.y;
        tx += paddingX + widest;
        widest = 0;
      }
    });

    let totalWidth = tx + widest + paddingY;


    // Update the state

    this.testLayoutSupportsScroll = false;
    this.testScrollEnabled.setValue(0);

    this.setState({
      hasTestLayouts: true,
      totalWidth: totalWidth,
    });
  }


  /**
   * Compute the test layouts: Basic mouse interface with scrolling
   */
  doTestLayoutMouseScroll() {
    if (!this.props.testMode || !this.svgViewBox) return;


    // Lay out the components

    let tx = this.svgViewBox.x + this.svgViewBox.width;
    let ty = this.svgViewBox.y;
    let widest = 0;
    let paddingY = 5;

    this.texts.forEach(t => {
      if (t.layout === undefined) return;

      t.testLocation = { x: tx, y: ty };
      ty += t.layout.height + paddingY;
      if (t.layout.width > widest) widest = t.layout.width;
    });

    let totalWidth = tx + widest + paddingY;


    // Update the state

    this.setState({
      hasTestLayouts: true,
      totalWidth: totalWidth,
    });
  }


  /**
   * Compute the test layouts
   */
  doTestLayout() {
    this.doTestLayoutMouseBasic();
    //this.doTestLayoutMouseScroll();
  }


  /**
   * Receive the measurement of a text component
   *
   * @param [SvgText] text the corresponding text source.
   * @param [LayoutRectangle] layout the layout with dimensions filled in.
   */
  handleSvgTextComponentLayout(text: SvgText, layout: LayoutRectangle) {
    if (this.props.testMode && this.svgViewBox) {
      if (this.texts.map(t => !!t.layout).reduce((t, c) => t && c, true)) {
        // All layouts are now filled in
        this.prepareTestComponents();
        this.doTestLayout();
      }
    }
  }


  /**
   * Is the given text exempted from the special handling?
   *
   * @param [string] text
   * @return [boolean] true if it is exempted
   */
  isExempted(text: string): boolean {
    // Do we need to do the following? .replace(/ /g, "")
    let e: string[] | undefined = BMC_DIAGRAM_TEXT_EXCEPTIONS[this.props.book];
    if (e === undefined) return false;
    return e.indexOf(text) >= 0;
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

    if (!this.props.testMode && !ALWAYS_RENDER_TEXT_NATIVE) {
      if (svg.type === "Text") {
        return (
          <SvgComponent.Text key={key} {...attrs}>
            {svg.childs
              && svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
          </SvgComponent.Text>
        );
      }

      if (svg.type === "TSpan" || svg.name === "tspan") {
        attrs = Object.assign({}, attrs);
        if (attrs.x !== undefined) {
          attrs.x = parseFloat(attrs.x) + SVG_TEXT_HORIZONTAL_SHIFT;
        }
        else {
          attrs.x = SVG_TEXT_VERTICAL_SHIFT;
        }
        if (attrs.y !== undefined) {
          attrs.y = parseFloat(attrs.y) + SVG_TEXT_VERTICAL_SHIFT;
        }
        else {
          attrs.y = SVG_TEXT_VERTICAL_SHIFT;
        }
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

    let svgScale = 1.0;
    let svgWidth = svgScale * this.svgViewBox.width;
    let svgHeight = 1.0 * svgWidth
      * this.svgViewBox.height / this.svgViewBox.width;


    // Compute the layout transform

    let layoutTransform: SvgTransform;

    if (!this.state.layout) {
      layoutTransform = new SvgTransform();
    }
    else {
      let tm = SvgTransform.fromTranslate(this.state.layout.x,
        this.state.layout.y);
      let sm = SvgTransform.fromScale(svgScale);
      layoutTransform = tm.then(sm);
    }


    // Render

    return (
      <Animated.View
        onLayout={(e: LayoutChangeEvent) => {
          //this.setState({ containerLayout: e.nativeEvent.layout });
          if (!this.svgViewBox) return;

          let totalWidth = this.state.totalWidth
            ? this.state.totalWidth : this.svgViewBox.width;
          let totalHeight = this.svgViewBox.height;
          let scale = e.nativeEvent.layout.width / totalWidth;
          if (scale > 1) scale = 1;

          let scaledSvgWidth = scale * this.svgViewBox.width;
          let scaledSvgHeight = 1.0 * scaledSvgWidth
            * this.svgViewBox.height / this.svgViewBox.width;

          if (scaledSvgHeight > e.nativeEvent.layout.height) {
            scale *= e.nativeEvent.layout.height / scaledSvgHeight;
            scaledSvgHeight = e.nativeEvent.layout.height;
            scaledSvgWidth = scale * this.svgViewBox.width;
          }

          let tx = -e.nativeEvent.layout.width  * (1 - scale) / 2;
          let ty = -e.nativeEvent.layout.height * (1 - scale) / 2;
          let maxHeight = e.nativeEvent.layout.width * totalHeight / totalWidth;

          this.diagramScale.setValue(scale);
          this.diagramTranslate.setValue({ x: tx, y: ty });
          this.diagramMaxHeight.setValue(maxHeight);
        }}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          transform: [{
            translateX: this.diagramTranslate.x,
          }, {
            translateY: this.diagramTranslate.y,
          }, {
            scale: this.diagramScale,
          }],
          maxHeight: this.diagramMaxHeight,
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
        {((this.props.testMode && this.props.testHints)
          || ALWAYS_RENDER_TEXT_NATIVE)
            && this.texts.map((t, index) => {
          if (this.props.testMode
            && this.state.correctTextLocation[index]) return null;
          let location = layoutTransform.apply(t.location);
          return (
            <Draggable
              key={index}
              disabled={true}
              scale={this.diagramScale}
              style={{
                position: "absolute",
                left: location.x,
                top: location.y,
              }}>
              {(!this.props.testMode || this.state.hasTestLayouts)
                && <SvgTextComponent
                  text={t}
                  scale={svgScale}
                  asHint={this.props.testMode}
                  />}
            </Draggable>);
          })}
        {this.exemptedTexts.map((t, index) => {
          let location = layoutTransform.apply(t.location);
          return (
            <Draggable
              key={index}
              disabled={true}
              scale={this.diagramScale}
              style={{
                position: "absolute",
                left: location.x,
                top: location.y,
              }}>
              <SvgTextComponent
                text={t}
                scale={svgScale}
                asHint={false}
                />
            </Draggable>);
          })}

        {/* The draggable test components */}
        {/* There is currently an issue with Animated.ScrollView, which unlike
          * the regular ScrollView, does not support scrollEnabled in
          * react-native-web. However, Animated.ScrollView still behaves much
          * better in expo, even though there is still a weird bug where the
          * thing always bounces back after trying to scroll :(
          */}
        <ScrollView
          scrollEnabled={this.state.testScrollEnabled}
          style={{
            //backgroundColor: "#80F08080",
            position: "relative",
            top: -this.svgViewBox.height,
            height: this.svgViewBox.height,
            width: this.state.totalWidth
              ? this.state.totalWidth : this.svgViewBox.width,
            flexGrow: 0,
            flexShrink: 0,
          }}>
        {this.props.testMode && this.texts.map((t, index) => {
          let dropRadius = 35;
          let atTestLocation = !this.state.correctTextLocation[index];
          let location = layoutTransform.apply(
            atTestLocation && t.testLocation ? t.testLocation : t.location);

          let dropLocations: { index: number, location: XY}[] = [];
          if (atTestLocation && t.testLocation) {
            dropLocations.push({
              index: index,
              location: layoutTransform.apply(t.location),
            });
          }

          for (let i = 0; i < t.equivalents.length; i++) {
            let e = t.equivalents[i];
            if (!this.state.correctTextLocation[e.index] && e.testLocation) {
              dropLocations.push({
                index: e.index,
                location: layoutTransform.apply(e.location),
              });
            }
          }

          return (
            <Draggable
              key={index}
              ref={d => t.draggable = d}
              disabled={!atTestLocation}
              dropLocation={dropLocations.map(l => {
                return {
                  x: l.location.x - dropRadius,
                  y: l.location.y - dropRadius,
                  width: 2 * dropRadius,
                  height: 2 * dropRadius
                };
              })}
              dropLocationRelative={this.svgView}
              reverseScaleDropLocation={true}
              scale={this.diagramScale}
              onDragStart={() => {
                this.testScrollEnabled.setValue(0);
                this.setState({ testScrollEnabled: false });
              }}
              onDragStop={() => {
                this.testScrollEnabled.setValue(
                  this.testLayoutSupportsScroll ? 1 : 0)
                this.setState({ testScrollEnabled: true });
              }}
              onDropToLocation={(dropLocationIndex) => {
                let dropLocation = dropLocations[dropLocationIndex];

                // For equivalent components, swap them if the user dragged
                // one to the drop area of the other
                [this.texts[index], this.texts[dropLocation.index]]
                  = [this.texts[dropLocation.index], this.texts[index]];
                [this.texts[index].index,
                 this.texts[dropLocation.index].index]
                  = [this.texts[dropLocation.index].index,
                     this.texts[index].index];
                [this.texts[index].testLocation,
                 this.texts[dropLocation.index].testLocation]
                  = [this.texts[dropLocation.index].testLocation,
                     this.texts[index].testLocation];

                let v = this.state.correctTextLocation.slice(0);
                v[index] = true;
                if (t.draggable) {
                  t.draggable.spring({
                    toValue: {
                      x: dropLocation.location.x - location.x,
                      y: dropLocation.location.y - location.y,
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
                scale={svgScale}
                />}
            </Draggable>);
          })}
        </ScrollView>

        {/* Measure the test components */}
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
                scale={svgScale}
                onMeasure={layout => this.handleSvgTextComponentLayout(t, layout)}
                />;
            })}
          </View>}
      </Animated.View>
    );
  }
}
