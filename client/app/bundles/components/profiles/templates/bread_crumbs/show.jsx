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
                path: routes.user_url(this.props.user.id),
                label: this.props.user.name,
              },
            ]
          }
          others={this.props.others}
        />
      </div>
    );
  }
}
