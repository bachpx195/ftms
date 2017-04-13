import axios from 'axios';
import React from 'react';

import CoursePolicy from 'policy/course_policy';

import Courses from './courses';

import * as app_constants from 'constants/app_constants';
import * as course_constants from './constants/course_constants';

const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;
const MY_COURSES = app_constants.APP_NAME + course_constants.MY_SPACE_PATH +
  course_constants.MY_COURSES_PATH;

export default class CourseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses || []
    };
  }

  renderCourses(title, courses, url) {
    let html = null;
    if (courses.length > 0) {
      html = (
        <div className="box box-success">
          <div className="box-header with-border">
            <h3 className="box-title">{title}</h3>
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
              <Courses courses={courses} url={url} />
            </div>
          </div>
        </div>);
    }
    return html;
  }

  render() {
    const coursesPermit = [
      {controller: 'courses', action: ['index', 'ownerController'],
        target: 'courses', data: {controller: 'courses'}},
      {controller: 'my_space/courses', action: ['index', 'ownerController'],
        target: 'joinedCourse', data: {controller: 'my_space/courses'}}
    ];

    const CoursesIndex = () => {
      return (
        <div>
          {this.renderCourses(I18n.t("courses.titles.all"),
            this.state.courses, COURSES_URL)}
        </div>
      );
    }

    const JoinedCourse = () => {
      return (
        <div>
          {this.renderCourses(I18n.t("courses.courses_manager"),
            this.state.courses.manager_courses, MY_COURSES)}
          {this.renderCourses(I18n.t("courses.courses_trainee"),
            this.state.courses.member_courses, MY_COURSES)}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <CoursePolicy
            permit={coursesPermit} courses={<CoursesIndex />}
            joinedCourse={<JoinedCourse />} />
        </div>
      </div>
    );
  }
}
