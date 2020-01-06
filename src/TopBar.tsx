import React from 'react';
import {
  GestureResponderEvent,
  Text,
  Platform,
  TouchableHighlight,
  View
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import STYLES from './Styles';


type TopBarProps = {
  navigation: NavigationStackProp;
  hideBack?: boolean;
  text: string;
  onBackIfWeb?: () => void;
}


type TopBarState = {
}


export default class TopBar
extends React.Component<TopBarProps, TopBarState> {

  constructor(props: TopBarProps) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }


  handleBack(event: GestureResponderEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (Platform.OS === "web" && this.props.onBackIfWeb) {
      this.props.onBackIfWeb();
    }
    else {
      this.props.navigation.goBack();
    }
  }


  render() {
    return (
      <View
        style={[STYLES.headerView, {
          flexDirection: "row",
        }]}
        >
        {this.props.hideBack ? null :
          <TouchableHighlight onPress={this.handleBack}>
            <View style={STYLES.headerBackView}>
              <Text
                style={STYLES.headerBackText}
                selectable={false}
                >&lt; Back</Text>
            </View>
          </TouchableHighlight>}
        <Text
          style={STYLES.headerTitle}
          selectable={false}
          >{this.props.text}</Text>
      </View>
    );
  }
}
