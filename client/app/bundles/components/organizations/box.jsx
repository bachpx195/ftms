import axios from 'axios';
import React from 'react';
import IndexBreadCrum from './templates/bread_crumbs/index';
import OrganizationPanelInfo from './templates/organization_panel_info';
import OrganizationLists from './organizations';

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
}
