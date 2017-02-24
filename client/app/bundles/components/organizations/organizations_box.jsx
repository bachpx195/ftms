import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import OrganizationLists from './organization_lists';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ADMIN_ORGANIZATION_PATH;

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organization: null,
      organizations: []
    };
  }

  componentWillMount() {
    this.fetchOrganizations();
  }

  render () {
    return (
      <div className='row organizations'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('organizations.titles.all')}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                  <CreateForm afterCreate={this.afterCreate.bind(this)}
                    organization={this.state.organization}
                    handleCancelClick={this.handleCancelClick.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <OrganizationLists
                organizations={this.state.organizations}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)}
                handleNewSubOrganization={this.handleNewSubOrganization.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(organization) {
    this.state.organizations.push(organization);
    this.setState({organizations: this.state.organizations, organization: null});
  }

  afterUpdate(old_organization, new_organization) {
    let found_item = _.findIndex(this.state.organizations,
      organization => organization.id === old_organization.id);
    this.state.organizations[found_item] = new_organization;
    this.setState({organizations: this.state.organizations});
  }

  afterDelete(organizations) {
    this.setState({organizations: organizations});
  }

  handleNewSubOrganization(organization) {
    this.setState({organization: organization});
    $('#organization_name').focus();
  }

  handleCancelClick() {
    this.setState({organization: null});
    $('#organization_name').focus();
  }

  fetchOrganizations() {
    axios.get(ORGANIZATION_URL + '.json')
      .then(response => this.setState({organizations: response.data.organizations}))
      .catch(response => console.log(response));
  }
}
