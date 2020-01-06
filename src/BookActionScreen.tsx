import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import InstructionsBar from './InstructionsBar';
import TopBar from './TopBar';
import STYLES from './Styles';

type BookActionScreenProps = {
  navigation: NavigationStackProp<{ book: string }>;
}

type BookActionScreenState = {
}

export default class BookActionScreen
extends React.Component<BookActionScreenProps, BookActionScreenState> {

  constructor(props: BookActionScreenProps) {
    super(props);
    this.state = {}
  }


  chooseAction(action: string) {
    const bookName = this.props.navigation.getParam("book");
    this.props.navigation.navigate(action, { book: bookName });
  }


  render() {
    const bookName = this.props.navigation.getParam("book");
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar
          navigation={this.props.navigation as unknown as NavigationStackProp}
          text={bookName}
          onBackIfWeb={() => this.props.navigation.navigate("Home")}
          />
        <InstructionsBar
          text={"What would you like to do?"} />
        <ScrollView style={STYLES.actionList}>
          <TouchableHighlight onPress={e => this.chooseAction("Study")}>
            <Text style={STYLES.actionListItem}>Study</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={e => this.chooseAction("Diagram")}>
            <Text style={STYLES.actionListItem}>Test the Diagram [experimental]</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={e => this.chooseAction("Test")}>
            <Text style={STYLES.actionListItem}>Test the Chapter Titles</Text>
          </TouchableHighlight>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
