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


// TODO: Redo this from byLetter to bySegment, so that it is more
// flexible. This way, also backspace would work better, since currently
// it has problems if the word contains "-" and it is byLetter.

// TODO: The spaces should be separate text elements or go after
// the words, not before.


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
  index: number;
  charIndex: number;
  correct: boolean[][];
}


type FirstLetterTextInputWord = {
  word: string;
  byLetter: boolean;
}


export default class FirstLetterTextInput
extends React.Component<FirstLetterTextInputProps, FirstLetterTextInputState> {

  words: FirstLetterTextInputWord[];
  input: TextInput | null;

  constructor(props: FirstLetterTextInputProps) {
    super(props);

    this.input = null;

    const textParts = props.text.split(" ");
    const n = textParts.length;
    let words = new Array<FirstLetterTextInputWord>(n);
    for (let i = 0; i < n; i++) {
      const w = textParts[i];
      words[i] = {
        byLetter: !!w.match(/^[A-Z0-9-]+$/),
        word: w,
      }
    }

    this.words = words;
    this.state = {
      index: 0,
      charIndex: 0,
      correct: new Array<boolean[]>(n)
    }

    this.handlePress = this.handlePress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  backspace() {
    if (this.state.charIndex > 0) {
      this.setState({
        charIndex: this.state.charIndex - 1,
      });
    }
    else if (this.state.index > 0) {
      let newCharIndex = 0;
      let prevWord = this.words[this.state.index - 1];
      if (prevWord.byLetter) newCharIndex = prevWord.word.length - 1;
      this.setState({
        index: this.state.index - 1,
        charIndex: newCharIndex,
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
    if (this.input != null) {
      this.input.focus();
    }
  }

  handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.focus();
  }

  handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    event.stopPropagation();
    event.preventDefault();
    let key = event.nativeEvent.key.toLowerCase();

    if (key === "backspace" && this.props.allowBackspace) {
      this.backspace();
    }

    if (key.length === 1 && key.match(/[a-z0-9]/i)) {
      if (this.state.index >= this.words.length) return;

      let index = this.state.index;
      let charIndex = this.state.charIndex;
      let word = this.words[index];
      let wordLowerCase = word.word.toLowerCase();

      let nextWordCharacter = "";
      let nextNextWordCharacter = "";
      let nextWordCharacterIndex = 0;
      let nextNextWordCharacterIndex = wordLowerCase.length;
      for (let i = charIndex; i < wordLowerCase.length; i++) {
        const c = wordLowerCase.charAt(i);
        if (c.match(/[a-z0-9]/i)) {
          if (nextWordCharacter === "") {
            nextWordCharacter = c;
            nextWordCharacterIndex = i;
          }
          else {
            nextNextWordCharacter = c;
            nextNextWordCharacterIndex = i;
            break;
          }
        }
      }

      let matches = key === nextWordCharacter || nextWordCharacter === "";
      let correct = this.state.correct.slice(0);
      if (!correct[index]) {
        correct[index] = new Array<boolean>(wordLowerCase.length);
      }
      if (word.byLetter) {
        for (let i = nextWordCharacterIndex;
          i < nextNextWordCharacterIndex; i++) {
          correct[index][i] = matches;
        }
      }
      else {
        for (let i = 0; i < correct[index].length; i++) {
          correct[index][i] = matches;
        }
      }

      if (word.byLetter) {
        if (nextNextWordCharacter === "") {
          index++;
          charIndex = 0;
        }
        else {
          charIndex++;
        }
      }
      else {
        index++;
        charIndex = 0;
      }

      this.setState({
        index: index,
        charIndex: charIndex,
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
    const currentWord = this.state.index < this.words.length
      ? this.words[this.state.index] : null;
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
        color: "#EEE"
      },
    }
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
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
          if (w.byLetter) {
            if (i > this.state.index) return null;
            return (
              <Text key={i}>{(i > 0 ? " " : "")}{
                w.word.split("").map((c, j) => {
                  let correct = this.state.correct[i]
                    && this.state.correct[i][j];
                  if (i === this.state.index
                    && j >= this.state.charIndex) return null;
                  return <Text key={j}
                    style={correct ? style.correct : style.wrong }
                    >{w.word[j]}</Text>
                }
              )
            }</Text>)
          }
          else {
            if (i >= this.state.index) return null;
            let correct = this.state.correct[i] && this.state.correct[i][0];
            return (
              <Text
                key={i}
                style={correct ? style.correct : style.wrong }
                  >{(i > 0 ? " " : "") + w.word}</Text>
            )
          }
        })}
        {readOnly ? null : (
            <TextInput
              ref={r => this.input = r}
              style={{
                margin: 0,
                padding: 0,
                position: "relative",
                width: 5,
                left: this.state.index === 0
                  || (currentWord && currentWord.byLetter) ? 0 : 4
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
          let noSpace = i <= 0 || (i === this.state.index
            && this.words[this.state.index].byLetter);
          let fromIndex = (i === this.state.index
            && this.words[this.state.index].byLetter)
            ? this.state.charIndex : 0;
          return (
            <Text key={i}
              selectable={this.props.displayAll}
              style={[{
                color: this.props.displayAll ? "#AAA" : "#00000000",
                marginLeft: i === this.state.index && !readOnly ? -5 : 0
              }/*, style.unseen*/]}
              >{(noSpace ? "" : " ") + w.word.substr(fromIndex)}</Text>
          )
        })}
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
