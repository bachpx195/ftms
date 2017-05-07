import Course from './course';
import CoursesStatistic from "./templates/courses_statistic";
import CoursePolicy from 'policy/course_policy';
import React from 'react';

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
                <CoursePolicy permit={[{controller: 'my_space/courses',
                  action: ['index', 'ownerController'], target: 'children',
                  data: {controller: 'my_space/courses'}}]}>
                  <div className='col-xs-4'>
                    <select className="form-control"
                      onChange={this.handleSelectChange.bind(this)}>
                      <option key='0' value='all'>
                        {I18n.t('courses.my_courses.all')}
                      </option>
                      <option key='1' value='manager'>
                        {I18n.t('courses.courses_manager')}
                      </option>
                      <option key='2' value='member'>
                        {I18n.t('courses.courses_trainee')}
                      </option>
                    </select>
                  </div>
                </CoursePolicy>
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
        <CoursesStatistic number={this.props.courses.length}
          manager_courses={this.props.manager_courses}
          member_courses={this.props.member_courses} />
      </div>
    );
  }

  handleSelectChange(event) {
    let text = event.target.value;
    let courses = this.props.courses;
    if (text == 'manager') {
      courses = this.props.manager_courses;
    } else if (text == 'member') {
      courses = this.props.member_courses;
    }
    this.setState({
      courses: courses,
      courses_search: courses
    });
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
