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
				<Text style={styles.questionText}>
					{this.state.questions["0"].question}
				</Text>
				<View style={styles.answersContainer}>
					{this.state.questions["0"].answers.map((elem) => {
						return (
							<View style={styles.answerRow}>
								<SwitchIOS />
								<Text style={styles.answerText}>{elem[0]}</Text>
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