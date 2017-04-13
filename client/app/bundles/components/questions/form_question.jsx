import React from 'react';
import axios from 'axios';
import FormAnswer from './form_answer';
import Errors from '../shareds/errors';
import css from './question.scss';
import * as app_constants from 'constants/app_constants';
import * as category_constants from '../categories/constants/category_constants';

export default class FormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question
    }
  }

  componentWillMount() {
    this.state.question.answers.push({content: null, is_correct: false});
    this.setState({question: this.state.question});
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

    return (
      <div className='block-question'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className='block-content'>
            <div className='clearfix question'>
              <div className='side-right'>
                <div className='form-group'>
                  <div className='form-input-question'>
                    <input type='text'
                      placeholder={I18n.t('questions.buttons.input_question')}
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
                    {I18n.t('questions.buttons.add_answer')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='text-right save-question'>
              <button type='submit' className='btn btn-primary'>
                {I18n.t('buttons.save')}</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  afterClickAddAnswer(event){
    event.preventDefault();
    this.state.question.answers.push({content: null, is_correct: false});
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

  handleSubmit(event) {
    event.preventDefault();
    let url = app_constants.APP_NAME + category_constants.CATEGORY_PATH +
      this.props.category.id;
    let formData = new FormData();
    formData.append('question[content]', this.state.question.content);
    this.state.question.answers.map((answer, answer_index) => {
      formData.append('question[answers_attributes][' + answer_index +
        '][content]', answer.content);
      formData.append('question[answers_attributes][' + answer_index +
        '][is_correct]', answer.is_correct);
    });
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: url + '/' + category_constants.QUESTION_PATH ,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.afterCreateQuestion(response.data.question);
    })
    .catch(error => this.setState({errors: error.response.data.message}));
  }
}
