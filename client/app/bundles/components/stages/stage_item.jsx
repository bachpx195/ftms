import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Errors from '../shareds/errors';

import CreateForm from './create_form';
import StageLists from './stage_lists';

import * as app_constants from 'constants/app_constants';
import * as stage_constants from './stage_constants';

const STAGE_URL = app_constants.APP_NAME + stage_constants.ADMIN_STAGE_PATH;

export default class StageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isEditing: false
    };
  }

  renderStagesSection() {
    const {name} = this.props.stage;

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <div className='form-group'>
              <input type='text' className='form-control' name='name'
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
        {this.renderStagesSection()}
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

    axios.patch(STAGE_URL + '/' + this.props.stage.id, {
      stage: {
        name: this.refs.nameField.value
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.props.afterUpdate(this.props.stage, response.data.stage);
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
      axios.delete(STAGE_URL + '/' + this.props.stage.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => this.props.afterDelete(this.props.stage))
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }
}
