import React from  'react';
import CourseListsBox from '../../courses/course';
import * as app_constants from 'constants/app_constants';

const COURSES_URL = app_constants.APP_NAME + app_constants.COURSES_PATH;

export default class RenderListCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      program_detail: props.program_detail,
      selected_standard: props.selected_standard,
      program: props.program
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program_detail: nextProps.program_detail,
      selected_standard: nextProps.selected_standard,
      program: nextProps.program
    })
  }

  render() {
    return (
      <div className='course-container'>
        <div className='row td-padding-top course-list-padding-top'>
          {this.renderListCourses()}
        </div>
      </div>
    );
  }

  renderListCourses() {
    return _.map(this.state.program_detail.courses, course => {
      if (course.training_standard.id == this.state.selected_standard) {
        return this.renderCourses(course)
      }
      if(this.state.selected_standard == 0){
        return this.renderCourses(course)
      }
    });
  }

  renderCourses(course) {
    let url = COURSES_URL+ '/' + course.id;
    return (
      <CourseListsBox
        key={course.id}
        url={url}
        course={course}
        managers={course.course_managers} />
    );
  }

}
