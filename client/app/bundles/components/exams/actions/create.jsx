import * as app_constants from 'constants/app_constants';
import axios from 'axios'
import * as exam_constants from '../constants/exam_constants';
import ExamPolicy from 'policy/exam_policy';
import React from 'react';

export default class Create extends React.Component {
  render() {
    return(
      <ExamPolicy
        permit={[{controller: 'exams', action: ['update'], target: 'children'}]}>
        <div className='finish-exam'>
          <button className='btn btn-primary'
            onClick={this.afterClickFinishExam.bind(this)}>
            {I18n.t('exams.buttons.finish')}
          </button>
        </div>
      </ExamPolicy>
    );
  }

  afterClickFinishExam() {
    let EXAM_URL = app_constants.APP_NAME + exam_constants.EXAMS_PATH +
      this.props.exam.id;
    let formData = new FormData();
    formData.append('exam[id]', this.props.exam.id);
    this.props.exam.questions.map((question, question_index) => {
      formData.append('exam[results_attributes][' + question_index + '][id]',
        question.results.id);
      formData.append('exam[results_attributes][' + question_index + '][question_id]',
        question.id);
      if (question.results.answer_id) {
        formData.append('exam[results_attributes][' + question_index + '][answer_id]',
          question.results.answer_id);
      }
    });
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: EXAM_URL,
      method: 'PUT',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      alert('Submited');
    })
    .catch(error => console.log(error));
  }
}
