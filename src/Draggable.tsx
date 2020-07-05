import React from 'react';
import {
  Animated,
  MeasureOnSuccessCallback,
  LayoutRectangle,
  PanResponder,
  PanResponderInstance,
  Text,
  View,
  ViewStyle,
} from "react-native";


/**
 * Point coordinates.
 */
type XY = {
  x: number;
  y: number;
}


type DraggableProps = {
  disabled?: boolean;
  dropLocation?: LayoutRectangle | LayoutRectangle[];
  dropLocationScale?: number | Animated.Value,
  dropLocationRelative?: View | Text | null;
  onDragStart?: () => void;
  onDragStop?: () => void;
  onDropToLocation?: (index: number) => void;
  onAfterInvalidDrop?: () => void;
  reverseScaleDropLocation?: boolean;
  scale?: number | Animated.Value;
  style: ViewStyle;
}


type DraggableState = {
  pan: Animated.ValueXY;
}


/**
 * A draggable element.
 */
export default class Draggable
extends React.Component<DraggableProps, DraggableState> {

  ref: View | null;

  scale: number;
  deltaPosition: XY;
  dropLocationScale: number;
  panResponder: PanResponderInstance | undefined;


  /**
   * The constructor.
   *
   * @param [DraggableProps] props the properties
   */
  constructor(props: DraggableProps) {
    super(props);
    this.deltaPosition = { x: 0, y: 0 };
    this.ref = null;
    this.state = { pan: new Animated.ValueXY() };
    this.state.pan.addListener((value) => this.deltaPosition = value);
    this.state.pan.setValue({ x: 0, y: 0 });

    if (this.props.scale === undefined) {
      this.scale = 1;
    }
    else if (typeof(this.props.scale) == "number") {
      this.scale = this.props.scale as number;
    }
    else {
      this.scale = 1;
      this.props.scale.addListener((e) => this.scale = e.value);
    }

    if (this.props.dropLocationScale === undefined) {
      this.dropLocationScale = 1;
    }
    else if (typeof(this.props.dropLocationScale) == "number") {
      this.dropLocationScale = this.props.dropLocationScale as number;
    }
    else {
      this.dropLocationScale = 1;
      this.props.dropLocationScale.addListener(
        (e) => this.dropLocationScale = e.value);
    }

    this.updatePanHandlers();
  }


  /**
   * The handle on drag release.
   *
   * @param [number] gestureX the X coordinate of the release
   * @param [number] gestureY the Y coordinate of the release
   * @param [number] relativeX the delta to apply to the X coordinate
   * @param [number] relativeY the delta to apply to the Y coordinate
   */
  onRelease(gestureX: number, gestureY: number,
    relativeX: number, relativeY: number) {

    if (!this.props.dropLocation
      || (Array.isArray(this.props.dropLocation)
        && this.props.dropLocation.length === 0)) {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 10
      }).start();
      return;
    }

    const gx = gestureX;
    const gy = gestureY;

    let dropLocations = Array.isArray(this.props.dropLocation)
      ? this.props.dropLocation : [this.props.dropLocation];

    for (let i = 0; i < dropLocations.length; i++) {
      let dlx = dropLocations[i].x * this.dropLocationScale + relativeX;
      let dly = dropLocations[i].y * this.dropLocationScale + relativeY;
      let dlw = dropLocations[i].width * this.dropLocationScale;
      let dlh = dropLocations[i].height * this.dropLocationScale;

      if (this.props.reverseScaleDropLocation) {
        let midpointX = dlx + dlw / 2;
        let midpointY = dly + dlh / 2;
        dlw = dlw / this.dropLocationScale;
        dlh = dlh / this.dropLocationScale;
        dlx = midpointX - dlw / 2;
        dly = midpointY - dlh / 2;
      }

      if (gx >= dlx && gx < dlx + dlw && gy >= dly && gy < dly + dlh) {
        if (this.props.onDropToLocation) {
          this.props.onDropToLocation(i);
        }
      }
      else {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          //friction: 10,
          speed: 100,
        }).start(this.props.onAfterInvalidDrop);
      }
    }
  }


  /**
   * Handler for after new properties were received.
   *
   * @param [DraggableProps] prevProps the previous properties
   */
  componentDidUpdate(prevProps: DraggableProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.updatePanHandlers();
    }
  }


  /**
   * Update the pan handlers.
   */
  updatePanHandlers() {
    if (!this.props.disabled) {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => {
          if (this.props.onDragStart) {
            this.props.onDragStart();
          }
          return true;
        },
        onPanResponderMove: (e, gesture) => {
          // Animated.event([ null,
          //   { dx: this.state.pan.x, dy: this.state.pan.y, } ]),
          this.state.pan.x.setValue(gesture.dx / this.scale);
          this.state.pan.y.setValue(gesture.dy / this.scale);
        },
        onPanResponderRelease: (e, gesture) => {
          if (this.props.onDragStop) {
            this.props.onDragStop();
          }
          const gx = gesture.moveX * this.scale;
          const gy = gesture.moveY * this.scale;
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
    else {
      this.panResponder = PanResponder.create({});
      this.state.pan.setValue({ x: 0, y: 0 });
    }
  }


  /**
   * Perform a spring animation
   */
  spring(conf: Animated.SpringAnimationConfig,
    onCompletion?: Animated.EndCallback) {
    if (this.state.pan) {
      Animated.spring(this.state.pan, conf).start(onCompletion);
    }
  }


  /**
   * Reset the pan value
   */
  resetPan() {
    if (this.state.pan) {
      this.state.pan.setValue({ x: 0, y: 0 });
    }
  }


  /**
   * Measure
   */
  measure(callback: MeasureOnSuccessCallback) {
    if (this.ref) {
      this.ref.measure(callback);
    }
  }


  /**
   * Render the component.
   *
   * @return [Animated.View] the rendered component.
   */
  render() {
    let panHandlers = this.panResponder ? this.panResponder.panHandlers : {};
    return (
      <Animated.View
        style={{
          transform: this.state.pan.getTranslateTransform(),
          // @ts-ignore
          position: this.props.style.position,
          // @ts-ignore
          left: this.props.style.left,
          // @ts-ignore
          top: this.props.style.top,
        }}
        {...panHandlers}>
        <View ref={r => { this.ref = r; }}>
          {this.props.children}
        </View>
      </Animated.View>);
  }
}
