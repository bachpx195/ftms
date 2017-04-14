import React from 'react';
import Exams from './exams';
import ExamPolicy from 'policy/exam_policy';

export default class ExamsBox extends React.Component {
  render() {
    return (
      <div className='row exams'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('exams.title')}</h3>

              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>

            <div className='box-footer'>
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
        </div>
      </div>
    );
  }
}
