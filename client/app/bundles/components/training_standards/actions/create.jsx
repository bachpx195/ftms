import axios from 'axios';
import MultiStepForm from '../templates/multi_step_form';
import React from 'react';
import TrainingStandardPolicy from 'policy/training_standard_policy';

import * as routes from 'config/routes';

export default class Create extends React.Component {

  renderModalCreate() {
    return (
      <div className='modalCreateTrainingStandard modal fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>
                {I18n.t('training_standards.modals.create')}
              </h4>
            </div>
            <form className='multi-step-form row'>
              <div className='modal-body'>
                <ul className='multi-step-progress-bar'>
                  <li className='active highlighted'>
                    {I18n.t('training_standards.multi_step_form.standard_info')}
                  </li>
                  <li>
                    {I18n.t('training_standards.multi_step_form.assign_subject')}
                  </li>
                  <li>
                    {I18n.t('training_standards.multi_step_form.create_evaluation_template')}
                  </li>
                </ul>
              </div>
              <div className='modal-footer'>
                <MultiStepForm
                  url={routes.organization_training_standards_url(
                    this.props.organization.id)}
                  subjects={this.props.subjects}
                  organization={this.props.organization}
                  handleAfterSaved={this.handleAfterCreated.bind(this)} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='row'>
        <TrainingStandardPolicy permit={[
          {action: ['ownerById'], data: {id: this.props.organization.user_id}},
          {action: ['create', 'belongById'], data: {id: this.props.organization.id}}
        ]}>
          <button type='button' className='btn btn-info create-subject'
            onClick={this.handleCreateTrainingStandard.bind(this)}>
            <i className='fa fa-plus'></i> {I18n.t('training_standards.create')}
          </button>
        </TrainingStandardPolicy>
        {this.renderModalCreate()}
      </div>
    );
  }

  handleCreateTrainingStandard() {
    $('.modalCreateTrainingStandard').modal({
        backdrop: 'static',
    });
  }

  handleAfterCreated(training_standard) {
    $('.modalCreateTrainingStandard').modal('hide');
    this.props.handleAfterCreated(training_standard);
  }
}
