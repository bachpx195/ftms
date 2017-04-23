import React from 'react';
import * as routes from 'config/routes';

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
        <div className="div-status"
          title={`${I18n.t("user_subjects.statuses." + status)}`}>
          <em className={`status status-${status} cursor`}></em>
        </div>
      );
    }
    else return null;
  }

  renderSubjects() {
    return this.state.subjects.map((subject, index) => {
      let course_subject_path = routes.course_subject_url(
        this.props.course.id, subject.id);
      let subject_image = subject.image.url;
      return (
        <tr key={index} className="item ui-sortable-handle">
          <td>
            <div className="subject">
              {this.renderStatus(subject)}
              <div className="subject-body row">
                <a href={course_subject_path}>
                  <div className="col-xs-2 subject-image">
                    <img className="img-circle" src={subject_image}
                      width="100" height="100" />
                  </div>
                  <div className="col-xs-10 infor">
                    <div>
                      <span className="subject-name">{subject.name}
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
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='subject-list content row'>
        <table className="table" id="sortable">
          <tbody className="sortable-table">
            {this.renderSubjects()}
          </tbody>
        </table>
      </div>
    )
  }
}
