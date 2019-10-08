import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./screens/Home";
import CameraScreen from "./screens/Camera";

const AppNavigator = createStackNavigator(
{
   Home : {screen: HomeScreen},
   Camera : {screen: CameraScreen},

},
{
  defaultNavigationOptions: {
    title:"PhotoClicker",
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}

); 
const App = createAppContainer(AppNavigator);
export default App;


