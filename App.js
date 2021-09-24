import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MainScreen from './src/screen/main_screen/main_screen';
import { GoogleSignin } from '@react-native-community/google-signin';




export default class App extends Component {
  render() {
    return (
      <MainScreen />
    )
  }
}
