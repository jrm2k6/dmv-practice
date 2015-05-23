'use strict';

var React = require('react-native');
var Questionnaire = require('./Questionnaire');

var {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Component
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  startBtn : {
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
    borderRadius: 4,
    fontSize: 18
  }
});

var SplashScreen = React.createClass({
    render: function() {
        return (
            <TouchableHighlight style={styles.mainContainer}>
                <Text 
                    style={styles.startBtn}
                    onPress={this.handleStartButtonPressed}>
                    Start Practice Test
                </Text>
            </TouchableHighlight>
        );
    },

    handleStartButtonPressed: function() {
        this.props.navigator.push({
            title: 'Questionnaire',
            component: Questionnaire
        });
    }
});

module.exports = SplashScreen;