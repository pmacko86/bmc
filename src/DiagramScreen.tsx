import React from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BmcDiagram from './BmcDiagram';
import InstructionsBar from './InstructionsBar';
import TopBar from './TopBar';
import * as BMC from './BmcData';


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
          text={"Drag labels to the diagram:"} />
        <BmcDiagram book={bookName} testMode={true} testHints={true} />
      </SafeAreaView>
    );
  }
}
