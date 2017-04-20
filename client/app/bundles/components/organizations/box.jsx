import axios from 'axios';
import React from 'react';
import IndexBreadCrum from './templates/bread_crumbs/index';
import OrganizationPanelInfo from './templates/organization_panel_info';
import OrganizationLists from './organizations';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './constants/organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ORGANIZATION_PATH;

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: props.organizations
    };
  }

  render() {
    return (
      <div className='row' id='admin-organization'>
        <IndexBreadCrum />

        <div className='col-md-9'>
          <OrganizationLists
            organizations={this.state.organizations}
          />
        </div>
        <div className='col-md-3 info-panel'>
          <OrganizationPanelInfo
            organizations={this.state.organizations}
          />
        </div>
      </div>
    );
  }

  handleAfterSaved(organization) {
    this.state.organizations.push(organization);
    this.setState({
      organizations: this.state.organizations
    });
  }
}
