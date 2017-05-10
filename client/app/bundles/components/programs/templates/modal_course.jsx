import AssignOwner from './multi_step_form_partials/form_assign_owner'
import FormCourse from './multi_step_form_partials/form_course';
import MultiStepForm from './multi_step_form.jsx';
import React from 'react';
require('../../../assets/sass/program_show.scss');

export default class ModalCourse extends React.Component {
  render() {
    return (
      <div className='modal-edit modal fade in' role='dialog'>
        <div className='modal-dialog modal-lg clearfix'>
          <div className='modal-content'>
            <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'
              aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title'>
                {I18n.t('programs.modals.create_course')}
              </h4>
            </div>
            <form className='multi-step-form row'>
              <div className='modal-body'>
                <ul className='multi-step-progress-bar'>
                  <li className='active highlighted'>
                    {I18n.t('programs.multi_step_form.course_info')}
                  </li>
                  <li>
                    {I18n.t('programs.multi_step_form.select_training_standard')}
                  </li>
                  <li>
                    {I18n.t('programs.multi_step_form.assign_owner')}
                  </li>
                </ul>
              </div>
              <div className='modal-footer'>
                <MultiStepForm
                  handleAfterClickCreateCourse={this.props.handleAfterClickCreateCourse}
                  program_detail={this.props.program_detail}
                  program={this.props.program}
                  all_roles={this.props.all_roles}
                  owners={this.props.owners} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
