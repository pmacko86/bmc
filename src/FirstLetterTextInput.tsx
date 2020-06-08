import React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  View
} from 'react-native';


// TODO: Redo this from byLetter to bySegment, so that it is more
// flexible. This way, also backspace would work better, since currently
// it has problems if the word contains "-" and it is byLetter.

// TODO: Optional words, e.g. "the"
// TODO: Numbers and numerals should be typed interchangeably
// TODO: Account for keyboard distance, especially on small devices


type FirstLetterTextInputProps = {
  allowBackspace?: boolean;
  autoFocus?: boolean;
  displayAll?: boolean;
  readOnly?: boolean;
  style?: {};
  correctStyle?: TextStyle | (TextStyle | undefined)[];
  incorrectStyle?: TextStyle | (TextStyle | undefined)[];
  unseenStyle?: TextStyle | (TextStyle | undefined)[];
  optionalWords?: string[];
  text: string;
  onCompletion?: () => void;
  onTopBackspace?: () => void;
  onBackspace?: () => void;
  onCorrectInput?: () => void;
  onIncorrectInput?: () => void;
}


type FirstLetterTextInputState = {
  index: number;
  charIndex: number;
  correct: boolean[][];
  triggered: boolean[];
  keyPressCount: number;
}


type FirstLetterTextInputWord = {
  word: string;
  byLetter: boolean;
  skip: boolean;
  optional: boolean;
  showOnlyIfTriggered: boolean;
}


type FirstLetterTextInputDoNextWordResult = {
  index: number;
  charIndex: number;
  wasCorrect: boolean;
  reachedEnd: boolean;
}


export default class FirstLetterTextInput
extends React.Component<FirstLetterTextInputProps, FirstLetterTextInputState> {

  words: FirstLetterTextInputWord[];
  input: TextInput | null;
  editlockLocked: boolean;
  editlockTimeMS: number;
  editlockTimeoutMS: number;
  editlockTimeoutSafetyMS: number;

  constructor(props: FirstLetterTextInputProps) {
    super(props);

    this.input = null;

    this.editlockLocked = false;
    this.editlockTimeMS = 0;
    this.editlockTimeoutMS = 25;
    this.editlockTimeoutSafetyMS = 100;

    const textParts = props.text
      .replace(/---/g, "\u2014")     // &mdash;
      .replace(/ -- /g, " \u2013 ")  // &ndash;
      .replace(/--/g, "\u2014")      // &mdash;
      .split(/(?=[ /\u2013\u2014-])/g);
    const n = textParts.length;
    let words = new Array<FirstLetterTextInputWord>(n);
    for (let i = 0; i < n; i++) {
      let w = textParts[i];
      if (w.length > 0 && i > 0) {
        let t = w.charAt(0);
        w = w.substr(1);
        words[i - 1].word += t;
      }

      let byLetter = !!w.match(/^[^a-z]+$/)
        && !w.match(/^[^A-Z0-9]*[A-Z0-9][^A-Z0-9]*$/);
      let showOnlyIfTriggered = !byLetter
        && !!w.match(/^\[.+\][,;:]?[ ]?$/);
      let optional: boolean =
        (!byLetter && !!this.props.optionalWords
          && this.props.optionalWords.find(
            s => w.toLowerCase() === s.toLowerCase()) !== undefined)
        || showOnlyIfTriggered;   // [optional] word

      words[i] = {
        byLetter: byLetter,
        skip: !!w.match(/^[^A-Za-z0-9]*$/),
        optional: optional,
        showOnlyIfTriggered: showOnlyIfTriggered,
        word: w,
      }
    }

    this.words = words;
    this.state = {
      index: 0,
      charIndex: 0,
      correct: new Array<boolean[]>(n),
      triggered: new Array<boolean>(n),
      keyPressCount: 0,
    }

    this.handlePress = this.handlePress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  backspace(suppressTopBackspace: boolean = false) {

    let charIndex = this.state.charIndex;
    let index = this.state.index;

    while (true) {

      if (charIndex > 0) {
        charIndex--;
      }
      else if (index > 0) {
        index--;
        let prevWord = this.words[index];
        if (prevWord.byLetter && prevWord.word.length > 0) {
          charIndex = prevWord.word.length - 1;
        }
        else {
          charIndex = 0;
        }
      }
      else {
        this.setState({
          index: index,
          charIndex: charIndex,
        });

        if (this.props.onTopBackspace !== undefined
          && !suppressTopBackspace) {
          // TODO Call this asynchronously?
          this.props.onTopBackspace();
        }

        return;
      }

      let w = this.words[index];
      if (w.skip) continue;
      if (w.showOnlyIfTriggered) {
        if (!this.state.triggered[index]) continue;
      }
      if (w.byLetter) {
        if (w.word.charAt(charIndex).match(/[A-Za-z0-9]/)) break;
      }
      else {
        break;
      }
    }

    this.setState({
      index: index,
      charIndex: charIndex,
    });
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

  handleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    event.stopPropagation();
    event.preventDefault();
    let key = event.nativeEvent.text.toLowerCase();
    this.handleKey(key);
  }

  handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    event.stopPropagation();
    event.preventDefault();
    let key = event.nativeEvent.key.toLowerCase();
    this.handleKey(key);
  }

  temporaryEventLock() {
    let t = (new Date()).getTime();
    this.editlockTimeMS = t;
    this.editlockLocked = true;
    setTimeout(
      () => { this.editlockLocked = false; },
      this.editlockTimeoutMS);
  }

  findNextCharacter(s: string, start: number) : [string, number] {
    for (let i = start; i < s.length; i++) {
      const c = s.charAt(i);
      if (c.match(/[a-z0-9]/i)) {
        return [c, i];
      }
    }
    return ["", s.length];
  }

  updateCorrectState(correctState: boolean[][], index: number,
    value: boolean, from: number = 0, to: number = -1) {
    const word = this.words[index];
    if (!correctState[index]) {
      correctState[index] = new Array<boolean>(word.word.length);
    }
    if (word.byLetter) {
      if (to <= 0 || to > correctState[index].length) {
        to = correctState[index].length;
      }
      for (let i = from; i < to; i++) {
        correctState[index][i] = value;
      }
    }
    else {
      for (let i = 0; i < correctState[index].length; i++) {
        correctState[index][i] = value;
      }
    }
  }

  doNextWord(index: number, charIndex: number, key: string,
    correctState: boolean[][], triggeredState: boolean[])
    : FirstLetterTextInputDoNextWordResult {

    if (index >= this.words.length) {
      return {
        index: this.words.length,
        charIndex: 0,
        wasCorrect: false,
        reachedEnd: true,
      }
    }

    let word = this.words[index];
    let wordLowerCase = word.word.toLowerCase();
    let originalIndex = index;
    let originalCharIndex = charIndex;

    let [nextWordCharacter, nextWordCharacterIndex]
      = this.findNextCharacter(wordLowerCase, charIndex);
    let [nextNextWordCharacter, nextNextWordCharacterIndex]
      = this.findNextCharacter(wordLowerCase, nextWordCharacterIndex + 1);


    // Determine whether the input is correct and mark the state
    // accordingly.

    let matches = key === nextWordCharacter || nextWordCharacter === "";
    this.updateCorrectState(correctState, index, matches, charIndex,
      nextNextWordCharacterIndex);

    triggeredState[index] = true;
    if (!matches && word.showOnlyIfTriggered) {
      triggeredState[index] = false;
    }


    // Advance to the next word or a part of the word.

    let nextWord = false;
    if (word.byLetter) {
      if (nextNextWordCharacter === "") {
        index++;
        charIndex = 0;
        nextWord = true;
      }
      else {
        charIndex = nextNextWordCharacterIndex;
      }
    }
    else {
      index++;
      charIndex = 0;
      nextWord = true;
    }


    // Ensure that the next word is actually a word, not just
    // something that will be skipped entirely.

    if (nextWord) {
      while (index < this.words.length && this.words[index].skip) {
        this.updateCorrectState(correctState, index, true);
        index++;
      }
    }


    // Check if this is an optional word, in which case maybe
    // we should revisit the decision to mark this word wrong.

    if (!matches && !word.byLetter && word.optional) {

      // Speculatively look ahead to the next word. Note that we don't
      // allow the last word to be an optional word at this point
      // because we lack the ability to check the word on the next
      // instance of this object (if there is one).

      const r = this.doNextWord(index, charIndex, key, correctState,
        triggeredState);
      if (r.wasCorrect) {
        this.updateCorrectState(correctState, originalIndex, true,
          originalCharIndex, nextNextWordCharacterIndex);
        triggeredState[originalIndex] = false;
        return r;
      }
      else if (word.showOnlyIfTriggered) {
        return this.doNextWord(index, charIndex, key, correctState,
          triggeredState);
      }
    }


    // Compose the return object.

    return {
      index: index,
      charIndex: charIndex,
      wasCorrect: matches,
      reachedEnd: index >= this.words.length,
    }
  }

  handleKey(key: string) {

    if (this.editlockLocked) {
      let t = (new Date()).getTime();
      if (this.editlockTimeMS + this.editlockTimeoutSafetyMS < t) {
        this.editlockLocked = false;
      }
      else {
        return;
      }
    }
    else {
      this.temporaryEventLock();
    }

    this.setState((s) => { return { keyPressCount: s.keyPressCount + 1 }});

    if (key === "backspace" && this.props.allowBackspace) {
      this.backspace();
      if (this.props.onBackspace !== undefined) {
        this.props.onBackspace();
      }
    }

    if (key.length === 1 && key.match(/[a-z0-9]/i)) {
      if (this.state.index >= this.words.length) return;


      // Process the next word

      let correctState = this.state.correct.slice(0);
      let triggeredState = this.state.triggered.slice(0);
      let r = this.doNextWord(this.state.index,
        this.state.charIndex, key, correctState, triggeredState);


      // Update the state and call callbacks.
      // TODO Do callbacks asynchronously?

      this.setState({
        index: r.index,
        charIndex: r.charIndex,
        correct: correctState,
        triggered: triggeredState,
      });

      if (r.reachedEnd) {
        if (this.props.onCompletion !== undefined) {
          this.props.onCompletion();
        }
      }

      if (r.wasCorrect && this.props.onCorrectInput !== undefined) {
        this.props.onCorrectInput();
      }

      if (!r.wasCorrect && this.props.onIncorrectInput !== undefined) {
        this.props.onIncorrectInput();
      }
    }
  }

  render() {
    const isAndroidWeb = navigator && navigator.userAgent
      ? navigator.userAgent.indexOf("Android") >= 0 : false;
    const readOnly = this.props.readOnly !== undefined && this.props.readOnly;
    const platformDependentProps:TextInputProps =
      Platform.OS === "web" ? {} : {
        autoCompleteType: "off"
      };
    /*const currentWord = this.state.index < this.words.length
      ? this.words[this.state.index] : null;*/
    const style = {
      correct: {
        color: "black"
      },
      incorrect: {
        color: "red"
      },
      unseen: {
        color: "#AAA"
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
          padding: 4,
        }]}
      >
        <Text></Text>
        {this.words.map((w, i) => {
          if (w.showOnlyIfTriggered && w.word.length > 0) {
            if (!this.state.triggered[i]) return null;
          }
          if (w.byLetter) {
            if (i > this.state.index) return null;
            return (
              <Text key={i}>{
                w.word.split("").map((c, j) => {
                  let correct = this.state.correct[i]
                    && this.state.correct[i][j];
                  if (i === this.state.index
                    && j >= this.state.charIndex) return null;
                  return <Text key={j}
                    style={[
                      correct ? style.correct : style.incorrect,
                      correct ? this.props.correctStyle
                        : this.props.incorrectStyle,
                    ]}
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
                style={[
                  correct ? style.correct : style.incorrect,
                  correct ? this.props.correctStyle
                    : this.props.incorrectStyle,
                ]}
                  >{w.word}</Text>
            )
          }
        })}
        {readOnly ? null : (
            <TextInput
              ref={r => this.input = r}
              style={[{
                margin: 0,
                padding: 0,
                width: 5,
              },
              Platform.OS === "android"
                && this.state.index === this.words.length
                ? { color: "#00000000" } : undefined,
              Platform.OS === "android"
                ? { height: 18 /* XXX do not hardcode! */ } : undefined]}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              autoCorrect={false}
              autoFocus={this.props.autoFocus}
              editable={true}
              selectTextOnFocus={false}
              caretHidden={false}
              value={""}
              maxLength={isAndroidWeb || Platform.OS === "android" ? 1 : 0}
              secureTextEntry={false}
              textContentType={"none"}
              autoCapitalize={"characters"}
              {...platformDependentProps}
              />
          )
        }
        {this.words.map((w, i) => {
          if (i < this.state.index) return null;
          if (w.showOnlyIfTriggered) return null;
          let fromIndex = (i === this.state.index
            && this.words[this.state.index].byLetter)
            ? this.state.charIndex : 0;
          let shiftLeft = i === this.state.index;
          for (let j = i - 1; j >= this.state.index; j--) {
            if (!this.words[j].showOnlyIfTriggered) break;
            if (j === this.state.index) shiftLeft = true;
          }
          return (
            <Text key={i}
              selectable={this.props.displayAll}
              style={[
                {
                  color: this.props.displayAll ? "inherit" : "#00000000",
                  marginLeft: shiftLeft && !readOnly ? -5 : 0
                },
                this.props.displayAll ? style.unseen : null,
                this.props.displayAll ? this.props.unseenStyle : null,
              ]}
              >{w.word.substr(fromIndex)}</Text>
          )
        })}
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
