import React from 'react';
import axios from 'axios';

import ManagerOrganizationLists from './manager/organization_lists';
import FormCreate from './organization_form/form_create';
import OrganizationPolicy from 'policy/organization_policy';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ORGANIZATION_PATH;

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      parent: null,
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
    let count_organizations = this.state.organizations.length;
    let count_programs = 0;
    let count_training_standards = 0;
    let count_courses = 0;

    for(let organization of this.state.organizations) {
      if(organization.programs){
        count_programs += organization.programs.length;
        for(let program of organization.programs){
          if(program.courses){
            count_courses += program.courses.length;
          }
          if(program.training_standards){
            count_training_standards += program.training_standards.length;
          }
        }
      }
    }
    formList = <ManagerOrganizationLists
      organizations={this.state.organizations}/>

    return (
      <div className='row' id='admin-organization'>
        <div className='col-md-9'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {I18n.t('organizations.titles.all')}
              </h3>
                <div className='box-tools pull-right'>
                  <OrganizationPolicy permit={[
                    {action: ['create'], target: 'children'}
                  ]}>
                    {this.state.status ? (
                      <button className='btn btn-new'
                        onClick={this.onClickButtonCreate.bind(this)}>
                        {I18n.t('buttons.cancel')}
                      </button>
                    ) : (
                      <button className='btn btn-new'
                        onClick={this.onClickButtonCreate.bind(this)}>
                        {I18n.t('organizations.create')}
                      </button>
                    )}
                  </OrganizationPolicy>
                  <button type='button' className='btn btn-box-tool'
                    data-widget='collapse'>
                    <i className='fa fa-minus'></i>
                  </button>
                  <button type='button' className='btn btn-box-tool'
                    data-widget='remove'>
                    <i className='fa fa-times'></i>
                  </button>
                </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row '>
                <div className='col-md-10 col-md-offset-1'>
                  <OrganizationPolicy
                    permit={[
                      {action: ['create'], target: 'children'},
                      {action: ['index'], target: 'children'},
                  ]}>
                    {this.state.status ?
                      <FormCreate
                        organizations={this.state.organizations}
                        url={ORGANIZATION_URL}
                        handleAfterSaved={this.handleAfterSaved.bind(this)}
                        /> : null}
                  </OrganizationPolicy>
                </div>
              </div>
            </div>
            <div className='box-footer'>
              {formList}
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel'>
          <div>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>
                  <strong>{I18n.t('organizations.titles.info')}</strong>
                </h3>
              </div>
              <div className='box-body'>
                <div>
                  <div className='member-title'>
                    <i className='fa fa-users' aria-hidden='true'></i>
                    <strong>
                      {I18n.t('organizations.num_organizations')}
                    </strong>
                    <span className='badge label-primary'>
                      {count_organizations}
                    </span>
                  </div>
                  <br />
                  <div className='member-title'>
                    <i className='fa fa-graduation-cap' aria-hidden='true'></i>
                    <strong>
                      {I18n.t('organizations.num_programs')}
                    </strong>
                    <span className='badge label-primary'>{count_programs}</span>
                  </div>
                  <br />
                  <div className='member-title'>
                    <i className='fa fa-certificate' aria-hidden='true'></i>
                    <strong>
                      {I18n.t('organizations.num_training_standards')}
                    </strong>
                    <span className='badge label-primary'>
                      {count_training_standards}
                    </span>
                  </div>
                  <br />
                  <div className='member-title'>
                    <i className='fa fa-book' aria-hidden='true'></i>
                    <strong>
                      {I18n.t('organizations.num_courses')}
                    </strong>
                    <span className='badge label-primary'>{count_courses}</span>
                  </div>
                </div>
              </div>
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
