import CoursePolicy from 'policy/course_policy';
import React from 'react';
import Dropzone from 'react-dropzone';
import MenuCourse from '../menu_course';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    }
  }

  render() {
    let list_buttons = null;
    if (this.props.course.status != 'finished') {
      list_buttons = (
        <div>
          <span className='btn glyphicon glyphicon-list pull-right'
            onClick={this.clickButtonList.bind(this)}></span>
          <MenuCourse url={routes.course_url(this.state.course.id)}
            course={this.state.course}
            courseListPermit={this.props.courseListPermit}
            handleAfterEdit={this.handleAfterUpdate.bind(this)}
            program={this.props.program}
            handleAfterChangeStatus={this.handleAfterChangeStatus.bind(this)}
          />
        </div>
      );
    }
    let course = this.state.course;
    let link_creator = null;
    let creator_name = '';
    if (course.creator) {
      let creator_path = app_constants.APP_NAME + app_constants.USERS_PATH +
        '/' + course.creator.id;
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
            <span className='courses-detail-status'>
              <span className={'label-status status-' + this.state.course.status}>
                {I18n.t(`courses.${this.state.course.status}`)}
              </span>
              <span className='preview-course-btn'>
                <button className='btn btn-preview'
                  title={I18n.t('courses.title_preview')}
                  onClick={this.preview.bind(this)}>
                  <i className='fa fa-eye'></i>
                </button>
              </span>
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
          <CoursePolicy permit={this.props.courseListPermit}>
            {list_buttons}
          </CoursePolicy>
        </div>
      </div>
    )
  }

  clickButtonList() {
    if ($('.td-course-edit-delete').hasClass('hidden')) {
      $('.td-course-edit-delete').removeClass('hidden');
    } else {
      $('.td-course-edit-delete').addClass('hidden');
    }

    if ($('.td-course-edit-delete').find('.finish-button')) {
      $('.td-course-edit-delete').css('margin-left','0%');
    }
  }

  preview() {
    $('.modal-training-standard').modal();
  }

  handleAfterUpdate(new_course) {
    this.props.handleAfterUpdate(new_course);
  }

  handleAfterChangeStatus(new_course) {
    this.props.handleAfterChangeStatus(new_course);
  }
}
