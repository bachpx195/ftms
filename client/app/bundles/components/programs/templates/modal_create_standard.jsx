import axios from 'axios';
import Form from '../templates/form';
import MultiStepForm from '../../training_standards/templates/multi_step_form';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as step_animations from 'shared/multi_step_animation';
import * as routes from 'config/routes';

const POLICIES = app_constants.POLICIES;

export default class ModalCreateStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard || {
        name: '', description: '', policy: ''
      }
    }
  }

  render() {
    let standard_name = '';
    let class_policy = <i className='fa fa-globe'></i>;
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
      <div className='modal-create-standards modal fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                onClick={this.handelDismissModal.bind(this)}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title'>
                {class_policy}&nbsp;
                {standard_name}
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
                  handleAfterSaved={this.handleAfterCreated.bind(this)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  handleAfterCreated(training_standard) {
    $('.modal-create-standards').modal('hide');
    this.props.handleAfterCreatedStandard(training_standard)
  }

  handelDismissModal(event) {
    step_animations.onDismissModal(event.target, '.modal-create-standards');
  }

  handleStandardChanged(training_standard) {
    this.setState({
      training_standard: training_standard,
    })
  }
}
