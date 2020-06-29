import React from 'react';
import {
  LayoutRectangle,
  Text,
  View,
} from "react-native";

import Draggable from './Draggable';
import SvgTransform from './SvgTransform';


/**
 * The font size to use when there is no size specified.
 */
const DEFAULT_FONT_SIZE = 14;

/**
 * The extra text shift
 */
const SVG_NATIVE_TEXT_VERTICAL_SHIFT = 4;
const SVG_NATIVE_TEXT_HORIZONTAL_SHIFT = -1;


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
            textShadowRadius: scale * this.fontSizeScaled * 2.5 / 3,
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
export default class SvgText {

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
