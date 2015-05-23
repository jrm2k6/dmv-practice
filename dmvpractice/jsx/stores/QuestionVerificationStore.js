var Reflux = require('reflux');
var QuestionnaireActions = require('../actions/QuestionnaireActions');

var QuestionVerificationStore = Reflux.createStore({
	init: function() {
		this.listenTo(QuestionnaireActions.verifyAnswer, this.handleVerifyAnswer);
	},

	handleVerifyAnswer: function(payload) {
		var correctAnswerIndex = payload.question.answers.map(function(elem, index) {
			elem.push(index);
			return elem;
		}).filter(function(elem) {
			return elem[1];
		})[0][2];

		this.trigger({isCorrect: (payload.indexAnswer === correctAnswerIndex), 
			correctAnswerIndex: correctAnswerIndex});
	}
});

module.exports = QuestionVerificationStore;