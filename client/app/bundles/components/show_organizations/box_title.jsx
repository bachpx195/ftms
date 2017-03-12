import React from 'react';
import axios from 'axios';

import FormEdit from './form_edit'
import * as app_constants from 'constants/app_constants';

const SUB_ORGANIZATION_URL = app_constants.APP_NAME + 'sub_organizations';
const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations/';

require('../sass/organization.scss');

export default class BoxTitle extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      organization: this.props.organization
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization
    });
  }

  render(){
    return(
      <div className="organization">
        <div className="name-organization">
          <h3>{this.state.organization.name}</h3>
        </div>
        <div className="function">
          <i className="fa fa-pencil" onClick={this.handleClickEdit.bind(this)}
            data-index={this.state.organization.id} data-name={this.state.organization.name}/>
        </div>
        {this.renderModal()}
      </div>
    )
  }

  renderModal(){
    return(
      <div id='modal' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('buttons.edit')}</h4>
            </div>
            <div className='modal-body'>
              <FormEdit url={SUB_ORGANIZATION_URL} index={this.state.organization.id} 
              name={this.state.organization.name} afterSave={this.fetchOrganizations.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickEdit(){
    $('#modal').modal();
  }

  fetchOrganizations(){
    const url = ORGANIZATION_URL + this.state.organization.id;
    axios.get(url + ".json")
      .then(response => {
        this.setState({organization: response.data.organization});
        this.props.handleAfter(this.state.organization);
      })
      .catch(error => {
        console.log(error)
      });
  }
}
