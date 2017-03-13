import React from 'react';
import axios from 'axios';

import ManagerOrganizationLists from './manager/organization_lists';
import FormCreate from './organization_form/form_create';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ORGANIZATION_PATH;

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      parent: null,
      admin: true,
      status: false
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
    let formList = null;
    if (this.state.admin) { //Check tam neu la admin thi render ra Manager... else render ra trainee....
      formList = <ManagerOrganizationLists
        organizations={this.state.organizations}/>
    } else {
      null;
    }

    return (
      <div className="row" id="admin-organization">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("organizations.titles.all")}</h3>
              <div className="box-tools pull-right">
                {this.state.status ? (
                  <button className="btn btn-new"
                    onClick={this.onClickButtonCreate.bind(this)}>
                    {I18n.t("buttons.cancel")}
                  </button>
                 ) : (
                  <button className="btn btn-new"
                    onClick={this.onClickButtonCreate.bind(this)}>
                    {I18n.t("organizations.create")}
                  </button>
                 )}
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
              <div className="row ">
                <div className="col-md-10 col-md-offset-1">
                  {this.state.status ?
                    <FormCreate
                      organizations={this.state.organizations}
                      url={ORGANIZATION_URL}
                      handleAfterSaved={this.handleAfterSaved.bind(this)}
                      /> : ''}
                </div>
              </div>
            </div>
            <div className='box-footer'>
              {formList}
            </div>
          </div>
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

  onClickButtonCreate(e) {
    this.setState({
      status: !this.state.status
    })
  }
}
