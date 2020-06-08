import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BmcDiagram from './BmcDiagram';
import BmcTextInput from './BmcTextInput';
import InstructionsBar from './InstructionsBar';
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView';
import TopBar from './TopBar';
import * as BMC from './BmcData';
import STYLES from './Styles';


type StudyScreenProps = {
  navigation: NavigationStackProp<{ book: string }>;
}


type StudyScreenState = {
}


export default class StudyScreen
extends React.Component<StudyScreenProps, StudyScreenState> {

  constructor(props: StudyScreenProps) {
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
        <MyKeyboardAvoidingView>
          <ScrollView
            style={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps={"handled"}
            >
            <BmcDiagram book={bookName} />
            <BmcTextInput
              allowBackspace={true}
              displayAllItems={true}
              displayAllTextInItem={true}
              everythingEditable={true}
              optionalWords={["a", "an", "the"]}
              headingStyle={STYLES.studyHeadingStyle}
              correctStyle={STYLES.studyCorrectStyle}
              unseenStyle={STYLES.studyUnseenStyle}
              items={book.items}
              />
          </ScrollView>
        </MyKeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
