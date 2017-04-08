import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as course_constants from './course_constants';
import * as program_constants from '../programs/program_constants';
import CSS from '../../assets/sass/course-lists.scss';

const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;

const LIMIT_MEMBERS = course_constants.LIMIT_COURSE_MEMBERS;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;

export default class CourseLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: props.courses,
      url: props.url,
      courses_search: props.courses,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.url,
      courses_search: nextProps.courses,
    })
  }

  renderCourseLists() {
    return this.state.courses.map(course =>{
      return this.renderCourse(course)}
    );
  }

  renderMember(member) {
    return (
      <li key={member.id}>
        <img className='img-circle' src={member.avatar.url}
          className='td-member-avatar' title={member.name}/>
      </li>
    );
  }

  renderCourse(course) {
    let course_managers = course.managers ? course.managers.slice(0, 5) : null;
    let images= null;
    if (course_managers) {
      images = course_managers.map(course_manager => {
        return <img key={course_manager.id} src={course_manager.avatar.url}
          className='td-course-manager-avatar' />;
      });
    }
    let description = course.description;
    if (description.length > LIMIT_DESCRIPTION) {
      description = course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }

    return(
      <div key={course.id}
        className='col-md-4 col-xs-4 col-lg-4 td-program-list-course'>
        <div className='td-course-box'>
          <div className='td-course-image-manager'>
            <div className='course-manager'>{images}</div>
            <div className='clearfix'></div>
          </div>
          <a className='link-course' href={this.state.url + '/' + course.id}>
            <div className='td-card-course-inner'>
              <h3 className='custom-course-name'>
                <div>{course.name}</div>
              </h3>
              <div className='td-course-content'>
                <div className='course-image col-xs-4'>
                  <img src={course.image.url ? course.image.url : DEFAULT_IMAGE_COURSE}
                    className='img-responsive' />
                </div>
                <div className='col-xs-8 td-course-content-left'>
                  <div className='training-standard'>
                    <p>
                      {course.training_standard ? course.training_standard.name : ''}
                    </p>
                  </div>
                  <div className='td-course-description' title={course.description}>
                    <p>
                      {description ? description : I18n.t('courses.default_description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className='view-members-course'>
                <div className='with-border'>
                  <span className='members-count'>
                    {I18n.t('courses.members')}
                  </span>
                  <span className='badge label-primary'>
                    {course.members ? course.members.length : '0'}
                  </span>
                </div>
              </div>
            </div>
          </a>
          <div className='clearfix'></div>
        </div>
        <div className='clearfix'></div>
        <div className='td-course-box-before'></div>
        <div className='td-course-box-after'></div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='row margin-select'>
          <div className='col-xs-5'>
            <input className='form-control search_form'
              id='filter-list-courses' autoComplete='off'
              placeholder={I18n.t('courses.search')}
              onChange={this.filterCourses.bind(this)}/>
          </div>
        </div>
        <div className='row td-padding-top-course-lists'>
          {this.renderCourseLists()}
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
