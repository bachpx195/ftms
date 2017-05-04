import AssignOwner from './multi_step_form_partials/form_assign_owner'
import FormCourse from './multi_step_form_partials/form_course';
import Multistep from '../../shareds/multistep';
import React from 'react';
import SelectTraningStandard from './multi_step_form_partials/form_select_training_standard'

require('../../../assets/sass/program_show.scss');

export default class ModalCourse extends React.Component {
  render() {
    const steps = [
      {name: 'Select Training Standard',
        component: <SelectTraningStandard
        training_standards={this.props.training_standards}
        program_detail={this.props.program_detail} />},
      {name: 'Course info',
        component: <FormCourse program_detail={this.props.program_detail}
        program={this.props.program}
        course={this.props.course} />},
      {name: 'Assign Owner',
        component: <AssignOwner program_detail={this.props.program_detail}
        course={this.props.course}
        all_roles={this.props.all_roles}
        owners={this.props.owners} />}
    ];
    return (
      <div className='modal-edit modal fade in' role='dialog'>
        <div className='modal-dialog dialog-size dialog-course'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('courses.modals.header_edit')}
              </h4>
            </div>
            <div className='modal-body'>
              <div>
                <Multistep initialStep={1} steps={steps}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
