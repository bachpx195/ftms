import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ADMIN_ORGANIZATION_PATH;

export default class OrganizationCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          {this.renderParent()}
          <input id='organization_name' type='text' placeholder={I18n.t('organizations.headers.name')}
            value={this.state.name} className='form-control' name='name'
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          {this.renderButton()}
        </div>
      </form>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid(){
    return this.state.name != '';
  }

  handleCreate(event) {
    event.preventDefault();
    let parent_id = event.target.parent_id ? event.target.parent_id.value : ''
    axios.post(ORGANIZATION_URL, {
      organization: {
        name: this.state.name,
        parent_id: parent_id
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        name: '',
        errors: null
      });
      this.props.afterCreate(response.data.organization);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  renderParent() {
    if (this.props.organization) {
      return (
        <div className='parent-organization'>
          <label>{I18n.t('organizations.parent_name')}: </label>
          <i>{this.props.organization.name}</i>
          <input type='hidden' value={this.props.organization.id} name='parent_id' />
        </div>
      );
    }

    return '';
  }

  renderButton() {
    if (this.props.organization) {
      return (
        <div className='pull-right'>
          <button type='button' className='btn btn-default'
            onClick={this.onCancelClick.bind(this)}>
            {I18n.t('buttons.cancel')}
          </button>
          <button type='submit' className='btn btn-primary'
            disabled={!this.formValid()}>{I18n.t('buttons.save')}</button>
        </div>
      );
    }
    return (
      <div className='pull-right'>
        <button type='submit' className='btn btn-primary'
          disabled={!this.formValid()}>{I18n.t('buttons.save')}</button>
      </div>
    );
  }

  onCancelClick() {
    this.setState({name: ''});
    this.props.handleCancelClick();
  }
}
