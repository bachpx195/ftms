import React from 'react';
import Questions from '../questions/questions'
export default class ExamShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exam: props.exam,
      questions: props.exam.questions
    }
  }

  render() {
    return (
      <div className='list-question'>
        <Questions questions={this.state.questions}
          exam={this.state.exam}/>
      </div>
    )
  }
}
