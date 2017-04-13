import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as exam_constants from '../constants/exam_constants';
import ExamPolicy from 'policy/exam_policy';

export default class Show extends React.Component {
  render() {
    let url = app_constants.APP_NAME;
    if (this.props.organization) {
      url += exam_constants.ORGANIZATIONS_PATH +
        this.props.organization.id + '/';
    }
    url += exam_constants.EXAMS_PATH + this.props.exam.id;

    return(
      <ExamPolicy permit={[{action: ['show'], target: 'children'}]}>
        <a href={url} className='btn btn-success'>
          {I18n.t('buttons.view')}
        </a>
      </ExamPolicy>
    );
  }
}
