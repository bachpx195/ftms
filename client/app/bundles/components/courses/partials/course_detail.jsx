import React from 'react';
import Dropzone from 'react-dropzone';
import MenuCourse from '../menu_course';
import * as app_constants from 'constants/app_constants';
import * as program_constants from '../../programs/program_constants';
import * as course_constants from '../constants/course_constants';
import * as user_constants from '../../users/user_constants';

const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = course_constants.LIMIT_DESCRIPTION;
const COURSE_URL = app_constants.APP_NAME + program_constants.COURSES_PATH;

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    }
  }

  render() {
    let course = this.state.course;
    let link_creator = null;
    let creator_name = '';
    if (course.creator) {
      let creator_path = app_constants.APP_NAME + user_constants.USER_PATH +
        course.creator.id;
      creator_name = course.creator.name;
      link_creator = <a href={creator_path} title={course.creator.name}>
        <img className='creator-image' src={course.creator.avatar.url} />
      </a>;
    }
    let description = this.state.course.description;
    if (description && description.length > LIMIT_DESCRIPTION) {
      description =
        this.state.course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }

    return (
      <div className='course-subject row'>
        <div className='col-md-7 image-course-header'>
          <div className='subject-image img-resposive'>
            <img className='img-circle'
              src={this.state.course.image.url ?
                this.state.course.image.url :
                DEFAULT_IMAGE_COURSE}/>
          </div>
          <div className='course-header'>
            <span className='header-title'>
              {this.state.course.name}
            </span>
            <span className={'label-status' + ' ' +
              this.state.course.status + '-background-color'}>
              {I18n.t(`courses.${this.state.course.status}`)}
            </span>
            <div className='show-creator'>
              {link_creator}
              <h3 className='label box-title'>
                <b>{creator_name}</b>
              </h3>
            </div>
            <div className='description-course'
              title={this.state.course.description}>
              <i>
                {description ? description :
                  I18n.t('courses.default_description')}
              </i>
            </div>
          </div>
        </div>

        <div className='col-md-5'>
          <span className="btn glyphicon glyphicon-list pull-right"
            onClick={this.clickButtonList.bind(this)}></span>
          <MenuCourse url={COURSE_URL + this.state.course.id}
            course={this.state.course}
            courseListPermit={this.props.courseListPermit}
            handleAfterEdit={this.handleAfterUpdate.bind(this)}
            program={this.props.program}
            handleAfterChangeStatus={this.handleAfterChangeStatus.bind(this)} />
        </div>
      </div>
    )
  }

  clickButtonList() {
    this.props.clickButtonList();
  }

  handleAfterUpdate(new_course) {
    this.props.handleAfterUpdate(new_course);
  }

  handleAfterChangeStatus(new_course) {
    this.props.handleAfterChangeStatus(new_course);
  }
}
