import React from 'react';

import Course from './course';
import CoursesStatistic from "./templates/courses_statistic";

export default class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: props.courses,
      url: props.url,
      courses_search: props.courses,
    }
  }

  renderCourses() {
    return _.map(this.state.courses, course => {
      if (course) {
        return (
          <Course key={course.id} url={`${this.state.url}/${course.id}`}
            course={course} managers={course.managers} />
        );
      }
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-9">
          <div className='course-scoll'>
            <div className='row'>
              <div className='row margin-select'>
                <div className='col-xs-5'>
                  <input className='form-control search_form'
                    id='filter-list-courses' autoComplete='off'
                    placeholder={I18n.t('courses.search')}
                    onChange={this.filterCourses.bind(this)}/>
                </div>
              </div>
           </div>
          </div>
          <div className='course-container'>
            <div className='row td-padding-top'>
              {this.renderCourses()}
            </div>
          </div>
        </div>
        <CoursesStatistic number={this.state.courses.length} />
      </div>
    );
  }

  filterCourses(event) {
    let value = event.target.value;
    this.state.courses = this.state.courses_search.filter(course => {
      return course.name.toLowerCase().includes(value.toLowerCase()) ||
        course.training_standard.name.toLowerCase().includes(value.toLowerCase()) ||
        course.description.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({courses: this.state.courses});
  }
}
