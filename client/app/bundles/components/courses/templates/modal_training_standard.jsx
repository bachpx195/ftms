import EvaluationStandards from './evaluation_standards';
import React from 'react';
import TrainingStandardSubjects from './training_standard_subjects';

import * as app_constants from 'constants/app_constants';

export default class ModalTrainingStandard extends React.Component {
  render() {
    return (
      <div className='modal-training-standard modal fade'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('courses.training_standard')}
              </h4>
            </div>
            <div className='modal-body td-manager-profile-list'>
              <TrainingStandardSubjects
                subjects={this.props.course.training_standard.subjects} />
              <EvaluationStandards
                evaluation_standards={this.props.course.evaluation_standards}/>
              <div className='clearfix'></div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default'
                data-dismiss='modal'>
                {I18n.t('courses.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
