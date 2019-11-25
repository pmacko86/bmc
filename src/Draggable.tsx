import React from 'react';
import {
  Animated,
  LayoutRectangle,
  PanResponder,
  PanResponderInstance,
  Text,
  View,
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
  dropLocation?: LayoutRectangle;
  dropLocationRelative?: View | Text | null;
  onDropToLocation?: () => void;
  style: {};
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

  deltaPosition: XY;
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

    if (!this.props.dropLocation) {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 10
      }).start();
      return;
    }

    const gx = gestureX;
    const gy = gestureY;
    const dlx = this.props.dropLocation.x + relativeX;
    const dly = this.props.dropLocation.y + relativeY;

    if (gx >= dlx && gx < dlx + this.props.dropLocation.width
      && gy >= dly && gy < dly + this.props.dropLocation.height) {
      if (this.props.onDropToLocation) this.props.onDropToLocation();
    }
    else {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 10
      }).start();
    }
  }


  /**
   * Handler for receiving properties.
   *
   * @param [DraggableProps] props the new properties
   */
  UNSAFE_componentWillReceiveProps(props: DraggableProps) {
    if (!props.disabled) {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          const gx = gesture.moveX;
          const gy = gesture.moveY;
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
