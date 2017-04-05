import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as course_constants from './course_constants';
import * as program_constants from '../programs/program_constants';
import CSS from '../../assets/sass/course-lists.scss';

const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;
const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;
const LIMIT_MEMBERS = course_constants.LIMIT_COURSE_MEMBERS;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;

export default class CourseLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parent: null,
      courses: props.courses,
      courses_search: [],
    }
  }

  componentDidMount() {
    axios.get(COURSES_URL + '.json')
      .then(response => {
        this.setState({
         courses: response.data.courses,
         courses_search: response.data.courses,
      });
    }).catch(error => console.log(error));
  }

  renderCourseLists(){
    return this.state.courses.map(course =>{
      return this.renderCourse(course)}
    );
  }

  renderMember(member){
    return (
      <li key={member.id}>
        <img className='img-circle' src={member.avatar.url}
          className='td-member-avatar' title={member.name}/>
      </li>
    );
  }

  renderMembers(course){
    if(course.members) {
      if(course.members.length > LIMIT_MEMBERS){
        let members = course.members.slice(0, LIMIT_MEMBERS - 1);
        let html = members.map(member => {
          return this.renderMember(member);
        });

        html.push(<li className='member-list' key={course.members[LIMIT_MEMBERS].id} >
          <img className='many-member' src={course.members[LIMIT_MEMBERS].avatar.url} />
          <p className='many-member text-center'>+{course.members.length - LIMIT_MEMBERS}</p>
        </li>);
        return html;
      }else{
        let members = course.members.slice(0, LIMIT_MEMBERS);
        return members.map(member => {
          return this.renderMember(member);
        });
      }
    }
  }

  renderCourse(course){
    let course_path = COURSE_URL + course.program_id +'/' +
      course_constants.COURSES_PATH + course.id;
    let course_managers = course.managers ? course.managers.slice(0, 5) : null;
    let images= null;
    if (course_managers) {
      images = course_managers.map(course_manager => {
        return <img key={course_manager.id} src={course_manager.avatar.url}
          className='td-course-manager-avatar' />;
      });
    }
    let description = course.description;
    if(description.length > LIMIT_DESCRIPTION){
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
          <a className='link-course' href={course_path}>
            <div className='td-card-course-inner'>
              <h3 className='custom-course-name'>
                <div>{course.name}</div>
              </h3>
              <div className='td-course-content'>
                <div className='td-course-image col-xs-4'>
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
              <div className='view-members'>
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
  filterCourses(event){
    let value = event.target.value;
    this.state.courses = this.state.courses_search.filter(course => {
      return course.name.toLowerCase().includes(value.toLowerCase()) ||
        course.training_standard.name.toLowerCase().includes(value.toLowerCase()) ||
        course.description.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({courses: this.state.courses});
  }
}
