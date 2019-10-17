import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BmcTextInput from './BmcTextInput';
import InstructionsBar from './InstructionsBar';
import TopBar from './TopBar';
import * as BMC from './BmcData';


type TestScreenProps = {
  navigation: NavigationStackProp<{ book: string }>;
}


type TestScreenState = {
}


export default class TestScreen
extends React.Component<TestScreenProps, TestScreenState> {

  constructor(props: TestScreenProps) {
    super(props);
    this.state = {}
  }

  render() {
    const bookName = this.props.navigation.getParam("book");
    const book = BMC.BMC_DATA.contents.find(b => b.title === bookName);
    if (book === undefined) return <Text>Internal Error</Text>;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
        }}
        >
        <TopBar
          navigation={this.props.navigation as unknown as NavigationStackProp}
          text={bookName}
          onBackIfWeb={() => this.props.navigation.navigate("BookAction", { book: bookName })}
          />
        <InstructionsBar
          text={"Please type just the first letter, but spell out acronyms:"} />
        <KeyboardAvoidingView behavior={"padding"}>
          <ScrollView
            style={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps={"handled"}
            >
            <BmcTextInput
              allowBackspace={true}
              displayAllItems={false}
              displayAllTextInItem={false}
              items={book.items}
              />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
