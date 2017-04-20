import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from '../../constants/organization_constants';

const APP_NAME = app_constants.APP_NAME;
const INDEX_ORGANIZATION_URL = APP_NAME + organization_constants.ORGANIZATION_PATH;

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
                path: INDEX_ORGANIZATION_URL,
                label: I18n.t("breadcrumbs.organizations"),
              },
              {
                path: INDEX_ORGANIZATION_URL + this.props.organization.id,
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
