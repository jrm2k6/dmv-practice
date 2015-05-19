'use strict';

var React = require('react-native');
var _wrapper = require('../QuestionsWrapper');

var {
  TouchableHighlight,
  Text,
  View,
  Component,
  SwitchIOS,
  StyleSheet
} = React;

var Questionnaire = React.createClass({
	getInitialState: function() {
		this.reFormatQuestions(_wrapper);
		return _wrapper;
	},

	reFormatQuestions: function(_wrapper) {
		var _questions = _wrapper.questions;
		for (var index in _questions) {
			var txtQuestion = _questions[index].question;
			var reformattedQuestion = txtQuestion.split(' ').slice(1).join(' ');
			_questions[index].question = reformattedQuestion;
		}
	},

	render: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.questionText}>
					{this.state.questions["0"].question}
				</Text>
				<View style={styles.answersContainer}>
					{this.state.questions["0"].answers.map((elem, index) => {
						return (
							<View key={index} style={styles.answerRow}>
								<SwitchIOS />
								<Text style={styles.answerText}>{elem[0]}</Text>
							</View>
						);
					})}
				</View>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    	alignItems: 'center'
	},

	answersContainer: {
		height: 200,
		marginTop: 25,
		backgroundColor: '#CCCCCC',
		alignSelf: 'stretch',
	},

	questionText : {
		color: 'black',
		fontSize: 18
	},

	answerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
    	alignItems: 'center'
	},

	answerText: {
		marginLeft: 15,
		fontSize: 16
	}
});

module.exports = Questionnaire;