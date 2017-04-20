import * as app_constants from 'constants/app_constants';
import * as category_constants from '../../categories/constants/category_constants';
import axios from 'axios';
import Create from '../actions/create';
import css from '../assets/question.scss';
import Errors from '../../shareds/errors';
import FormAnswer from './form_answer';
import React from 'react';
import Update from '../actions/update';

export default class FormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question
    }
  }

  componentWillMount() {
    if(this.props.category) {
      this.state.question.answers.push({content: '', is_correct: false});
      this.setState({question: this.state.question});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      question: nextProps.question
    });
  }

  render() {
    let formAnswer = this.state.question.answers.map((answer, index) => {
      return <FormAnswer key={index} answer={answer} index={index}
        afterChangeAnswerForm={this.afterChangeAnswerForm.bind(this)}
        afterClickRemoveAnswer={this.afterClickRemoveAnswer.bind(this)}
        afterClickCorrectAnswer={this.afterClickCorrectAnswer.bind(this)}
      />
    });

    let actions;
    if(this.props.category) {
      actions = (
        <Create question={this.state.question}
          url={this.props.url}
          afterCreateQuestion={this.afterCreateQuestion.bind(this)}
        />
      )
    } else {
      actions = (
        <Update question={this.state.question}
          url={this.props.url}
          afterUpdateQuestion={this.afterUpdateQuestion.bind(this)}
        />
      )
    }
    return (
      <div className='block-question'>
        <form className='create-question'>
          <Errors errors={this.state.errors} />
          <div className='block-content'>
            <div className='clearfix question'>
              <div className='side-right'>
                <div className='form-group'>
                  <div className='form-input-question'>
                    <input type='text'
                      placeholder={I18n.t('questions.buttons.input_question')}
                      value={this.state.question.content}
                      onChange={this.handleChange.bind(this)}
                      className='form-control' name='content' />
                  </div>
                </div>
                <div className='clearfix'></div>
                <div className='form-answers'>
                  {formAnswer}
                </div>
                <div className='add-answer clearfix pull-right'>
                  <button className='btn btn-info'
                    onClick={this.afterClickAddAnswer.bind(this)}>
                    <i className="fa fa-plus"></i>
                    &nbsp;{I18n.t('questions.buttons.add_answer')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            {actions}
          </div>
        </form>
      </div>
    )
  }

  afterClickAddAnswer(event){
    event.preventDefault();
    this.state.question.answers.push({content: '', is_correct: false});
    this.setState({question: this.state.question});
  }

  afterClickCorrectAnswer(index) {
    this.state.question.answers.map(answer => {
      answer.is_correct = false
    });
    this.state.question.answers[index].is_correct = true;
    this.setState({
      question: this.state.question
    });
  }

  afterClickRemoveAnswer(index) {
    _.remove(this.state.question.answers, answer => {
      return answer == this.state.question.answers[index]
    });

    this.setState({
      question: this.state.question
    });
  }

  afterChangeAnswerForm(answer, index){
    if (this.state.question.answers) {
      this.state.question.answers[index] = answer
    } else {
      this.state.question.answers.push(answer)
    }
    this.setState({
      question: this.state.question
    })
  }

  handleChange(event) {
    let $target = event.target;
    Object.assign(this.state.question, {content: $target.value})
    this.setState({
      question: this.state.question
    })
  }

  afterCreateQuestion(question) {
    this.setState({
      question: {
        content: '',
        answers: []
      }
    });
    this.props.afterCreateQuestion(question)
  }

  afterUpdateQuestion(question) {
    this.setState({
      question: {
        content: '',
        answers: []
      }
    });
    this.props.afterUpdateQuestion(question)
  }
}
