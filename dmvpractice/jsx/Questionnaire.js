'use strict';

var React = require('react-native');
var _questions = require('../QuestionsWrapper');

var {
  TouchableHighlight,
  Text,
  View,
  Component
} = React;

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: _questions
		};
	}

	render() {
		return (
			<Text>
				LOL
			</Text>
		)
	}
}

module.exports = Questionnaire;