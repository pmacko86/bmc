import Svg, {
  G,
  Text,
  TSpan,
  Path,
} from 'react-native-svg';

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


type BmcDiagramProps = {
  book: string;
}


type BmcDiagramState = {
  pan: Animated.ValueXY;
  layout: Layout | null;
}


export default class BmcDiagram
extends React.Component<BmcDiagramProps, BmcDiagramState> {

  _val: XY;
  panResponder: PanResponderInstance | undefined;
  _c: any;
  _v: View | undefined | null;


  constructor(props: BmcDiagramProps) {
    super(props);
    this._val = { x:0, y:0 }
    this.state = {
      pan: new Animated.ValueXY(),
      layout: null,
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 };
    this.state.pan.addListener((value) => this._val = value);
    this.state.pan.setValue({ x:0, y:0 });
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


  /**
   * Render a SVG component.
   */
   // @ts-ignore
  renderSvg(svg) {

    if (svg.text) return svg.text;

    if (svg.type === "G") {
      return (
        <G {...svg.attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </G>
      );
    }

    if (svg.type === "Path") {
      return (
        <Path {...svg.attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </Path>
      );
    }

    if (svg.type === "Text") {
      return (
        <Text {...svg.attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </Text>
      );
    }

    if (svg.type === "TSpan" || svg.name === "tspan") {
      let attrs = Object.assign({}, svg.attrs);
      if (attrs.fontSize) attrs.fontSize += "px";
      return (
        <TSpan {...attrs}>
          {svg.childs && svg.childs.map((c: any) => this.renderSvg(c))}
        </TSpan>
      );
    }

    return null;
  }


  /**
   * Render the component.
   */
  render() {
    if (this.panResponder === undefined) return;

    const windowDimensions = Dimensions.get('window');
    if (windowDimensions.width <= 0) return;

    const svg = DATA[this.props.book.replace(/ /g, "_")];
    if (!svg || svg.type !== "Svg") return;
    if (!svg.attrs || !svg.attrs.viewBox) return;
    const svgViewBox = svg.attrs.viewBox
      .split(/[, ]+/).map((v: any) => parseFloat(v));
    if (svgViewBox.length !== 4) return;

    let svgWidth = windowDimensions.width;
    if (svgWidth > svgViewBox[2]) svgWidth = svgViewBox[2];
    let svgHeight = 1.0 * svgWidth * svgViewBox[3] / svgViewBox[2];

    //console.log(this.state.layout);
    //console.log(windowDimensions);

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
            viewBox={svg.attrs.viewBox}>
            {svg.childs.map((c: any) => this.renderSvg(c))}
          </Svg>
        {/*<Animated.View
          style={{ transform: this.state.pan.getTranslateTransform(),
            background: "lime"
           }}
          {...this.panResponder.panHandlers}>
        </Animated.View>*/}
      </View>
        {/*this.state.layout &&
          <Text
            style={{
              position: "absolute",
              left: this.state.layout.x,
              top: this.state.layout.y,
            }}
            >YEAH</Text>*/}
      </View>
    );
  }
}
