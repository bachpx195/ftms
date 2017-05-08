import MultiStepForm from './multi_step_form';
import React from 'react';
import * as routes from 'config/routes';


export default class ModalEdit extends React.Component {

  render() {
    return (
      <div className='modal modal-edit fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>{I18n.t('training_standards.modals.header_edit')}
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
}
