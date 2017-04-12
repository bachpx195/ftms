import React from 'react';
import axios from 'axios';
import CourseList from './course_lists';
import * as app_constants from 'constants/app_constants';
import * as course_constants from './course_constants';

const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;

export default class CourseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses || [],
    };
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header">
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
          <div className="row">
            <CourseList courses={this.state.courses} url={COURSES_URL} />
          </div>
        </div>
      </div>
    );
  }
}
