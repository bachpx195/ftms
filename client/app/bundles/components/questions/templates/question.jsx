import Answer from './answer'
import axios from 'axios';
import Destroy from '../actions/destroy'
import QuestionPolicy from 'policy/question_policy';
import React from 'react';
import ToolBar from './tool_bar';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      question: nextProps.question
    })
  }

  render() {
    let list_answers = this.state.question.answers.map((answer, index) => {
      return (
        <Answer answer={answer} key={index} question={this.state.question} />
      )
    });

    let tool_bar = '';
    if(!this.props.exam) {
      tool_bar = (
        <div className='tool-bar'>
          <ToolBar url={this.props.url}
            afterDeleteQuestion={this.afterDeleteQuestion.bind(this)}
            afterClickEditQuestion={this.afterClickEditQuestion.bind(this)}
            question={this.state.question}
          />
        </div>
      )
    }

    return (
      <div className='block-question'>
        <div className='block-content'>
          <div className='question show-question'>
            <div className='side-left'>
              <div className='number'>
                {this.props.index + 1}
              </div>
              {tool_bar}
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

  afterClickEditQuestion() {
    this.props.afterClickEditQuestion(this.state.question);
  }

  afterDeleteQuestion(event) {
    this.setState({
      question: {
        content: '',
        answers: []
      }
    });
    this.props.afterDeleteQuestion(this.props.question);
  }
}
