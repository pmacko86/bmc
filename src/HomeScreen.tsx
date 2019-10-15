import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import TopBar from './TopBar';

import BookChooser from './BookChooser';
import * as BMC from './BmcData';

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
    this.props.navigation.navigate("BookAction", { book: book });
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar
          hideBack={true}
          navigation={this.props.navigation as unknown as NavigationStackProp}
          text={"Choose a book to study"}
          />
        <ScrollView>
          <BookChooser
            items={this.bookItems}
            onChoose={this.handleBookChoose}
            />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
