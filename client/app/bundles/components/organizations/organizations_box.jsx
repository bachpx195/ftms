import React from 'react';
import axios from 'axios';

import OrganizationLists from './organization_lists';
import FormCreate from './form_create';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ADMIN_ORGANIZATION_PATH;

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      parent: null
    };
  }

  componentDidMount() {
    this.fetchOrganizations();
  }

  fetchOrganizations() {
    axios.get(ORGANIZATION_URL + '.json')
      .then(response => {
        this.setState({organizations: response.data.organizations});
      })
      .catch(error => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <div className="row" id="admin-organization">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("organizations.titles.all")}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className="box-body no-padding">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <FormCreate
                    url={ORGANIZATION_URL}
                    parent={this.state.parent}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <OrganizationLists
                organizations={this.state.organizations}
                handleAfterCreated={this.handleAfterCreated.bind(this)}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>

          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(organization) {
    this.state.organizations.push(organization);
    this.setState({
      organizations: this.state.organizations,
      parent: null
    });
  }

  handleAfterUpdated(new_organization) {
    for(let i = 0; i < this.state.organizations.length; i++){
      let parent = this.state.organizations[i].parent;
      if(parent && parent.id == new_organization.id) {
        this.state.organizations[i].parent = new_organization;
      }
    }
    let index = this.state.organizations
      .findIndex(organization => organization.id === new_organization.id);
    this.state.organizations[index] = new_organization;
    this.setState({
      organizations: this.state.organizations,
      parent: null
    });
  }

  handleAfterDeleted(organization) {
    this.removeChildren(organization);
    _.remove(this.state.organizations, _organization => {
      return _organization.id == organization.id;
    });
    this.setState({
      organizations: this.state.organizations,
      parent: null
    });
  }

  removeChildren(parent) {
    for(let organization of this.state.organizations) {
      if(organization.parent && organization.parent.id == parent.id) {
        this.removeChildren(organization);
      }
    };
    _.remove(this.state.organizations, organization => {
      return organization.parent && organization.parent.id == parent.id;
    });
  }
}
