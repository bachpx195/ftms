import axios from 'axios';
import React from 'react';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer,
      question: props.question,
      user_show: props.user_show
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      answer: nextProps.answer,
      question: nextProps.question,
      user_show: nextProps.user_show
    })
  }

  render() {
    let check = 'check-disable';

    let choose;

    if (this.state.question.results && this.state.question.results.answer_id) {
      choose = this.state.question.results.answer_id == this.state.answer.id
    }
    if (this.state.answer.is_correct || choose) {
      check = (this.state.answer.is_correct || choose) ? 'check-enable' : 'check-disable';
    }

    let chooseAnswer = '';
    if (this.state.user_show) {
      chooseAnswer = (
        <div className={`check ${check} pointer`}>
          <i className='fa fa-check'></i>
        </div>
      );
    } else {
      chooseAnswer = (
        <a onClick={this.afterChooseAnswer.bind(this)}>
          <div className={`check ${check} choose-answer`}>
            <i className='fa fa-check'></i>
          </div>
        </a>
      );
    }

    return (
      <div className='list-answers'>
        <div className='tool-bar col-xs-4'>
          <ul className='list-action'>
            <li className='correct-answer'>
              {chooseAnswer}
            </li>
          </ul>
        </div>
        <div className='side-right col-xs-8'>
          <div className='form-group'>
            <div className='form-input-answer'>
              {this.state.answer.content}
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }

  afterChooseAnswer() {
    this.props.afterChooseAnswer(this.state.question.results.id,
      this.state.answer.id)
  }
}
