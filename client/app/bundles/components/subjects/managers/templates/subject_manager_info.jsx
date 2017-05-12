import * as routes from 'config/routes';
import ButtonChangeStatuses from '../../actions/user_subjects/change_statuses';
import React from 'react';
import Modal from '../../../projects/templates/modal';

export default class Subjects extends React.Component {
  constructor(props) {
    super(props);
    if (typeof props.subject_detail.course_subject == 'undefined') {
      this.state = {
        subject_detail: props.subject_detail
      }
    } else {
      this.state = {
        subject_detail: props.subject_detail,
        status: props.subject_detail.course_subject.status
      }
    }

  }

  render() {
    const DisplayButton = () => {
      if (typeof this.state.status == 'undefined') {
        return null;
      } else if (this.state.status != 'finished') {
        return (
          <div className='start-subject col-md-2'>
            <ButtonChangeStatuses
              course={this.props.course}
              object_type='CourseSubject'
              object_id={this.state.subject_detail.course_subject.id}
              course_subject={this.state.subject_detail.course_subject}
              status={this.state.status}
            />
          </div>
        );
      } else {
        return null;
      }
    }

    return (
      <div>
        <div className='col-md-2'>
          <img src={this.state.subject_detail.image.url}
            alt={I18n.t('subjects.alt_image')} className='image-subject' />
        </div>
        <div className='col-md-10'>
          <div className='subject-info col-md-9 col-md-offset-1'>
            <h2 className='subject-name'>
              {this.state.subject_detail.name}
            </h2>
            <div>
              {this.state.subject_detail.description}
            </div>
            <div className='workings-day'>
              {I18n.t('subjects.headers.workings_day')}
              {this.state.subject_detail.during_time}
              {I18n.t('subjects.headers.days')}
            </div>
            <div className='organization'>
              {I18n.t('subjects.headers.training_standard')}
              {this.state.subject_detail.training_standard.name}
            </div>
          </div>
          <DisplayButton />
        </div>
      </div>
    );
  }
}
