import React from 'react';
import axios from 'axios';
import TraineeCourse from './trainee/trainee_course_lists';
import CourseList from './course_lists';
import * as app_constants from 'constants/app_constants';
import * as course_constants from './course_constants';

const MY_SPACE_COURSES_URL = app_constants.APP_NAME + course_constants.MY_SPACE_COURSES_PATH;
const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;

export default class ProgramBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      courses: props.courses || [],
      user_courses: props.user_courses || []
    };
  }

  render() {
    let content = null;
    if (this.state.admin) {
      content = <CourseList
        courses={this.state.courses}
      />
    } else {
      content = <TraineeCourse
        courses={this.state.courses}
        user_courses={this.state.user_courses}
      />
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("courses.titles.all")}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="box-body no-padding">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
