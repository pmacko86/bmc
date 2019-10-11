import React from 'react';
import HomeScreen from './HomeScreen';
import StudyScreen from './StudyScreen';

// @ts-ignore
// eslint-disable-next-line
import { createSwitchNavigator } from "@react-navigation/core";
// eslint-disable-next-line
import { createStackNavigator } from 'react-navigation-stack';
// eslint-disable-next-line
import { createAppContainer } from 'react-navigation';


const routes: {} = {
  Home: {screen: HomeScreen},
  Study: {screen: StudyScreen},
}

const MainNavigator = createStackNavigator(routes, {
  headerMode: "none",
});

const App = createAppContainer(MainNavigator);
export default App;
