import React from 'react';
import {
  Text,
  View
} from 'react-native';
import FirstLetterTextInput from './FirstLetterTextInput';
import * as BMC from './BmcData';


type BmcTextInputProps = {
  allowBackspace?: boolean;
  displayAllItems?: boolean;
  displayAllTextInItem?: boolean;
  items: BMC.BmcItem[];
  style: {};
}


type BmcTextInputState = {
  index: number;
  previousIndex: number | null;
}


export default class BmcTextInput
extends React.Component<BmcTextInputProps, BmcTextInputState> {

  itemInputs: FirstLetterTextInput[];

  constructor(props: BmcTextInputProps) {
    super(props);

    this.itemInputs = new Array<FirstLetterTextInput>(this.props.items.length);

    this.state = {
      index: 0,
      previousIndex: null,
    }
  }

  render() {
    return (
      <View
        style={[this.props.style, {
          alignItems: "flex-start",
          flexDirection: "column",
        }]}
      >
      {this.props.items.map((item, i) => {
        let s = "" + item.chapter + ".";
        if (!this.props.displayAllItems) {
          // XXX This causes the keyboard to flicker on backspace
          if (i > this.state.index) return null;
        }
        return (
          <View
            key={i}
            style={{
              alignItems: "stretch",
              flexDirection: "row",
            }}
            >
            <Text
              style={{
                flexShrink: 0,
                textAlign: "right",
                width: 40,
              }}
              >{s + "  "}</Text>
            <FirstLetterTextInput
              ref={r => { if (r != null) this.itemInputs[i] = r; }}
              allowBackspace={this.props.allowBackspace}
              displayAll={this.props.displayAllTextInItem}
              readOnly={this.state.index !== i
                && this.state.previousIndex !== i}
              style={this.props.style}
              text={item.label}
              onCompletion={() => {
                if (i + 1 < this.itemInputs.length) {
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
                      this.itemInputs[i + 1].focus();
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
                      this.itemInputs[i - 1].backspace();
                      this.itemInputs[i - 1].focus();
                      // XXX Doing this will still cause some flicker!
                      //(async () => this.setState({ previousIndex: null }))();
                    }, 25);
                  });
                }
              }}
              />
          </View>
        )
      })}
      </View>
    );
  }
}
