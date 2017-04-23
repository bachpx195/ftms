import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const APP_NAME = app_constants.APP_NAME;
const ORGANIZATION_URL = APP_NAME + app_constants.ORGANIZATIONS_PATH;
const PROGRAMS_URL = app_constants.PROGRAMS_PATH;

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
                path: ORGANIZATION_URL + '/' + this.props.organization.id +
                  '/' + PROGRAMS_URL,
                label: I18n.t("breadcrumbs.programs"),
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id +
                  '/' + PROGRAMS_URL + '/' + this.props.program.id,
                label: this.props.program.name,
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
