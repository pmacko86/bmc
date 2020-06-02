import React from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import BmcTextInput from './BmcTextInput';
import InstructionsBar from './InstructionsBar';
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView';
import TopBar from './TopBar';
import STYLES from './Styles';
import * as BMC from './BmcData';


type TestScreenProps = {
  navigation: NavigationStackProp<{ book: string }>;
}


type TestScreenState = {
  incorrectStreak: number;
}


export default class TestScreen
extends React.Component<TestScreenProps, TestScreenState> {

  shakeAnimation: Animated.Value;

  constructor(props: TestScreenProps) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
    this.state = {
      incorrectStreak: 0,
    };
  }

  shake() {
    const DURATION = 75;
    const EXTENT = 4;
    const RIGHT = {
      toValue: EXTENT,
      duration: DURATION,
      useNativeDriver: true
    };
    const LEFT = {
      toValue: -EXTENT,
      duration: DURATION,
      useNativeDriver: true
    };
    Animated.sequence([
      Animated.timing(this.shakeAnimation, RIGHT),
      Animated.timing(this.shakeAnimation, LEFT ),
      Animated.timing(this.shakeAnimation, RIGHT),
      Animated.timing(this.shakeAnimation, LEFT ),
      Animated.timing(this.shakeAnimation, RIGHT),
      Animated.timing(this.shakeAnimation, LEFT ),
    ]).start();
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
            <BmcTextInput
              allowBackspace={false}
              autoFocus={true}
              displayAllItems={false}
              displayAllTextInItem={false}
              optionalWords={["a", "an", "the"]}
              items={book.items}
              onBackspace={() => this.setState({ incorrectStreak: 0 })}
              onCorrectInput={() => this.setState({ incorrectStreak: 0 })}
              onIncorrectInput={() => {
                this.setState(
                  state => ({ incorrectStreak: state.incorrectStreak + 1 }),
                  () => {
                    if (this.state.incorrectStreak >= 4
                     && (this.state.incorrectStreak - 4) % 3 === 0) {
                      this.shake();
                    }
                  }
                );
              }}
              />
            {this.state.incorrectStreak >= 3 &&
              <Animated.View style={{
                transform: [{ translateX: this.shakeAnimation }]
              }}>
                <Text style={STYLES.testWarningMessage}>
                  &nbsp;Type just the first letter.
                </Text>
              </Animated.View>}
          </ScrollView>
        </MyKeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
