'use strict';

var React = require('react-native');
var SplashScreen = require('./jsx/SplashScreen');
var Questionnaire = require('./jsx/Questionnaire');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Component
} = React;


var styles = StyleSheet.create({
  container:{
    flex: 1
  },
});

class Home extends React.Component{
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'DMV Practice',
          component: Questionnaire 
        }} />
    );
  }
};


AppRegistry.registerComponent('dmvpractice', () => Home);
