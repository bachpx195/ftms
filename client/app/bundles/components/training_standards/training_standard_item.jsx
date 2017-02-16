import React from 'react'
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './training_standard_constants';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + training_standard_constants.ADMIN_TRAINING_STANDARD_PATH;


export default class TrainingStandardItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: [], isEditing: false};
  }

  render() {
    return(
      <tr>
        {this.renderTrainingStandardsSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }

  renderTrainingStandardsSection() {
    const {name, id} = this.props.training_standard;
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
        <a href={`${TRAINING_STANDARD_URL}/${id}`}>{name}</a>
      </td>
    );
  }

  getErrors(attribute) {
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

    axios.patch(TRAINING_STANDARD_URL + '/' + this.props.training_standard.id, {
      training_standard: {
        name: this.refs.nameField.value
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.props.afterUpdate(this.props.training_standard, response.data.training_standard);
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
      axios.delete(TRAINING_STANDARD_URL + '/' + this.props.training_standard.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => this.props.afterDelete(this.props.training_standard))
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }
}
