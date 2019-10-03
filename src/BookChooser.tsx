import React from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';


type BookChooserProps = {
  items: string[];
  onChoose?: (book: string) => void;
  style: {};
}


type BookChooserState = {
}


export default class BookChooser
extends React.Component<BookChooserProps, BookChooserState> {

  constructor(props: BookChooserProps) {
    super(props);
    this.state = {
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
        return (
          <TouchableHighlight
            key={item}
            onPress={e => {
              if (this.props.onChoose) this.props.onChoose(item);
            }}
            >
            <Text>{item}</Text>
          </TouchableHighlight>
        )
      })}
      </View>
    );
  }
}
