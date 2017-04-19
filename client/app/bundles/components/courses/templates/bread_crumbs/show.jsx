import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../../constants/course_constants';

const APP_NAME = app_constants.APP_NAME;
const COURSES_URL = APP_NAME + course_constants.COURSES_PATH;
const COURSES_PATH = '/' + course_constants.COURSES_PATH + '/';
const ORGANIZATION_URL = APP_NAME + course_constants.ORGANIZATION_PATH;
const ORGANIZATION_PATH = '/' + course_constants.ORGANIZATION_PATH + '/';
const PROGRAM_PATH = course_constants.PROGRAM_PATH;

export default class ShowBreadCrumd extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <Breadcrumb
          path={
            [
              {
                path: APP_NAME,
                label: I18n.t("breadcrumbs.home"),
              },
              {
                path: ORGANIZATION_URL,
                label: I18n.t("breadcrumbs.organizations"),
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id,
                label: this.props.organization.name,
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id + '/' +
                  PROGRAM_PATH,
                label: I18n.t("breadcrumbs.programs"),
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id + '/' +
                  PROGRAM_PATH + '/' + this.props.program.id,
                label: this.props.program.name,
              },
              {
                path: COURSES_URL,
                label: I18n.t("breadcrumbs.courses"),
              },
              {
                path: COURSES_URL + '/' + this.props.course.id,
                label: this.props.course.name,
              }
            ]
          }
          separatorChar={' > '}
          others={this.props.others}
        />
      </div>
    );
  }
}
