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
import BmcTextInput from './BmcTextInput';
import BookChooser from './BookChooser';
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


type MainProps = {
  library: BMC.BmcLibrary
}


type MainState = {
  book: BMC.BmcBook | null | undefined
}


class Main
extends React.Component<MainProps, MainState> {

  bookItems: string[];

  constructor(props: MainProps) {
    super(props);
    this.bookItems = this.props.library.contents.map(b => b.title);
    this.state = {
      book: null,
    }

    this.handleBookChoose = this.handleBookChoose.bind(this);
  }


  handleBookChoose(book: string) {
    this.setState({
      book: this.props.library.contents.find(b => b.title === book)
    });
  }


  render() {
    if (!this.state.book) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text
            style={styles.header}
            >Choose a book to study.</Text>
          <ScrollView>
            <BookChooser
              items={this.bookItems}
              style={styles.test}
              onChoose={this.handleBookChoose}
              />
          </ScrollView>
        </SafeAreaView>
      );
    }
    else {
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
              onPress={e => this.setState({book: null})}
              >
              <Text
                style={styles.header}
                >&lt;</Text>
            </TouchableHighlight>
            <Text
              style={styles.header}
              >{this.state.book.title}</Text>
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
                items={this.state.book.items}
                style={styles.test}
                />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }
}


export default function App() {
  return (
    <Main
      library={BMC.BMC_DATA}
      />
  );
}
