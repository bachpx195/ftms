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

  componentWillMount() {
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
      <div className="row">
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
                    handleAfterSaved={this.handleAfterHandle.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <OrganizationLists
                organizations={this.state.organizations}
                handleAfterUpdated={this.handleAfterHandle.bind(this)}
                handleAfterDeleted={this.handleAfterHandle.bind(this)} />
            </div>

          </div>
        </div>
      </div>
    );
  }

  handleAfterHandle(organizations) {
    this.setState({
      organizations: organizations,
    });
  }
}
