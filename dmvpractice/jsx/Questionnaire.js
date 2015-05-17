'use strict';

var React = require('react-native');
var _questions = require('../QuestionsWrapper');

var {
  TouchableHighlight,
  Text,
  View,
  Component,
  StyleSheet
} = React;

class Questionnaire extends Component {
	constructor(props) {
		super(props);	
		this.state = _questions;
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.txt}>
					{this.state.questions["0"].question}
				</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    	alignItems: 'center'
	},

	txt : {
		color: 'black'
	}
});

module.exports = Questionnaire;