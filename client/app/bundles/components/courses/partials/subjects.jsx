import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../constants/course_constants';
import * as subject_constants from '../../subjects/constants/subject_constants';

export default class CourseSubjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects,
      course: props.course
    }
  }

  renderSubjects() {
    return this.state.subjects.map((subject, index) => {
      let course_subject_path = app_constants.APP_NAME +
        course_constants.COURSES_PATH + this.props.course.id + '/' +
        subject_constants.SUBJECT_PATH + subject.id;
      let subject_image = subject.image.url;
      return (
        <tr key={index} className="item ui-sortable-handle">
          <td >
            <div className="subject row">
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
