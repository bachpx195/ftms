import React from 'react';
import axios from 'axios';

import FormCreate from './form_create';
import OrganizationLists from './organization_lists';
import BoxTitle from './box_title';

import * as app_constants from 'constants/app_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations';
require('../sass/show_organization.scss');

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: {},
      programs: [],
      parent: null,
      user: this.props.user
    }
  }

  componentWillMount(){
    this.fetchOrganization()
  }
  fetchOrganization() {
    if(this.props.organization){
      const url = ORGANIZATION_URL + '/' + this.props.organization.id
      axios.get(url + '.json')
      .then(response => {
        this.setState({
          organization: response.data.organization,
          programs: response.data.programs
        })
      })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <BoxTitle organization={this.state.organization} 
                handleAfter={this.handleAfter.bind(this)}
                programs={this.state.programs}/>
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
              {this.renderBoxOrganization()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderBoxOrganization(){
    if(this.props.organization){
      return(
        <div className="box-organization">
          <div className="list-sub-organization">
            <OrganizationLists organization={this.state.organization}
              handleAfter={this.handleAfter.bind(this)}
              programs={this.state.programs}/>
          </div>
        </div>
      )
    }else{
      return(
        <div className="box-organization">
          <div className="form-create">
            <FormCreate parent={this.state.parent} url={ORGANIZATION_URL}
              user_id={this.props.user} />
          </div>
        </div>
      )
    }
  }

  handleAfter(organization, programs) {
    this.setState({
      organization: organization,
      programs: programs
    });
  }
}
