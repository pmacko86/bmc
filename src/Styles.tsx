import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
  headerBackView: {
    backgroundColor: "#222",
    borderColor: "#aaa",
    borderWidth: 1,
    margin: 4,
  },
  headerBackText: {
    color: "#aaa",
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    paddingBottom: 13,
    paddingLeft: 12,
    paddingTop: 13,
  },
  headerView: {
    backgroundColor: "#000",
    padding: 4,
  },
  instructions: {
    backgroundColor: "#ccc",
    color: "#000",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 4,
  },
  testView: {
    backgroundColor: "#fff",
    padding: 4,
  },
  bmcTextChapter: {
    paddingTop: 4,
    width: 55,
  },
  testWarningMessage: {
    color: "red",
    paddingTop: 15,
    paddingLeft: 55,
  },
  actionList: {
    backgroundColor: "#fff",
    padding: 4,
  },
  actionListItem: {
    color: "#000",
    padding: 4,
  },
  studyHeadingStyle: {
    color: "#000",
    fontWeight: "bold",
  },
  studyCorrectStyle: {
    color: "#040",
    textDecorationLine: "underline",
  },
  studyUnseenStyle: {
    color: "#000",
  },
});

export default STYLES;
