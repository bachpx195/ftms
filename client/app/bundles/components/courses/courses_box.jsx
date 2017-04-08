import React from 'react';
import axios from 'axios';
import TraineeCourse from './trainee/trainee_course_lists';
import CoursesIndex from './courses_index';
import CoursePolicy from 'policy/course_policy';
import * as app_constants from 'constants/app_constants';
import * as course_constants from './course_constants';

const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;

export default class CourseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses || []
    };
  }

  render() {
    const courseListPermit = [
      {controller: 'courses', action: ['index', 'ownerController'],
        target: 'courseList', data: {controller: 'courses'}},
      {controller: 'my_space/courses', action: ['index', 'ownerController'],
        target: 'traineeCourse', data: {controller: 'my_space/courses'}}
    ];

    return (
      <div className="row">
        <div className="col-md-12">
          <CoursePolicy
            permit={courseListPermit}
            courseList={<CoursesIndex courses={this.state.courses}/>}
            traineeCourse={<TraineeCourse courses={this.state.courses} />} />
        </div>
      </div>
    );
  }
}
