import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/program_constants';
import CourseManagers from '../programs/list_items/course_managers';
import CSS from '../../assets/sass/course-lists.scss';

const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;
const LIMIT_COURSE_MEMBERS = program_constants.LIMIT_COURSE_MEMBERS;
const DEFAULT_IMAGE_USER = app_constants.DEFAULT_IMAGE_USER_URL;

export default class CourseListsBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      managers: props.managers,
      url: props.url,
    }
  }

  renderCourseMember(member){
    return (
      <li key={member.id}>
        <img src={member.avatar.url}
          className='td-member-avatar img-circle' title={member.name}/>
      </li>
    );
  }

  renderCourseMembers(course){
    if(course.members) {
      if(course.members.length > LIMIT_COURSE_MEMBERS){
        let members = course.members.slice(0, LIMIT_COURSE_MEMBERS - 1);
        let html = members.map((member) => {
          return this.renderCourseMember(member);
        });

        html.push(<li className="member-list" key={course.members[LIMIT_COURSE_MEMBERS].id} >
          <img className="many-member" src={course.members[LIMIT_COURSE_MEMBERS].avatar.url} />
          <p className="many-member text-center">+{course.members.length - LIMIT_COURSE_MEMBERS}</p>
        </li>);
        return html;
      }else{
        let members = course.members.slice(0, LIMIT_COURSE_MEMBERS);
        return members.map((member) => {
          return this.renderCourseMember(member);
        });
      }
    }
  }

  renderModalManagers() {
    let managers = this.state.managers;
    return (
      <div className={`modal-manager-${this.state.course.id} modal fade
        td-modal-manager-profile`}
        key={this.state.course.id} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;</button>
              <h4 className="modal-title">{I18n.t('courses.list_managers')}</h4>
            </div>
            <div className="modal-body td-manager-profile-list">
              {this.renderManagerProfile(managers)}
              <div className="clearfix"></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default"
                data-dismiss="modal">{I18n.t('courses.close')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderManagerProfile(managers) {
    return managers.map((manager, index) => {
      let avatar = DEFAULT_IMAGE_USER;
      let name = '';
      let email = '';
      if (manager.user_avatar && manager.user_avatar != undefined) {
        avatar = manager.user_avatar;
        name = manager.user_name;
        email = manager.user_email;
      }
      if (manager.avatar && manager.avatar.url != undefined) {
        avatar = manager.avatar.url;
        name = manager.name;
        email = manager.email;
      }
      return ( <li key={index} className="col-xs-4 td-list-manager">
        <div className="width-100 td-manager-box">
          <img src={avatar} className='col-sm-4 img-circle width-80'/>
          <div className="col-sm-8">
            <p className="td-manager-name" title={name}>
              {name}</p>
            <p className="td-manager-email" title={email}>
              {email}</p>
          </div>
          <div className="clearfix"></div>
        </div>
      </li>);
    });
  }

  render() {
    let course = this.state.course;
    let course_path = this.state.url;
    let description = course.description;
    if (description && description.length > LIMIT_DESCRIPTION) {
      description = course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }
    return (
      <div key={course.id}
        className='col-md-4 col-xs-4 col-lg-4 td-program-list-course' >
        <div className="td-course-box">
          <div className="td-course-image-manager">
            <CourseManagers managers={this.state.managers}
              course={course}/>
            <div className="clearfix"></div>
          </div>
          <a href={course_path}>
            <div className='td-card-course-inner'>
              <h3 className="course-name">{course.name}</h3>
              <div className='td-course-content'>
                <div className='td-course-image col-xs-4'>
                  <img src={course.image.url ? course.image.url : DEFAULT_IMAGE_COURSE}
                    className='img-responsive' />
                </div>
                <div className='col-xs-8 td-course-content-left'>
                  <div className='training_standard'>
                    <p>{course.training_standard.name}</p>
                  </div>
                  <div className="td-course-description"
                    title={course.description}>
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
                <ul className='user-list clearfix'>
                  {this.renderCourseMembers(course)}
                </ul>
              </div>
            </div>
          </a>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        <div className="td-course-box-before"></div>
        <div className="td-course-box-after"></div>
        {this.renderModalManagers()}
      </div>
    );
  }
}
