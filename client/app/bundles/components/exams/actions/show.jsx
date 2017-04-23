import React from 'react';
import * as routes from 'config/routes';
import ExamPolicy from 'policy/exam_policy';

export default class Show extends React.Component {
  render() {
    let url = '';
    if (this.props.organization) {
      url = routes.organization_exam_url(this.props.organization.id,
        this.props.exam.id);
    } else {
      url = routes.exam_url(this.props.exam.id);
    }

    return(
      <ExamPolicy
        permit={[{controller: 'exams', action: ['show'], target: 'children'}]}>
        <a href={url} className='btn btn-success'>
          {I18n.t('buttons.view')}
        </a>
      </ExamPolicy>
    );
  }
}
