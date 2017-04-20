import Breadcrumb from 'react-breadcrumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from '../../constants/organization_constants';

const APP_NAME = app_constants.APP_NAME;
const ORGANIZATION_URL = APP_NAME + organization_constants.ORGANIZATION_PATH;

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
                path: ORGANIZATION_URL,
                label: I18n.t("breadcrumbs.organizations"),
              }
            ]
          }
          separatorChar={' > '}
        />
      </div>
    );
  }
}
