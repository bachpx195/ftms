import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const APP_NAME = app_constants.APP_NAME;
const COURSES_URL = APP_NAME + app_constants.COURSES_PATH;
const ORGANIZATIONS_URL = APP_NAME + app_constants.ORGANIZATIONS_PATH;
const PROGRAM_URL = app_constants.PROGRAMS_PATH;

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
                path: ORGANIZATIONS_URL,
                label: I18n.t("breadcrumbs.organizations"),
              },
              {
                path: ORGANIZATIONS_URL + '/' + this.props.organization.id,
                label: this.props.organization.name,
              },
              {
                path: ORGANIZATIONS_URL + '/' + this.props.organization.id + '/' 
                  + PROGRAM_URL,
                label: I18n.t("breadcrumbs.programs"),
              },
              {
                path: ORGANIZATIONS_URL + '/' + this.props.organization.id + '/'
                  + PROGRAM_URL + '/' + this.props.program.id,
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
