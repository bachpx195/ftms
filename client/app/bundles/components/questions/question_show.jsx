import React from 'react';
import axios from 'axios';
import AnswerShow from './answer_show'

export default class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      question:  nextProps.question
    })
  }

  render() {
    let list_answers = this.state.question.answers.map((answer, index) => {
      return (
        <AnswerShow answer={answer} key={index} />
      )
    });
    let class_question = 'question' + this.props.question.id
    return (
      <div className={`block-question ${class_question}`}>
        <div className='block-content'>
          <div className='question show-question'>
            <div className='side-left'>
              <div className='number'>
                {this.props.index + 1}
              </div>
              <div className='delete-question'>
                <a onClick={this.afterClickDeleteQuestion.bind(this)}
                  data-index={this.props.question.id}>
                  <i className='fa fa-times'></i>
                </a>
              </div>
            </div>
            <div className='side-right'>
              <div className='form-group'>
                <div className='form-input-question question-content
                  col-xs-offset-2'>
                  {this.state.question.content}
                </div>
              </div>
              <div className='clearfix'></div>
              <div className='form-answers'>
                {list_answers}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterClickDeleteQuestion(event) {
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          question: {
            content: '',
            answers: []
          }
        });
        this.props.afterDeleteQuestion(this.props.question);
      })
      .catch(error => {
        console.log(error)
      });
    }
  }
}
