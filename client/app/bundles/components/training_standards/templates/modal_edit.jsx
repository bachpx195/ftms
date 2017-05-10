import MultiStepForm from './multi_step_form';
import React from 'react';
import * as routes from 'config/routes';
import * as step_animations from 'shared/multi_step_animation';

export default class ModalEdit extends React.Component {

  render() {
    let class_policy = '';
    if (this.props.training_standard) {
      class_policy = <i className='fa fa-globe'></i>;
      if (this.props.training_standard.policy == 'privated') {
        class_policy = <i className='fa fa-lock'></i>;
      }
    }

    return (
      <div className='modal modal-edit fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                onClick={this.handelDismissModal.bind(this)}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title'>
                {class_policy}&nbsp;{this.props.training_standard.name || ''}
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
                  evaluation_template={this.props.evaluation_template}
                  training_standard={this.props.training_standard}
                  remain_subjects={this.props.remain_subjects}
                  selected_subjects={this.props.selected_subjects}
                  standard_subjects={this.props.standard_subjects}
                  organization={this.props.organization}
                  handleAfterEdit={this.handleAfterUpdate.bind(this)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdate(training_standard) {
    $('.modal-edit').modal('hide');
    this.props.handleAfterUpdate(training_standard);
  }

  handelDismissModal(event) {
    step_animations.onDismissModal(event.target, '.modal-edit');
  }
}
