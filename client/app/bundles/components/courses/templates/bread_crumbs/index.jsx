import Breadcrumb from 'react-breadcrumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../../constants/course_constants';

const APP_NAME = app_constants.APP_NAME;
const COURSES = APP_NAME + course_constants.COURSES_PATH;

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
          separatorChar={' > '}
        />
      </div>
    );
  }
}
