import React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableWithoutFeedback,
  View
} from 'react-native';


type FirstLetterTextInputProps = {
  allowBackspace?: boolean;
  displayAll?: boolean;
  readOnly?: boolean;
  style: {};
  text: string;
  onCompletion?: () => void;
  onTopBackspace?: () => void;
}


type FirstLetterTextInputState = {
  value: string;
  index: number;
  correct: boolean[];
}


export default class FirstLetterTextInput
extends React.Component<FirstLetterTextInputProps, FirstLetterTextInputState> {

  words: string[];
  input: TextInput | null;

  constructor(props: FirstLetterTextInputProps) {
    super(props);

    this.input = null;
    this.words = props.text.split(" ");
    let n = this.words.length;

    this.state = {
      value: "",
      index: 0,
      correct: new Array<boolean>(n)
    }

    this.handlePress = this.handlePress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  backspace() {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
      });
    }
    else {
      // TODO Call this asynchronously?
      if (this.props.onTopBackspace !== undefined) {
        this.props.onTopBackspace();
      }
    }
  }

  focus() {
    if (this.input != null) this.input.focus();
  }

  handlePress(event: GestureResponderEvent) {
    this.focus();
  }

  handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    event.preventDefault();
    /*if (event.nativeEvent.metaKey || event.nativeEvent.altKey
      || event.nativeEvent.ctrlKey) event.preventDefault();*/
    let key = event.nativeEvent.key.toLowerCase();

    if (key === "backspace" && this.props.allowBackspace) {
      this.backspace();
    }

    if (key.length === 1 && key.match(/[a-z]/i)) {
      if (this.state.index >= this.words.length) return;

      let index = this.state.index;
      let word = this.words[index].toLowerCase();

      let firstWordCharacter = "";
      for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i);
        if (c.match(/[a-z]/i)) {
          firstWordCharacter = c;
          break;
        }
      }

      let matches = key === firstWordCharacter || firstWordCharacter === "";
      let correct = this.state.correct.slice(0);
      correct[index] = matches;
      index++;

      this.setState({
        index: index,
        correct: correct,
      });

      if (index >= this.words.length) {
        // TODO Call this asynchronously?
        if (this.props.onCompletion !== undefined) {
          this.props.onCompletion();
        }
      }
    }
  }

  render() {
    const readOnly = this.props.readOnly !== undefined && this.props.readOnly;
    const style = {
      input: {
        //border: 'none'
      },
      correct: {
        color: "black"
      },
      wrong: {
        color: "red"
      },
      unseen: {
        color: "gray"
      },
    }
    return (

      <TouchableWithoutFeedback
        onPress={this.handlePress}
      >
      <View
        style={[this.props.style, {
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexShrink: 1,
          flexWrap: 'wrap',
        }]}
      >
        <Text></Text>
        {this.words.map((w, i) => {
          if (i >= this.state.index) return null;
          return (
            <Text key={i}
              style={this.state.correct[i] ? style.correct : style.wrong }
              >{(i > 0 ? " " : "") + w}</Text>
          )
        })}
        {readOnly ? null : (
            <TextInput
              ref={r => this.input = r}
              style={{
                position: "relative",
                width: 5,
                left: this.state.index === 0 ? 0 : 4
              }}
              onKeyPress={this.handleKeyPress}
              autoCompleteType={"off"}
              autoCorrect={false}
              autoFocus={true}
              editable={true}
              selectTextOnFocus={false}
              caretHidden={false}
              value={""}
              maxLength={0}
              secureTextEntry={false}
              textContentType={"none"}
              autoCapitalize={"characters"}
              />
          )
        }
        {this.words.map((w, i) => {
          if (i < this.state.index) return null;
          return (
            <Text key={i}
              selectable={this.props.displayAll}
              style={[{
                color: this.props.displayAll ? "gray" : "#00000000",
                marginLeft: i === this.state.index && !readOnly ? -5 : 0
              }/*, style.unseen*/]}
              >{(i > 0 ? " " : "") + w}</Text>
          )
        })}
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
