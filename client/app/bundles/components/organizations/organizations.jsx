import axios from 'axios';
import FormOrganization from './templates/organization_form';
import ManagerOrganizations from './templates/manager_organizations';
import OrganizationPolicy from 'policy/organization_policy';
import React from 'react';

import * as routes from 'config/routes';

export default class Organizations extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      status: false,
      organizations: props.organizations
    }
  }

  render(){
    let formList = <ManagerOrganizations
      organizations={this.state.organizations}/>

    return(
      <div className='box box-primary'>
        <div className='box-header with-border'>
          <h3 className='box-title'>
            {I18n.t('organizations.titles.all')}
          </h3>
          <div className='box-tools pull-right'>

            <OrganizationPolicy permit={[
              {action: ['create'], target: 'children'}
            ]}>
              {this.state.status ? (
                <button className='btn btn-primary'
                  onClick={this.onClickButtonCreate.bind(this)}>
                  <i className="fa fa-times"></i>
                  &nbsp;{I18n.t('buttons.cancel')}
                </button>
              ) : (
                <button className='btn btn-primary'
                  onClick={this.onClickButtonCreate.bind(this)}>
                  <i className="fa fa-plus"></i>
                  &nbsp;{I18n.t('organizations.create')}
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
                  <FormOrganization
                    url={routes.organizations_url()}
                  /> : null}
              </OrganizationPolicy>
            </div>
          </div>
        </div>
        <div className='box-footer'>
          {formList}
        </div>
      </div>
    );
  }

  onClickButtonCreate(e) {
    this.setState({
      status: !this.state.status
    })
  }
}
