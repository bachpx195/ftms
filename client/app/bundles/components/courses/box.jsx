import axios from 'axios';
import React from 'react';

import CoursePolicy from 'policy/course_policy';

import Courses from './courses';
import IndexBreadCrumb from './templates/bread_crumbs/index';

import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

const COURSES_URL = routes.courses_url();

export default class CourseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses || []
    };
  }

  renderCourses(title, courses) {
    return (
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
            <Courses courses={courses} url={COURSES_URL}
              manager_courses={this.state.courses.manager_courses}
              member_courses={this.state.courses.member_courses} />
          </div>
        </div>
      </div>);
  }

  render() {
    const coursesPermit = [
      {controller: 'courses', action: ['index', 'ownerController'],
        target: 'courses', data: {controller: 'courses'}},
      {controller: 'my_space/courses', action: ['index', 'ownerController'],
        target: 'myCourses', data: {controller: 'my_space/courses'}}
    ];

    const CoursesIndex = () => {
      return (
        <div>
          {this.renderCourses(I18n.t("courses.titles.all"),
            this.state.courses)}
        </div>
      );
    }

    const MyCourses = () => {
      let courses = this.state.courses;
      return (
        <div>
          {this.renderCourses(I18n.t("courses.my_courses.title"),
            courses.manager_courses.concat(courses.member_courses))}
        </div>
      );
    }

    return (
      <div className="row">
        <IndexBreadCrumb />
        <div className="col-md-12">
          <CoursePolicy
            permit={coursesPermit} courses={<CoursesIndex />}
            myCourses={<MyCourses />} />
        </div>
      </div>
    );
  }
}
