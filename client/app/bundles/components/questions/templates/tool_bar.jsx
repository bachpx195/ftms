import Destroy from '../actions/destroy';
import React from 'react';
import QuestionPolicy from 'policy/question_policy';

export default class ToolBar extends React.Component {
  render() {
    return (
      <div className='tool-bar'>
        <div className='delete-question'>
          <QuestionPolicy
            permit={[{action: ['destroy'], target: 'children'}]} >
            <Destroy afterDeleteQuestion={this.props.afterDeleteQuestion.bind(this)}
            url={this.props.url} question={this.props.question} />
          </QuestionPolicy>
        </div>
        <div className='edit-question'>
          <QuestionPolicy permit={[
            {action: ['update'], target: 'children'}]} >
            <a onClick={this.props.afterClickEditQuestion.bind(this)}
              data-index={this.props.question.id}>
              <i className="fa fa-pencil"></i>
            </a>
          </QuestionPolicy>
        </div>
      </div>
    )
  }
}
