import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import CourseList from '../course_lists';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../course_constants';

const MY_COURSES = app_constants.APP_NAME + course_constants.MY_SPACE_PATH +
  course_constants.MY_COURSES_PATH;

export default class TraineeCourseLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses,
    }
  }

  renderCourseLists(text, courses) {
    let html = null;
    if (courses.length > 0) {
      html = (
        <div className="box box-success">
          <div className="box-header with-border">
            <h3 className="box-title">{text}</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool"
                data-widget="collapse">
                <i className="fa fa-minus"></i>
              </button>
              <button type="button" className="btn btn-box-tool"
                data-widget="remove">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="box-body no-padding">
            <div className="row">
              <CourseList courses={courses} url={MY_COURSES} />
            </div>
          </div>
        </div>);
    }
    return html;
  }

  render() {
    return (
      <div>
        {this.renderCourseLists(I18n.t("courses.courses_manager"),
          this.state.courses.manager_courses)}
        {this.renderCourseLists(I18n.t("courses.courses_trainee"),
          this.state.courses.member_courses)}
      </div>
    );
  }
}

