import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native';


type MyKeyboardAvoidingViewProps = {
}


type MyKeyboardAvoidingViewState = {
}


export default class MyKeyboardAvoidingView
extends React.Component<MyKeyboardAvoidingViewProps,
  MyKeyboardAvoidingViewState> {

  constructor(props: MyKeyboardAvoidingViewProps) {
    super(props);
    this.state = {}
  }

  render() {
    if (Platform.OS === "web") {
      if (!this.props.children) return null;
      let a = React.Children.map(this.props.children, c => c);
      if (!a || a.length === 0) return null;
      return a[0];
    }
    else {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? undefined : "padding"}>
          {this.props.children}
        </KeyboardAvoidingView>
      );
    }
  }
}
