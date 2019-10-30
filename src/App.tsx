import BookActionScreen from './BookActionScreen';
import HomeScreen from './HomeScreen';
import StudyScreen from './StudyScreen';
import TestScreen from './TestScreen';

// @ts-ignore
// eslint-disable-next-line
import { createSwitchNavigator } from "@react-navigation/core";
// @ts-ignore
// eslint-disable-next-line
import { createBrowserApp } from '@react-navigation/web';


const routes: {} = {
  Home: {screen: HomeScreen},
  BookAction: {screen: BookActionScreen},
  Study: {screen: StudyScreen},
  Test: {screen: TestScreen},
}

const MainNavigator = createSwitchNavigator(routes, {
  backBehavior: "history",
});

const App = createBrowserApp(MainNavigator, {
  history: "hash"
});
export default App;
