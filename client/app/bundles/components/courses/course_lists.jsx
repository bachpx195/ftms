import React from 'react';
import CourseListsBox from './course_lists_box';

export default class CourseLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: props.courses,
      url: props.url,
      courses_search: props.courses,
    }
  }

  renderListCourses() {
    return _.map(this.state.courses, course => {
      if (course) {
        let course_path = this.state.url + '/' + course.id;
        return (
          <CourseListsBox key={course.id} url={course_path}
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
              {this.renderListCourses()}
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel td-padding-top-course-lists
          custom-info'>
          <div className="custom-info">
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>
                  <strong>{I18n.t('organizations.titles.info')}</strong>
                </h3>
              </div>
              <div className='box-body'>
                <div>
                  <div className='member-title'>
                    <i className='fa fa-book' aria-hidden='true'></i>
                    <strong>
                      {I18n.t('organizations.num_courses')}
                    </strong>
                    <span className='badge label-primary'>
                      {this.state.courses.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
