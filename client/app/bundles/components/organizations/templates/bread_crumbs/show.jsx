import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const APP_NAME = app_constants.APP_NAME;
const ORGANIZATIONS_URL = APP_NAME + app_constants.ORGANIZATIONS_PATH;

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
                path: ORGANIZATIONS_URL+ '/' + this.props.organization.id,
                label: this.props.organization.name,
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
