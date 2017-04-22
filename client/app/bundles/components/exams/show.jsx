import axios from 'axios';
import CountDownBox from './templates/count_down_box';
import css from './assets/exam.scss';
import Update from './actions/update';
import ExamPolicy from 'policy/exam_policy';
import Questions from '../questions/questions';
import React from 'react';
import * as app_constants from 'constants/app_constants';

export default class ExamShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: false,
      exam: props.exam,
      questions: props.exam.questions,
      user_show: props.exam.user_show
    }
  }

  componentDidMount() {
    if (!this.state.exam.started_at) {
      let exam_url = app_constants.APP_NAME + app_constants.EXAMS_PATH + '/' +
        this.state.exam.id + '.json';
      let started_at = new Date();
      axios.patch(exam_url, {
        started_at: started_at,
        authenticity_token: ReactOnRails.authenticityToken()
      })
      .then(response => {
        Object.assign(this.state.exam, response.data.exam);
        this.setState({
          exam: this.state.exam
        });
      })
      .catch(error => console.log(error));
    }
  }

  render() {
    let buttonUpdate = null;
    if (!this.state.user_show) {
      buttonUpdate = (<Update exam={this.state.exam}
        submit={this.state.submit}
        examSubmited={this.examSubmited.bind(this)} />);
    }

    let time = 0;
    if (this.state.exam.questions.length > 0 &&
      this.state.exam.questions[0].results.answer_id == null) {
      let started_at = new Date(this.props.exam.started_at);
      let now = new Date();
      let duration = Math.floor(this.props.exam.duration * 60 -
        Math.abs(now - started_at) / 1000);
      if (duration > 0) {
        time = duration;
      }
    }

    return (
      <div className='list-question'>
        <CountDownBox time={time} submitExam={this.submitExam.bind(this)} />
        <ExamPolicy permit={[
          {controller: 'exams', action: ['show'], target: 'children'}]
        }>
          <div>
            <Questions questions={this.state.questions}
              exam={this.state.exam}
              afterChooseAnswer={this.afterChooseAnswer.bind(this)}
              user_show={this.state.user_show}
              afterClickFinishExam={this.afterClickFinishExam.bind(this)}
            />
            {buttonUpdate}
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

  submitExam() {
    this.setState({
      submit: true
    });
  }

  examSubmited() {
    this.setState({
      submit: false
    });
  }
}
