import React from 'react';
import {
  LayoutRectangle,
  View,
} from "react-native";

import MeasureComponents from './MeasureComponents';
import SvgText from './SvgText';


/**
 * Point coordinates.
 */
type XY = {
  x: number;
  y: number;
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
export default class SvgTextComponent
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
      if (span.measuredWidth && span.textLength && span.text.length > 1) {
        span.computedLetterSpacing = (span.textLength - span.measuredWidth)
          / (span.text.length - 1);
        for (let j = 0; j < span.subTextSpans.length; j++) {
          span.subTextSpans[j].letterSpacing = span.effectiveLetterSpacing();
        }
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
