import React from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import STYLES from './Styles';


type BookChooserProps = {
  items: string[];
  onChoose?: (book: string) => void;
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
        style={[STYLES.actionList, {
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
            <Text style={STYLES.actionListItem}>{item}</Text>
          </TouchableHighlight>
        )
      })}
      </View>
    );
  }
}
