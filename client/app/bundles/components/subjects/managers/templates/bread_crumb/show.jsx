import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import Breadcrumb from 'breadcrumb/bread_crumb';
import React from 'react';

const APP_NAME = app_constants.APP_NAME;

export default class ShowBreadCrumd extends React.Component {
  render() {
    let path = [];
    if(this.props.course) {
      path = [
        {
          path: APP_NAME,
          label: I18n.t('breadcrumbs.home'),
        },
        {
          path: routes.courses_url(),
          label: I18n.t('breadcrumbs.courses'),
        },
        {
          path: routes.course_url(this.props.course.id),
          label: this.props.course.name,
        },
        {
          path: routes.course_subject_url(
            this.props.course.id, this.props.subject.id),
          label: this.props.subject.name
        },
      ]
    } else {
      path = [
        {
        path: APP_NAME,
        label: I18n.t('breadcrumbs.home'),
        },
        {
          path: routes.subject_url(this.props.subject.id),
          label: this.props.subject.name
        },
      ]
    }

    return (
      <div className='col-md-12'>
        <Breadcrumb
          path={path}
          others={this.props.others}
        />
      </div>
    );
  }
}
