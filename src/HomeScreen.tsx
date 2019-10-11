import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

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

type HomeScreenProps = {
  navigation: NavigationStackProp;
}

type HomeScreenState = {
}

export default class HomeScreen
extends React.Component<HomeScreenProps, HomeScreenState> {

  bookItems: string[];

  constructor(props: HomeScreenProps) {
    super(props);
    this.bookItems = BMC.BMC_DATA.contents.map(b => b.title);
    this.state = {}
    this.handleBookChoose = this.handleBookChoose.bind(this);
  }


  handleBookChoose(book: string) {
    this.props.navigation.navigate("Study", { book: book });
  }


  render() {
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
}
