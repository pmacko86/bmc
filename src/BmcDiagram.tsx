import React from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";

import Svg from 'react-native-svg';
import * as SvgComponent from 'react-native-svg';

import Draggable from './Draggable';
import SvgText from './SvgText';
import SvgTextComponent from './SvgTextComponent';
import SvgTransform from './SvgTransform';

// TODO Use this instead when not running in Expo
// import TextSize from 'react-native-text-size';


/**
 * The diagram data (SVGs converted to a single JSON).
 */
const DATA = require("./assets/diagrams.json");

/**
 * The SVG text shift
 */
const SVG_TEXT_VERTICAL_SHIFT = 3;
const SVG_TEXT_HORIZONTAL_SHIFT = -1;

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
 * Border and margin size.
 */
type BorderSize = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}


/**
 * The layout mechanism for test components
 */
export abstract class BmcTestLayout {

  basePosition: XY;
  borderSize: BorderSize;
  extraHeight: number;
  extraWidth: number;
  marginSize: BorderSize;
  scale: boolean;
  supportsScroll: boolean;

  /**
   * The constructor
   */
  constructor() {
    this.basePosition = { x: 0, y: 0 };
    this.borderSize = { left: 0, top: 0, right: 0, bottom: 0 };
    this.extraWidth = 0;
    this.extraHeight = 0;
    this.marginSize = { left: 0, top: 0, right: 0, bottom: 0 };
    this.scale = true;
    this.supportsScroll = false;
  }

  /**
   * Compute the layout of the test components
   */
  abstract doLayout(texts: SvgText[], svgViewBox: LayoutRectangle): void;

  /**
   * Handle a test component being removed from the test repository
   */
  handleComponentRemoved(texts: SvgText[], index: number,
    alreadyRemoved: boolean[], callback?: () => void): void {
    if (callback) {
      callback();
    }
  };
}


/**
 * Test layouts: Basic mouse interface (without scrolling)
 */
export class BmcTestLayoutMouseBasic extends BmcTestLayout {

  /**
   * The constructor
   */
  constructor() {
    super();
    this.supportsScroll = false;
  }

  /**
   * Compute the layout of the test components
   */
  doLayout(texts: SvgText[], svgViewBox: LayoutRectangle) {

    let svgViewBoxY2 = svgViewBox.y + svgViewBox.height;
    let tx = svgViewBox.x + svgViewBox.width;
    let ty = svgViewBox.y;
    let widest = 0;
    let paddingX = 15;
    let paddingY = 5;

    texts.forEach(t => {
      if (t.layout === undefined) return;

      t.testLocation = { x: tx, y: ty };
      ty += t.layout.height + paddingY;
      if (t.layout.width > widest) widest = t.layout.width;
      if (svgViewBox &&
        ty + t.layout.height > svgViewBoxY2) {
        ty = svgViewBox.y;
        tx += paddingX + widest;
        widest = 0;
      }
    });

    this.extraWidth = tx + widest + paddingY - svgViewBox.x - svgViewBox.width;
  }
}


/**
 * Test layouts: Basic touch interface with scrolling
 */
export class BmcTestLayoutTouchScroll extends BmcTestLayout {

  /**
   * The constructor
   */
  constructor() {
    super();
    this.borderSize = { left: 7, top: 2, right: 5, bottom: 8 };
    this.marginSize = { left: 0, top: 0, right: 10, bottom: 0 };
    this.scale = false;
    this.supportsScroll = true;
  }

  /**
   * Compute the layout of the test components
   */
  doLayout(texts: SvgText[], svgViewBox: LayoutRectangle) {

    let tx = this.borderSize.left;
    let ty = this.borderSize.top + 3;
    let widest = 0;
    let paddingX = 20;
    let paddingY = 5;

    texts.forEach(t => {
      if (t.layout === undefined) return;

      t.testLocation = { x: tx, y: ty };
      ty += t.layout.height + paddingY + this.borderSize.top
        + this.borderSize.bottom;
      if (t.layout.width > widest) widest = t.layout.width;
    });

    this.basePosition = { x: svgViewBox.x + svgViewBox.width, y: svgViewBox.y };
    this.extraWidth = tx + widest + paddingX + this.borderSize.bottom;
  }

  /**
   * Handle a test component being removed from the test repository
   */
  handleComponentRemoved(texts: SvgText[], index: number,
    alreadyRemoved: boolean[], callback?: () => void): void {
    if (index + 1 >= texts.length) {
      if (callback) {
        callback();
      }
      return;
    }

    let nextIndex = index + 1;
    while (nextIndex < texts.length) {
      let text = texts[nextIndex];
      if (text.draggable && text.testLocation && !alreadyRemoved[nextIndex]) {
        break;
      }
      nextIndex++;
    }
    if (nextIndex >= texts.length) {
      if (callback) {
        callback();
      }
      return;
    }

    let textCurrent = texts[index];
    let textNext = texts[nextIndex];
    if (!textCurrent.testLocation || !textNext.testLocation) {
      if (callback) {
        callback();
      }
      return;
    }

    let dy = textCurrent.testLocation.y - textNext.testLocation.y;
    let last: SvgText | null = null;
    for (let i = index + 1; i < texts.length; i++) {
      let text = texts[i];
      if (text.draggable && text.testLocation && !alreadyRemoved[i]) {
        last = text;
      }
    }
    if (last === null) {
      if (callback) {
        callback();
      }
      return;
    }

    for (let i = index + 1; i < texts.length; i++) {
      let text = texts[i];
      if (text.draggable && text.testLocation && !alreadyRemoved[i]) {
        if (text !== last) {
          text.draggable.spring({
            toValue: {
              x: 0,
              y: dy,
            },
            speed: 100,
          });
        }
        else {
          text.draggable.spring({
            toValue: {
              x: 0,
              y: dy,
            },
            speed: 100,
          },
          () => {
            for (let j = index + 1; j < texts.length; j++) {
              let tj = texts[j];
              if (tj.draggable && tj.testLocation) {
                tj.testLocation.y += dy;
                tj.draggable.resetPan();
              }
            }
            if (callback) {
              callback();
            }
          });
        }
      }
    }
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
  "Romans": [
    "The Heart of Jesus Christ",
  ]
}


type BmcDiagramProps = {
  book: string;
  testMode?: boolean;
  testHints?: boolean;
}


type BmcDiagramState = {
  containerLayout?: LayoutRectangle;
  correctTextLocation: boolean[];
  hasTestLayouts?: boolean;
  finishedPremeasure?: boolean;
  extraWidth: number;
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
  svgViewBox: LayoutRectangle;
  texts: SvgText[];
  exemptedTexts: SvgText[];
  premeasureTexts?: SvgText[];

  testLayout: BmcTestLayout;
  testLayoutSupportsScroll: boolean;
  testScrollEnabled: Animated.Value;

  scrollOffset: XY;
  diagramScale: Animated.Value;
  diagramScaleLast: number;
  testScale: Animated.Value;
  testScaleLast: number;
  diagramTranslate: Animated.ValueXY;
  diagramMaxHeight: Animated.Value;

  lastLayoutChangeEvent?: LayoutChangeEvent;
  lastExtraWidth?: number;


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

    this.svgViewBox = { x: 0, y: 0, width: 100, height: 100 };
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
      if (allTexts[i].fontSize < 3) {
        continue;
      }
      if (!this.isExempted(allTexts[i].text)) {
        this.texts.push(allTexts[i]);
      }
      else {
        this.exemptedTexts.push(allTexts[i]);
      }
    }

    this.prepareTestComponentsBeforeMeasure();

    let correctTextLocation = new Array<boolean>(this.texts.length);
    for (let i = 0; i < correctTextLocation.length; i++) {
      correctTextLocation[i] = !this.props.testMode;
    }


    // Set the initial state

    this.state = {
      correctTextLocation: correctTextLocation,
      extraWidth: 0,
    };

    this.testLayoutSupportsScroll = true;
    this.testScrollEnabled = new Animated.Value(1);
    this.scrollOffset = { x: 0, y: 0 };

    this.diagramScale = new Animated.Value(1);
    this.diagramScaleLast = 1.0;
    this.testScale = new Animated.Value(1);
    this.testScaleLast = 1.0;
    this.diagramTranslate = new Animated.ValueXY();
    this.diagramMaxHeight = new Animated.Value(1000);

    this.testLayout = new BmcTestLayoutTouchScroll();
  }


  /**
   * Prepare the test components - before we measure them
   */
  prepareTestComponentsBeforeMeasure() {
    if (!this.props.testMode || !this.svgViewBox) return;


    // Split chapter number sequences into individual chapters.

    let subTexts: SvgText[] = [];
    for (let i = 0; i < this.texts.length; i++) {
      let a = this.texts[i];
      if (a.color === "red"
        || a.color.match(/^rgb\(2..,.*/)  // red
        || a.color.match(/^#[c-fC-F].*/)  // red
        || a.color === "#0f4c28" /* cyan */
        || a.color === "#005c5d" /* cyan */) {

        // Must contain more than one thing, or if it is just one thing, we
        // need to fix it using a sub-text.
        if (!(a.text.includes(" ") || a.text.includes(","))) continue;

        // Split the text
        let splitWithDelimiters = a.text.split(/([, ]+)/);
        let parts: string[] = [];
        for (let j = 0; j < splitWithDelimiters.length; j++) {
          if (splitWithDelimiters[j] === "") continue;
          if (parts.length === 0) {
            parts.push(splitWithDelimiters[j]);
          }
          else {
            if (splitWithDelimiters[j].startsWith(" ")
             || splitWithDelimiters[j].startsWith(",")) {
              parts[parts.length - 1] += splitWithDelimiters[j];
            }
            else {
              parts.push(splitWithDelimiters[j]);
            }
          }
        }

        if (parts.length <= 0) continue;
        let lastPart = parts[parts.length - 1];
        if (!(lastPart.endsWith(",") || parts.length > 1)) continue;

        // Create sub-texts
        let start = 0;
        for (let j = 0; j < parts.length; j++) {
          let n = a.subText(start, parts[j].length);
          subTexts.push(n);
          let t = n.text.replace(/[, ]+$/, '');
          if (t !== n.text) {
            let testAlternative = a.subText(start, t.length);
            testAlternative.diagramAlternative = n;
            n.testAlternative = testAlternative;
            subTexts.push(testAlternative);
          }
          start += parts[j].length;
        }
      }
    }

    this.premeasureTexts =
      subTexts.map(t => t.premeasure).filter(t => !!t) as SvgText[];

    this.texts.push(...subTexts);
  }


  /**
   * Prepare the test components - after we measure them
   */
  prepareTestComponentsAfterMeasure() {
    if (!this.props.testMode || !this.svgViewBox) return;

    let i, j;
    let deleted = Array(this.texts.length).fill(false);


    // Finish sub-texts

    for (i = 0; i < this.texts.length; i++) {
      let a = this.texts[i];
      if (a.subTexts.length <= 0) continue;

      deleted[i] = true;


      // The following assumes that we properly measured everything

      let dx = new Map<number, number>();
      dx.set(0, 0);
      for (j = 0; j < a.subTexts.length; j++) {
        let t = a.subTexts[j];
        if (!t.layout) continue;

        let startX = dx.get(t.subTextFrom);
        if (startX !== undefined) {
          let w = t.layout.width;
          if (t.textSpans.length > 0) {
            // TODO Properly account for letter spacing (e.g. for 2 Chronicles);
            // this is a horrible hack that works well only if there is a single
            // text span. Even if the letter spacing is uniform throughout the
            // text, the measured layout is a result of a combination of span
            // layouts that did not take letter spacing into account and those
            // that did by the virtue of how they are positioned using their
            // original textLength's.
            w += t.textSpans[0].effectiveLetterSpacing() * t.text.length
          }
          dx.set(t.subTextTo, startX + w);
          t.location.x += startX;
        }
      }
    }


    // Remove components with test alternatives

    for (i = 0; i < this.texts.length; i++) {
      let a = this.texts[i];
      if (!a.testAlternative) continue;

      deleted[i] = true;
    }


    // Remove duplicate elements and other elements worth removing

    let done = false;
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

              // Hack: Do not merge chapter numbers
              if (a.color === "red"
                || a.color.match(/^rgb\(2..,.*/)  // red
                || a.color.match(/^#[c-fC-F].*/)  // red
                || a.color === "#005c5d" /* cyan */) {
                console.warn("Not merging: \"" + a.text
                  + "\" and \"" + b.text + "\"");
                continue;
              }

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
   * Compute the test layouts
   */
  doTestLayout() {
    this.testLayout.doLayout(this.texts, this.svgViewBox);

    this.testLayoutSupportsScroll = this.testLayout.supportsScroll;
    this.testScrollEnabled.setValue(this.testLayout.supportsScroll ? 1 : 0);

    this.setState({
      hasTestLayouts: true,
      extraWidth: this.testLayout.extraWidth,
    });
  }


  /**
   * Receive the measurement of a text component
   *
   * @param [SvgText] text the corresponding text source.
   * @param [LayoutRectangle] layout the layout with dimensions filled in.
   */
  handleSvgTextComponentLayout(text: SvgText, layout: LayoutRectangle) {
    if (this.props.testMode && this.svgViewBox) {
      /*let count = this.texts.map(t => !!t.layout)
        .reduce((t, c) => c ? t + 1 : t, 0);
      if (count === 56) {
        console.log(this.texts.map(t => !!t.layout));
        console.log(this.texts[53]);
      }*/
      if (this.texts.map(t => !!t.layout).reduce((c, t) => t && c, true)) {

        // All layouts are now filled in
        this.prepareTestComponentsAfterMeasure();
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
   * Handle the layout event.
   *
   * @param [LayoutChangeEvent] e the event.
   */
  handleLayoutChangeEvent(e: LayoutChangeEvent) {
    this.lastLayoutChangeEvent = e;
    if (!this.svgViewBox) return;

    this.lastExtraWidth = this.state.extraWidth;

    let extraWidth = this.state.extraWidth ? this.state.extraWidth : 0;
    let scale = 1;
    if (this.testLayout.scale) {
      let totalWidth = this.svgViewBox.width + extraWidth;
      scale = e.nativeEvent.layout.width / totalWidth;
    }
    else {
      let remainingWidth = e.nativeEvent.layout.width - extraWidth;
      if (remainingWidth < 50) remainingWidth = 50;
      scale = remainingWidth / this.svgViewBox.width;
    }
    if (scale > 1) scale = 1;

    let scaledSvgWidth = scale * this.svgViewBox.width;
    let scaledSvgHeight = 1.0 * scaledSvgWidth
      * this.svgViewBox.height / this.svgViewBox.width;

    if (scaledSvgHeight > e.nativeEvent.layout.height
     && e.nativeEvent.layout.height > 0) {
      scale *= e.nativeEvent.layout.height / scaledSvgHeight;
      scaledSvgHeight = e.nativeEvent.layout.height;
      scaledSvgWidth = scale * this.svgViewBox.width;
    }

    let tx = -this.svgViewBox.width  * (1 - scale) / 2;
    let ty = -this.svgViewBox.height * (1 - scale) / 2;

    let maxHeight = 0;  // Used only in dislay (not test) mode
    if (!this.props.testMode) {
      let totalWidth = this.svgViewBox.width + extraWidth;
      let totalHeight = this.svgViewBox.height;
      maxHeight = e.nativeEvent.layout.width * totalHeight / totalWidth;
    }

    this.diagramScale.setValue(scale);
    this.diagramScaleLast = scale;
    if (this.testLayout.scale) {
      this.testScale.setValue(scale);
      this.testScaleLast = scale;
    }
    this.diagramTranslate.setValue({ x: tx, y: ty });
    this.diagramMaxHeight.setValue(maxHeight);
  }


  /**
   * Handler for document update.
   */
  componentDidUpdate() {

    // Sometimes we miss layout update due to the layout change event not being
    // nicely correlated with the extraWidth state change, so fix it up.

    if (this.lastExtraWidth !== this.state.extraWidth) {
      if (this.lastLayoutChangeEvent !== undefined) {
        this.handleLayoutChangeEvent(this.lastLayoutChangeEvent);
      }
    }
  }


  /**
   * Render the component.
   */
  render() {

    const windowDimensions = Dimensions.get('window');
    if (windowDimensions.width <= 0) return;
    if (!this.svg || !this.svgViewBox) return;


    // Render

    return (
      <Animated.View
        onLayout={(e: LayoutChangeEvent) => this.handleLayoutChangeEvent(e)}
        style={[
          {
            //backgroundColor: "#F0F08080",
            flexGrow: 1,
            flexShrink: 1,
          }, this.props.testMode ? [] : {
            maxHeight: this.diagramMaxHeight,
          }
        ]}>

        {/* The base diagram */}
        <Animated.View
          width={this.svgViewBox.width /* because the translate are relative to this */}
          height={this.svgViewBox.height}
          style={{
            //backgroundColor: "#80F0F080",
            position: this.props.testMode && "absolute",
            top: 0,
            left: 0,
            flexGrow: 0,
            flexShrink: 0,
            transform: [{
              translateX: this.diagramTranslate.x,
            }, {
              translateY: this.diagramTranslate.y,
            }, {
              scale: this.diagramScale,
            }],
          }}>

          {/* The SVG */}
          <View ref={r => { this.svgView = r; }}>
            <Svg
              width={this.svgViewBox.width}
              height={this.svgViewBox.height}
              viewBox={this.svg.attrs.viewBox}>
              {this.svg.childs.map((c: any, i: any) => this.renderSvg(c, i))}
            </Svg>
          </View>

          {/* Texts in the figure */}
          {(this.props.testMode || ALWAYS_RENDER_TEXT_NATIVE)
              && this.texts.map((t, index) => {
            return (
              <Draggable
                key={index}
                disabled={true}
                scale={this.diagramScale}
                style={{
                  position: "absolute",
                  left: t.location.x,
                  top: t.location.y,
                }}>
                {(!this.props.testMode || this.state.hasTestLayouts)
                  && <SvgTextComponent
                    text={t.diagramAlternative || t}
                    asHint={this.props.testMode && this.props.testHints
                      && !this.state.correctTextLocation[index]}
                    />}
              </Draggable>);
            })}

          {/* Exempted texts, which are always a part of the figure */}
          {this.exemptedTexts.map((t, index) => {
            return (
              <Draggable
                key={index}
                disabled={true}
                scale={this.diagramScale}
                style={{
                  position: "absolute",
                  left: t.location.x,
                  top: t.location.y,
                }}>
                <SvgTextComponent
                  text={t}
                  asHint={false}
                  />
              </Draggable>);
            })}
        </Animated.View>

        {/* The draggable test components */}
        {/* TODO There is an annoying bug in expo, where if you drag a component
          * too quickly (e.g. using a very fast swipe gesture), the thing moves
          * even before the scrolling disables, which leaves the text hanging
          * out there in the middle of the air, and it does not call any of the
          * callbacks, so that, for example, scrolling does not get reenabled.
          * One option to fix this is to disable scrolling altogether if the
          * test layout permits it (e.g. if it auto-closes gaps).
          */}
        <Animated.ScrollView
          scrollEnabled={this.testScrollEnabled}
          scrollEventThrottle={16}
          style={{
            top: 0,
            left: 0,
            flexGrow: 1,  // Used to scale to the window dimensions
            flexShrink: 1,
          }}
          onScroll={Animated.event([null], {
              listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                this.scrollOffset = e.nativeEvent.contentOffset
              }
            }
          )}>

          {/* The container used for adjusting the scale */}
          <Animated.View
            style={{
              //backgroundColor: "#F0F08080",
              position: "absolute",
              top: Animated.multiply(this.diagramScale,
                this.testLayout.basePosition.y),
              left: Animated.multiply(this.diagramScale,
                this.testLayout.basePosition.x),
              flexGrow: 0,
              flexShrink: 0,
              width: 0,   // Need size 0x0 to correctly apply the scale; this
              height: 0,  // is indeed okay because of visible overflow.
              transform: [{
                scale: this.testScale,
              }],
              //maxHeight: this.diagramMaxHeight,
            }}>
          {this.props.testMode && this.texts.map((t, index) => {
            let dropRadius = 35;
            let atTestLocation = !this.state.correctTextLocation[index];
            if (!atTestLocation) return null;

            let location =
              atTestLocation && t.testLocation ? t.testLocation : t.location;
            let dropLocations: { index: number, location: XY}[] = [];
            if (atTestLocation && t.testLocation) {
              dropLocations.push({
                index: index,
                location: t.location,
              });
            }

            for (let i = 0; i < t.equivalents.length; i++) {
              let e = t.equivalents[i];
              if (!this.state.correctTextLocation[e.index] && e.testLocation) {
                dropLocations.push({
                  index: e.index,
                  location: e.location,
                });
              }
            }

            let myScale
              = new Animated.Value(1);
            let myPaddingTop
              = new Animated.Value(this.testLayout.borderSize.top);
            let myPaddingBottom
              = new Animated.Value(this.testLayout.borderSize.bottom);
            let myPaddingLeft
              = new Animated.Value(this.testLayout.borderSize.left);
            let myPaddingRight
              = new Animated.Value(this.testLayout.borderSize.right);
            let backgroundColorOpacity = new Animated.Value(50);
            let backgroundColor = backgroundColorOpacity.interpolate({
                inputRange: [0, 100],
                outputRange: [
                  'rgba(200, 200, 200, 0)',
                  'rgba(200, 200, 200, 1)'
                ]
            });

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
                adjustDropLocationToScale={true}
                dropLocationScale={this.diagramScale}
                scale={this.testScale}
                onDragStart={() => {
                  this.testScrollEnabled.setValue(0);
                  this.setState({ testScrollEnabled: false });
                }}
                onAfterInvalidDrop={() => {
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
                    let d = this.diagramScaleLast / this.testScaleLast;
                    Animated.spring(myScale, {
                      toValue: this.diagramScaleLast / this.testScaleLast,
                      speed: 100,
                    }).start();
                    Animated.spring(myPaddingTop, {
                      toValue: 0,
                      speed: 100,
                    }).start();
                    Animated.spring(myPaddingBottom, {
                      toValue: 0,
                      speed: 100,
                    }).start();
                    Animated.spring(myPaddingLeft, {
                      toValue: 0,
                      speed: 100,
                    }).start();
                    Animated.spring(myPaddingRight, {
                      toValue: 0,
                      speed: 100,
                    }).start();
                    Animated.spring(backgroundColorOpacity, {
                      toValue: 0,
                      speed: 100,
                    }).start();
                    t.draggable.spring({
                      toValue: {
                        x: dropLocation.location.x * d - location.x
                          - this.testLayout.basePosition.x * d
                          - this.testLayout.marginSize.left
                          - (t.layout ? t.layout.width : 0) * (1 - d) / 2,
                        y: dropLocation.location.y * d - location.y
                          + this.scrollOffset.y * d
                            / this.diagramScaleLast
                          - this.testLayout.basePosition.y * d
                          - this.testLayout.marginSize.top
                          - (t.layout ? t.layout.height : 0) * (1 - d) / 2,
                      },
                      speed: 100,
                    },
                    () => {
                      this.testScrollEnabled.setValue(
                        this.testLayoutSupportsScroll ? 1 : 0)
                      this.setState({
                        testScrollEnabled: true,
                        correctTextLocation: v
                      });

                      this.testLayout.handleComponentRemoved(this.texts,
                        index, this.state.correctTextLocation,
                        () => this.setState({}));
                    });
                  }
                  else {
                    this.testScrollEnabled.setValue(
                      this.testLayoutSupportsScroll ? 1 : 0)
                    this.setState({ testScrollEnabled: true });
                  }
                }}
                style={{
                  position: "absolute",
                  left: location.x,
                  top: location.y,
                }}>
                {this.state.hasTestLayouts &&
                  <Animated.View
                    style={{
                      backgroundColor: backgroundColor,
                      //filter: "blur(10px)",
                      paddingTop: myPaddingTop,
                      paddingBottom: myPaddingBottom,
                      paddingLeft: myPaddingLeft,
                      paddingRight: myPaddingRight,
                      marginTop: this.testLayout.marginSize.top,
                      marginBottom: this.testLayout.marginSize.bottom,
                      marginLeft: this.testLayout.marginSize.left,
                      marginRight: this.testLayout.marginSize.right,
                      transform: [{
                        scale: myScale,
                      }]
                    }}>
                    <SvgTextComponent text={t} />
                  </Animated.View>}
              </Draggable>);
            })}
          </Animated.View>
        </Animated.ScrollView>

        {/* Pre-measure the necessary text components */}
        {this.premeasureTexts && this.premeasureTexts.length > 0 &&
          !this.state.finishedPremeasure &&
          <View style={{
            width: 2000,
            height: 0,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
            {this.premeasureTexts && this.premeasureTexts.map((t, index) => {
              return <SvgTextComponent
                key={index}
                text={t}
                onMeasure={layout => {
                  if (t.onPremeasure) {
                    t.onPremeasure(layout);
                  }
                  if (this.premeasureTexts &&
                    this.premeasureTexts.map(t => !!t.layout)
                    .reduce((c, t) => t && c, true)) {
                    this.setState({finishedPremeasure: true});
                  }
                }}/>;
            })}
          </View>}

        {/* Measure the test components */}
        {this.props.testMode && !this.state.hasTestLayouts &&
          (this.state.finishedPremeasure || !this.premeasureTexts ||
            this.premeasureTexts.length === 0) &&
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
                onMeasure={layout => {
                  this.handleSvgTextComponentLayout(t, layout)
                }}/>;
            })}
          </View>}
      </Animated.View>
    );
  }
}
