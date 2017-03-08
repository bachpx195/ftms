import React from 'react';
import axios from 'axios';

import UserLists from './user_lists';
import CourseLists from './course_lists';
import SubjectLists from './subject_lists';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

require('../sass/program_show.scss');

const PROGRAM_URL = app_constants.APP_NAME + program_constants.PROGRAM_PATH;

export default class SupervisorProgramsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: {}
    };
  }

  componentDidMount() {
    this.fetchProgram();
  }

  fetchProgram() {
    const url = PROGRAM_URL + '/' + this.props.organization.id + '/programs/' +
      this.props.program.id;
    axios.get(url + '.json')
      .then(response => {
        this.setState({
          program_detail: response.data.program_detail,
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  renderListCourses () {
    return _.map(this.state.program_detail.courses, course => {
      let course_managers = course.course_managers.slice(0, 5);
      let images = course_managers.map((course_manager, index) => {
        return <img key={`${course.id}_${index}`}
          src={course_manager.user_avatar}
          className='td-course-manager-avatar' />;
      });

      return (
        <div key={course.id}
          className='col-md-4 col-xs-4 col-lg-4 td-program-list-course'>
          <div className="td-course-box">
            <div className="td-course-image-manager">
              {images}
              <div className="clearfix"></div>
            </div>
            <div className='td-card-course-inner'>
              <h3>
                {course.name}
              </h3>
              <div className='td-course-content'>
                <div className='td-course-image col-xs-4'>
                  <img src={course.image} className='img-responsive' />
                </div>
                <div className='col-xs-8'>
                  <div className="td-course-description">
                    <p>{course.description}</p>
                  </div>
                  <div className="td-course-subject-count">
                    <p>{course.subject_count}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="clearfix"></div>
          <div className="td-course-box-before"></div>
          <div className="td-course-box-after"></div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='row td-padding-top'>
        {this.renderListCourses()}
      </div>
    );
  }
}
