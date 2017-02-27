import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './training_standard_constants';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + training_standard_constants.ADMIN_TRAINING_STANDARD_PATH;

export default class TrainingStandardCreateForm extends React.Component {
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
          <input type='text' placeholder={I18n.t('training_standard.headers.name')}
            value={this.state.name} className='form-control' name='name'
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          <div className='pull-right'>
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t('buttons.save')}</button>
          </div>
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

  formValid() {
    return this.state.name != '';
  }

  handleCreate(event) {
    event.preventDefault();
    axios.post(TRAINING_STANDARD_URL, {
      training_standard: {
        name: this.state.name
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        name: '',
        errors: null
      });
      this.props.afterCreate(response.data.training_standard);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
