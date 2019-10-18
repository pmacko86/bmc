import React from 'react';
import {
  Text,
  View
} from 'react-native';
import FirstLetterTextInput from './FirstLetterTextInput';
import * as BMC from './BmcData';
import STYLES from './Styles';


type BmcTextInputProps = {
  allowBackspace?: boolean;
  displayAllItems?: boolean;
  displayAllTextInItem?: boolean;
  items: BMC.BmcItem[];
}


type BmcTextInputState = {
  index: number;
  previousIndex: number | null;
}


type BmcTextInputElement = {
  addSpace: boolean;
  index: number;
  input?: FirstLetterTextInput;
  isHeading: boolean;
  item: BMC.BmcItem;
}


export default class BmcTextInput
extends React.Component<BmcTextInputProps, BmcTextInputState> {

  elements: BmcTextInputElement[];

  constructor(props: BmcTextInputProps) {
    super(props);

    let n = this.props.items.length;
    for (let i = 0; i < this.props.items.length; i++) {
      let h = this.props.items[i].heading;
      if (h !== undefined && h !== null && h !== "") n++;
    }

    this.elements = new Array<BmcTextInputElement>(n);
    let j = 0;
    for (let i = 0; i < this.props.items.length; i++) {
      let h = this.props.items[i].heading;
      if (h !== undefined && h !== null && h !== "") {
        this.elements[j++] = {
          index: i,
          item: this.props.items[i],
          isHeading: true,
          addSpace: true,
        }
      }
      this.elements[j++] = {
        index: i,
        item: this.props.items[i],
        isHeading: false,
        addSpace: h === "",
      }
    }

    this.state = {
      index: 0,
      previousIndex: null,
    }
  }


  createInput(i: number, label: string, isHeading: boolean) {
    const headingStyle = {
      fontWeight: "bold",
      //textDecoration: "underline",
    };
    return <FirstLetterTextInput
      ref={r => {
        if (r != null && this.elements[i]) this.elements[i].input = r;
      }}
      allowBackspace={this.props.allowBackspace}
      correctStyle={!isHeading ? undefined : headingStyle }
      incorrectStyle={!isHeading ? undefined : headingStyle }
      unseenStyle={!isHeading ? undefined : headingStyle }
      displayAll={this.props.displayAllTextInItem}
      readOnly={this.state.index !== i
        && this.state.previousIndex !== i}
      style={STYLES.test}
      text={label}
      onCompletion={() => {
        if (i + 1 < this.elements.length) {
          this.setState({
            index: i + 1,
            previousIndex: i
          }, () => {
            // We need to hand off the focus to the next input element
            // while the old one still exists, and only then we can
            // clean up the old one. Otherwise the keyboard (at least
            // on iOS) would flicker and occassionally switch from
            // a third-party keyboard to the system keyboard.
            setTimeout(() => {
              let input = this.elements[i + 1].input;
              if (input) input.focus();
              setTimeout(() => {
                // XXX Doing this will still cause some flicker!
                //this.setState({ previousIndex: null });
              }, 25);
            }, 25);
          });
        }
      }}
      onTopBackspace={() => {
        if (i > 0) {
          this.setState({
            index: i - 1,
            previousIndex: i
          }, () => {
            setTimeout(() => {
              let input = this.elements[i - 1].input;
              if (input) {
                input.backspace();
                input.focus();
              }
              // XXX Doing this will still cause some flicker!
              //(async () => this.setState({ previousIndex: null }))();
            }, 25);
          });
        }
      }}
    />
  }


  render() {
    return (
      <View
        style={[{}, {
          alignItems: "flex-start",
          flexDirection: "column",
        }]}
      >
      {this.elements.map((element, i) => {
        if (!this.props.displayAllItems) {
          // XXX This causes the keyboard to flicker on backspace
          if (i > this.state.index) return null;
        }

        let item = element.item;
        if (element.isHeading) {
          return <View
            key={i}
            style={{
              alignItems: "stretch",
              flexDirection: "row",
              paddingTop: !element.addSpace ? 0 : (i === 0 ? 6 : 12),
            }}
            >
            <Text style={{ flexShrink: 0, width: 45 }}></Text>
            {item.heading && item.heading !== ""
              ? this.createInput(i, item.heading, true)
              : null}
          </View>
        }

        let s = "";
        if (element.index === 0) {
          s += item.chapter;
        }
        else {
          const previous = this.props.items[element.index-1];
          if (previous.chapter !== item.chapter) {
            s += item.chapter;
          }
        }
        if (item.part) s += item.part;
        s += ".";
        return (
          <View
            key={i}
            style={{
              alignItems: "stretch",
              flexDirection: "row",
              paddingTop: !element.addSpace ? 0 : (i === 0 ? 6 : 12),
            }}
            >
            <Text
              style={[STYLES.bmcTextChapter, {
                flexShrink: 0,
                textAlign: "right",
                width: 45,
              }]}
              >{s + "  "}</Text>
              {this.createInput(i, item.label, false)}
          </View>
        )
      })}
      </View>
    );
  }
}