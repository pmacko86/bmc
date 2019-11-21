import React from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  View,
} from 'react-native';

type MeasureComponentsProps = {
  onMeasure?: (layouts: LayoutRectangle[]) => void;
}

type MeasureComponentsState = {
}

export default class MeasureComponents
extends React.Component<MeasureComponentsProps, MeasureComponentsState> {

  layouts: LayoutRectangle[];
  count: number;
  remaining: number;

  constructor(props: MeasureComponentsProps) {
    super(props);
    this.state = {};
    this.count = this.props.children
      ? React.Children.count(this.props.children) : 0;
    this.remaining = this.count;
    this.layouts = new Array<LayoutRectangle>(this.count);
  }


  handleOnLayout(index: number, event: LayoutChangeEvent) {
    let d: LayoutRectangle = {
      x: 0,
      y: 0,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    }
    this.layouts[index] = d;
    this.remaining--;

    if (this.remaining <= 0) {
      let done = true;
      for (let i = 0; i < this.layouts.length; i++) {
        if (!this.layouts[i]) {
          done = false;
          break;
        }
      }
      if (done && this.props.onMeasure) {
        /*let x = {};
        React.Children.map(this.props.children, (child, i) => {
          x[child.props["key"]] = this.layouts[i];
        });*/
        this.props.onMeasure(this.layouts);
      }
    }
  }


  render() {
    return (
      <View style={{
        width: 2000,
        height: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
      }}>
        {React.Children.map(this.props.children,
          (child, i) => {
            return (
              <View
                key={i}
                onLayout={l => this.handleOnLayout(i, l)}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  flex: 1,
                  alignItems: 'center',
                }}
                >{child}</View>
            )
        })}
      </View>
    );
  }
}
