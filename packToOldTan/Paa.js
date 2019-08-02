import React, { Component } from "react";
import {StyleSheet, ImageBackground, Dimensions} from "react-native";
import Weather from './weather.js'
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
class Paa extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header:null,
  }
  render() {
    return (
      <ImageBackground
        style={styles.backGround}
        source={require('./images/bg.png')}>
          <Weather /> 
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  backGround: {
    height: windowH,
    width: windowW,
    position: 'absolute'
  }
})

export default Paa;