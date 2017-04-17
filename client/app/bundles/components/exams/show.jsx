import Create from './actions/create';
import ExamPolicy from 'policy/exam_policy';
import React from 'react';
import Questions from '../questions/questions';

export default class ExamShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exam: props.exam,
      questions: props.exam.questions,
      user_show: props.exam.user_show
    }
  }

  render() {
    let buttonCreate = '';
    if (!this.state.user_show) {
      buttonCreate = (
        <Create exam={this.state.exam} />
      )
    }

    return (
      <div className='list-question'>
        <ExamPolicy
          permit={[{controller: 'exams', action: ['show'], target: 'children'}]}>
          <div>
            <Questions questions={this.state.questions}
              exam={this.state.exam}
              afterChooseAnswer={this.afterChooseAnswer.bind(this)}
              user_show={this.state.user_show}
              afterClickFinishExam={this.afterClickFinishExam.bind(this)}
            />
            {buttonCreate}
          </div>
        </ExamPolicy>
      </div>
    )
  }

  afterChooseAnswer(questions) {
    this.setState({
      questions: questions
    })
  }

  afterClickFinishExam() {
    this.setState({
      user_show: true
    })
  }
}
