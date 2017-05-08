import Create from '../actions/create';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const OWNERABLE_COURSE_SUBJECT = app_constants.OWNERABLE_COURSE_SUBJECT;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject: props.subject_detail.course_subject,
    }
  }

  render() {
    let course_subject_id = '';
    let ownerable_type = '';
    if (this.state.course_subject) {
      course_subject_id = this.state.course_subject.id;
      ownerable_type = OWNERABLE_COURSE_SUBJECT;
    }
    return (
      <div className='create-assignments'>
        <div className='modal-create-assignment modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>
                  {I18n.t("subjects.trainee.create_assignments")}
                </h4>
              </div>
              <div className="modal-body">
                <Create url={this.props.url}
                  ownerable_id={course_subject_id}
                  ownerable_type={ownerable_type}
                  afterCreateTask={this.props.afterCreateTask}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
