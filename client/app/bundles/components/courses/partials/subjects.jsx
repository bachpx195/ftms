import Time from 'react-time-format';
import React from 'react';
import * as routes from 'config/routes';

import CSS from '../assets/course-subject.scss';

export default class CourseSubjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects,
      course: props.course,
      current_user_subjects: props.current_user_subjects
    }
  }

  renderStatus(subject) {
    let user_subject = this.state.current_user_subjects
      .find(item => item.subject_id == subject.id);
    if (user_subject != null) {
      let status = user_subject.status;
      return (
        <div className='div-status'
          title={`${I18n.t('user_subjects.statuses.' + status)}`}>
          <em className={`status status-${status} cursor`}></em>
        </div>
      );
    }
    else return null;
  }

  renderStartDate(subject) {
    let user_subject = this.state.current_user_subjects
      .find(item => item.subject_id == subject.id);
    if (user_subject != null) {
      let start_date = user_subject.start_date;
      return (
        <span className='label label-info timeline-label start_date_label'>
          <Time value={start_date} format='DD-MM-YYYY' />
        </span>
      );
    }
    else return null;
  }

  renderStartDate(subject) {
    let user_subject = this.state.current_user_subjects
      .find(item => item.subject_id == subject.id);
    if (user_subject != null) {
      let start_date = user_subject.start_date;
      return (
        <span className='label label-info timeline-label start_date_label'>
          {this.renderFormatTime(start_date)}
        </span>
      );
    }
    else return null;
  }

  renderEndDate(subject) {
    let user_subject = this.state.current_user_subjects
      .find(item => item.subject_id == subject.id);
    if (user_subject != null) {
      let end_date = user_subject.end_date;
      return (
        <span className='label label-success timeline-label end_date_label'>
          {this.renderFormatTime(end_date)}
        </span>
      );
    }
    return null;
  }

  renderFormatTime(time) {
    if (time != null) {
      return (
        <Time value={time} format='DD-MM-YYYY' />
      );
    }
    return null;
  }

  renderTimeline(current_user) {
    let user_subject = this.state.current_user_subjects
      .find(item => item.user_id == current_user.id);
    let timeline_class = 'timeline timeline-inverse timeline-subject';
    let timeline_icon_class = 'timeline-end-icon fa fa-clock-o bg-gray';
    if (user_subject == null) {
      timeline_class = 'list-group';
      timeline_icon_class = '';
    };
    return (
      <ul className={`${timeline_class}`}>
        {this.renderSubjects()}
        <li>
          <i className={`${timeline_icon_class}`}></i>
        </li>
      </ul>
    );
  }

  renderSubjects() {
    return this.state.subjects.map((subject, index) => {
      let course_subject_path = routes.course_subject_url(
        this.props.course.id, subject.id);
      let subject_image = subject.image.url;
      return (
        <li key={subject.id}>
          {this.renderStartDate(subject)}
          <div className='timeline-body'>
            <div className='subject-timeline subject'>
              {this.renderStatus(subject)}
              <div className='subject-body row'>
                <a href={course_subject_path}>
                  <div className='col-xs-2 subject-image'>
                    <img className='img-circle' src={subject_image}
                      width='100' height='100' />
                  </div>
                  <div className='col-xs-10 infor'>
                    <div>
                      <span className='subject-name'>{subject.name}
                      </span>&nbsp;
                      <span>
                        <i>
                          {`${subject.during_time} ${I18n.t('courses.during_time')}`}
                        </i>
                      </span>&nbsp;&nbsp;
                    </div>
                    <div>
                      {subject.description}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {this.renderEndDate(subject)}
          <div className='clearfix'></div>
        </li>
      );
    });
  }

  render() {
    let current_user = JSON.parse(localStorage.current_user);
    return (
      <div className='tab-pane timeline-container active clearfix' id='timeline'>
        {this.renderTimeline(current_user)}
      </div>
    )
  }
}
