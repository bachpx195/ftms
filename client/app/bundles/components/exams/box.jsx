import React from 'react';
import Exams from './exams';
import ExamPolicy from 'policy/exam_policy';

export default class ExamsBox extends React.Component {
  render() {
    return (
      <div className='row exams'>
        <div className='col-md-12'>
          <h3 className='box-title'>{I18n.t('exams.title')}</h3>
          <ExamPolicy permit={[
            {controller: 'exams', action: ['index'], target: 'children'},
            {controller: 'my_space/exams', action: ['index'],
              target: 'children'}
          ]}>
            <Exams exams={this.props.exams}
              organization={this.props.organization} />
          </ExamPolicy>
        </div>
      </div>
    );
  }
}
