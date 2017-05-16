import Breadcrumb from 'shared/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

const APP_NAME = app_constants.APP_NAME;

export default class ShowBreadCrumb extends React.Component {
  render() {
    return (
      <div className='col-md-12'>
        <Breadcrumb
          path={
            [
              {
                path: APP_NAME,
                label: I18n.t('breadcrumbs.home'),
              },
              {
                path: routes.organizations_url(),
                label: I18n.t('breadcrumbs.organizations'),
              },
              {
                path: routes.organization_url(this.props.organization.id),
                label: this.props.organization.name,
              },
              {
                path: routes.organization_training_standards_url(this.props.organization.id),
                label: I18n.t('breadcrumbs.training_standards'),
              },
              {
                path: routes.organization_training_standard_url(this.props.organization.id,
                 this.props.training_standard.id),
                label: this.props.training_standard.name,
              }
            ]
          }
          separatorChar={' > '}
          others={this.props.other_training_standards}
        />
      </div>
    );
  }
}
