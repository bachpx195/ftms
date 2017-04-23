import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const APP_NAME = app_constants.APP_NAME;
const COURSES = APP_NAME + app_constants.COURSES_PATH;

export default class IndexBreadCrumd extends React.Component {
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
                path: COURSES,
                label: I18n.t("breadcrumbs.courses"),
              }
            ]
          }
        />
      </div>
    );
  }
}
