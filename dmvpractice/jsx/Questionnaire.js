'use strict';

var React = require('react-native');
var _wrapper = require('../QuestionsWrapper');

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
		this._questions = this.reFormatQuestions(_wrapper);	
		this.state = _wrapper;
	}

	reFormatQuestions(_wrapper) {
		var _questions = _wrapper.questions;
		for (var index in _questions) {
			var txtQuestion = _questions[index].question;
			var reformattedQuestion = txtQuestion.split(' ').slice(1).join(' ');
			_questions[index].question = reformattedQuestion;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.txt}>
					{this.state.questions["0"].question}
				</Text>
				<View>
					{this.state.questions["0"].answers.map((elem) => {
						return (
							<View>
								<Text>{elem[0]}</Text>	
							</View>
						);
					})}
				</View>
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