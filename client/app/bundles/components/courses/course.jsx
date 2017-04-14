import React from 'react';

import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/constants/program_constants';

import CourseManagers from './templates/course_managers';
import BlockMembers from "./templates/block_members";
import ModalManagers from "./templates/modal_managers";

import CSS from './assets/course-block.scss';

const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;
const DEFAULT_IMAGE_USER = app_constants.DEFAULT_IMAGE_USER_URL;

export default class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      managers: props.managers,
      url: props.url,
    }
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
                <BlockMembers course={course} />
              </div>
            </div>
          </a>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        <div className="td-course-box-before"></div>
        <div className="td-course-box-after"></div>
        <ModalManagers course={course} managers={this.state.managers} />
      </div>
    );
  }
}
