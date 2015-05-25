'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var QuestionnaireActions = require('./actions/QuestionnaireActions');
var QuestionVerificationStore = require('./stores/QuestionVerificationStore');
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
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        this.reFormatQuestions(_wrapper);
        var state = _wrapper;
        state['currentQuestionIndex'] = 0;
        state['currentQuestionSelectedAnswer'] = null;
        state['showNextButton'] = false;
        state['shouldHighlight'] = false;

        return state;

    },

    componentWillMount: function() {
        this.listenTo(QuestionVerificationStore, this.onVerifiedAnswer);
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
        var nextButton = this.shouldShowNextButton(this.state.showNextButton);
        return (
            <View style={styles.container}>
                <Text style={styles.questionText}>
                    {this.state.questions[''+this.state.currentQuestionIndex].question}
                </Text>
                <View style={styles.answersContainer}>
                    {this.state.questions[''+this.state.currentQuestionIndex].answers.map((elem, index) => {
                        var _style = this.getStyle(elem, index, this.state.shouldHighlight);
                        return (
                            <View key={index} style={[styles.answerRow, _style]}>
                                <SwitchIOS 
                                    style={styles.switchAnswer}
                                    onValueChange={this.onValueChange.bind(this, index)}
                                    value={this.state.currentQuestionSelectedAnswer === index}
                                />
                                <Text style={styles.answerText}>{elem[0]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View>
                    {{ nextButton }}
                    <TouchableHighlight onPress={this._verifyAnswer}>
                        <Text style={styles.confirmQuestionBtn}> Confirm </Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    },

    getStyle: function(elem, currentIndex, shouldHighlight) {
        var _style = [];
        if (shouldHighlight) {
            if (currentIndex === this.state.currentQuestionSelectedAnswer) {
                if (elem[1]) {
                    _style = [styles.correctAnswer];
                } else {
                    _style = [styles.wrongAnswer];
                }
            } else if (elem[1]) {
                _style = [styles.correctAnswer];
            }
        }

        return _style;
    },

    shouldShowNextButton: function(shouldShow) {
        if (shouldShow) {
            return (
                <View>
                    <TouchableHighlight
                        onPress= {() => {this.setState({currentQuestionIndex: this.state.currentQuestionIndex+1, showNextButton: false, shouldHighlight: false})}}>
                        <Text style={styles.confirmQuestionBtn}> Next </Text>
                    </TouchableHighlight>
                </View>
            );
        }
        return null;
    },

    onValueChange: function(indexClicked) {
        this.setState({currentQuestionSelectedAnswer: indexClicked});
    },

    _verifyAnswer: function() {
        var questionIndex = '' + this.state.currentQuestionIndex;
        var indexAnswer = this.state.currentQuestionSelectedAnswer;
        var payload = {question: this.state.questions[questionIndex], indexAnswer: indexAnswer};
        QuestionnaireActions.verifyAnswer(payload);
    },

    onVerifiedAnswer: function(storePayload) {
        if (storePayload.isCorrect) {
            this.setState({currentQuestionIndex: this.state.currentQuestionIndex+1, showNextButton: false, shouldHighlight: false});
        } else {
            this.setState({showNextButton: true, shouldHighlight: true})
        }
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
        flex: 0.85,
        fontSize: 16
    },

    switchAnswer: {
        marginLeft: 10,
        flex: 0.15
    },

    confirmQuestionBtn: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 4,
        borderRadius: 4,
        fontSize: 18
    },

    wrongAnswer: {
        backgroundColor: 'red'
    },

    correctAnswer: {
        backgroundColor: 'green'
    }
});

module.exports = Questionnaire;