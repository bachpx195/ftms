import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.ADMIN_SUBJECT_PATH;

export default class SubjectCreateForm extends React.Component {
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
          <input type='text' placeholder={I18n.t('subjects.headers.name')}
            value={this.state.name} className='form-control' name="name"
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

  formValid(){
    return this.state.name != '';
  }

  handleCreate(event) {
    event.preventDefault();
    axios.post(SUBJECT_URL, {
      subject: {
        name: this.state.name
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        name: '',
        errors: null
      });
      this.props.afterCreate(response.data.subject);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
