'use strict';

var React = require('react-native');
var Questionnaire = require('./jsx/Questionnaire');

var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Component
} = React;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={styles.container}>
        <Text style={styles.welcomeBtn} onPress={() => {}}>Start Practice Test</Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBtn : {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18
  }
});

AppRegistry.registerComponent('dmvpractice', () => Home);
