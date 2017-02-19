import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ADMIN_ORGANIZATION_PATH;

export default class OrganizationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isEditing: false
    };
  }

  renderOrganizationsSection() {
    const {name} = this.props.organization;
    let parent = this.props.organization.parent ? this.props.organization.parent : {};

    if (this.state.isEditing) {
      return (
        <tr>
          <td>
            <form onSubmit={this.onSaveClick.bind(this)}>
              <div className='form-group'>
                <input type='text' className='form-control'
                  defaultValue={name} ref='nameField' />
                <Errors errors={this.getErrors('name')} />
              </div>
            </form>
          </td>
          <td>
            <select name='parent_id' className='form-control' defaultValue={parent.id}
              ref='parentField'>
              <option key='' value=''></option>
              {
                this.props.organizations.map(function(organization){
                  return <option value={organization.id} key={organization.id}>
                    {organization.name}
                  </option>;
                })
              }
            </select>
            <Errors errors={this.getErrors('parent_id')} />
          </td>
          {this.renderActionsSection()}
        </tr>
      );
    }

    return(
      <tr>
        <td>
          {name}
        </td>
        <td>
          {parent.name}
        </td>
        {this.renderActionsSection()}
      </tr>
    );
  }

  getErrors(attribute){
    if(this.state.errors[attribute]){
      return {
        [attribute]: this.state.errors[attribute]
      }
    }
    return null;
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button className='btn btn-primary' onClick={this.onSaveClick.bind(this)}>
            {I18n.t('buttons.save')}
          </button>
          <button className='btn btn-default' onClick={this.onCancelClick.bind(this)}>
            {I18n.t('buttons.cancel')}
          </button>
        </td>
      );
    }

    return (
      <td>
        <button className='btn btn-primary'
          onClick={this.onNewSubOrganization.bind(this)}>
          {I18n.t('buttons.new_sub_organization')}
        </button>
        <button className='btn btn-success' onClick={this.onEditClick.bind(this)}>
          {I18n.t('buttons.edit')}
        </button>
        <button className='btn btn-danger' onClick={this.onDeleteClick.bind(this)}>
          {I18n.t('buttons.delete')}
        </button>
      </td>
    );
  }

  render() {
    return this.renderOrganizationsSection();
  }

  onNewSubOrganization() {
    this.props.handleNewSubOrganization(this.props.organization);
  }

  onEditClick() {
    this.setState({isEditing: true});
  }

  onCancelClick() {
    this.setState({
      errors: [],
      isEditing: false
    });
  }

  onSaveClick(event) {
    event.preventDefault();
    axios.patch(ORGANIZATION_URL + '/' + this.props.organization.id, {
      organization: {
        name: this.refs.nameField.value,
        parent_id: this.refs.parentField.value
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        isEditing: false,
        errors: []
      });
      this.props.afterUpdate(this.props.organization, response.data.organization);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  onDeleteClick(event) {
    event.preventDefault();

    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(ORGANIZATION_URL + '/' + this.props.organization.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => this.props.afterDelete(response.data.organizations))
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }
}
