import axios from 'axios';
import MultiStepForm from '../templates/multi_step_form';
import React from 'react';
import TrainingStandardPolicy from 'policy/training_standard_policy';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import * as step_animations from 'shared/multi_step_animation';

const POLICIES = app_constants.POLICIES;

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard || {
        name: '', description: '', policy: ''
      }
    }
  }

  renderModalCreate() {
    let standard_name, class_policy = '';
    if (this.state.training_standard) {
      if (this.state.training_standard.policy != '') {
        class_policy = <i className='fa fa-globe'></i>;
        if (this.state.training_standard.policy == 'privated') {
          class_policy = <i className='fa fa-lock'></i>;
        }
      }
      standard_name = this.state.training_standard.name || '';
    }

    return (
      <div className='modalCreateTrainingStandard modal fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                onClick={this.handelDismissModal.bind(this)}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title'>
                {class_policy}&nbsp;{standard_name}
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
                  handleStandardChanged={this.handleStandardChanged.bind(this)}
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

  handleStandardChanged(training_standard) {
    this.setState({
      training_standard: training_standard,
    })
  }

  handelDismissModal(event) {
    step_animations.onDismissModal(event.target, '.modalCreateTrainingStandard');
  }
}
