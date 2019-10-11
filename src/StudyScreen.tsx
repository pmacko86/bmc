import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BmcTextInput from './BmcTextInput';
import * as BMC from './BmcData';

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 4,
  },
  instructions: {
    backgroundColor: "#ccc",
    //borderBottom: "solid thin #000",
    color: "#000",
    padding: 4,
  },
  test: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 4,
  }
});



type StudyScreenProps = {
  navigation: NavigationStackProp<{ book: BMC.BmcBook }>;
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
        <View
          style={[styles.header, {
            flexDirection: "row",
          }]}
          >
          <TouchableHighlight
            onPress={e => this.props.navigation.goBack()}
            >
            <Text
              style={styles.header}
              >&lt;</Text>
          </TouchableHighlight>
          <Text
            style={styles.header}
            >{book.title}</Text>
        </View>
        <Text
          style={[{
            flexGrow: 0,
          }, styles.instructions]}
          >Please type just the first letter.</Text>
        <KeyboardAvoidingView behavior={"padding"}>
          <ScrollView
            style={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps={"handled"}
            >
            <BmcTextInput
              allowBackspace={true}
              displayAllItems={true}
              displayAllTextInItem={true}
              items={book.items}
              style={styles.test}
              />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
