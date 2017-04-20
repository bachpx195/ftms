import axios from 'axios';
import React from 'react';

export default class FormAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer
    }
  }

  render() {
    let check = this.state.answer.is_correct ? 'check-enable' : 'check-disable';
    return (
      <div className='list-answers'>
        <div className='tool-bar col-xs-4'>
          <ul className='list-action'>
            <li className='action-delete'>
              <div className='delete'>
                <a onClick={this.afterClickRemoveAnswer.bind(this)}
                  data-index={this.props.answer.id}>
                  <i className='fa fa-trash'></i>
                </a>
              </div>
            </li>
            <li className='correct-answer form-check'>
              <div className={`check ${check}`}>
                <a onClick={this.afterClickCorrectAnswer.bind(this)}>
                  <i className='fa fa-check'></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className='side-right col-xs-8'>
          <div className='form-group'>
            <div className='form-input-answer'>
              <input type='text'
                placeholder={I18n.t('questions.buttons.input_answer')}
                value={this.state.answer.content}
                onChange={this.handleChange.bind(this)}
                className='form-control' name='content' />
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }

  afterClickRemoveAnswer() {
    this.props.afterClickRemoveAnswer(this.props.index);
  }

  afterClickCorrectAnswer() {
    this.props.afterClickCorrectAnswer(this.props.index);
  }

  handleChange(event) {
    let $target = event.target;
    Object.assign(this.state.answer, {content: $target.value})
    this.setState({
      answer: this.state.answer
    })
    this.props.afterChangeAnswerForm(this.state.answer, this.props.index)
  }
}
