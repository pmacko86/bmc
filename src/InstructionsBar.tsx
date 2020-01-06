import React from 'react';
import { Text } from 'react-native';
import STYLES from './Styles';


type InstructionsBarProps = {
  text: string;
}


type InstructionsBarState = {
}


export default class InstructionsBar
extends React.Component<InstructionsBarProps, InstructionsBarState> {

  render() {
    return (
      <Text
        style={STYLES.instructions}
        selectable={false}
        >{this.props.text}</Text>
    );
  }
}
