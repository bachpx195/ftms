import Breadcrumb from 'shared/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

const APP_NAME = app_constants.APP_NAME;

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
                path: routes.organizations_url(),
                label: I18n.t("breadcrumbs.organizations"),
              },
              {
                path: routes.organization_url(this.props.organization.id),
                label: this.props.organization.name,
              },
              {
                path: routes.organization_programs_url(
                  this.props.organization.id),
                label: I18n.t("breadcrumbs.programs"),
              },
              {
                path: routes.program_url(this.props.program.id),
                label: this.props.program.name,
              }
            ]
          }
          others={this.props.others}
        />
      </div>
    );
  }
}
