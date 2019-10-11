import HomeScreen from './HomeScreen';
import StudyScreen from './StudyScreen';

// @ts-ignore
// eslint-disable-next-line
import { createSwitchNavigator } from "@react-navigation/core";
// @ts-ignore
// eslint-disable-next-line
import { createBrowserApp } from '@react-navigation/web';


const routes: {} = {
  Home: {screen: HomeScreen},
  Study: {screen: StudyScreen},
}

const MainNavigator = createSwitchNavigator(routes, {
  backBehavior: "history",
});

const App = createBrowserApp(MainNavigator);
export default App;
