import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as university_constants from './university_constants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.ADMIN_UNIVERSITY_PATH;

export default class UniversityItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isEditing: false
    };
  }

  renderUniversitiesSection() {
    const {name} = this.props.university;

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <div className='form-group'>
              <input type='text' className='form-control'
                defaultValue={name} ref='nameField' />
              <Errors errors={this.getErrors('name')} />
            </div>
          </form>
        </td>
      );
    }

    return(
      <td>
        {name}
      </td>
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
    return (
      <tr>
        {this.renderUniversitiesSection()}
        {this.renderActionsSection()}
      </tr>
    );
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

    axios.patch(UNIVERSITY_URL + '/' + this.props.university.id, {
      university: {
        name: this.refs.nameField.value
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.props.afterUpdate(this.props.university, response.data.university);
      this.setState({
        isEditing: false,
        errors: []
      });
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  onDeleteClick(event) {
    event.preventDefault();

    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(UNIVERSITY_URL + '/' + this.props.university.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => this.props.afterDelete(this.props.university))
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }
}
