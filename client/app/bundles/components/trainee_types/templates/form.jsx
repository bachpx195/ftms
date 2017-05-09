import * as routes from 'config/routes';
import axios from 'axios';
import Create from '../actions/create';
import Dropzone from 'react-dropzone';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import Update from '../actions/update';
import _ from 'lodash';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainee_type: props.trainee_type,
      name: props.trainee_type ? props.trainee_type.name : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.trainee_type ? nextProps.trainee_type.name : ''
    });
  }

  render() {
    let action = '';
    let attributes = _.pick(this.state, 'name');
    if (this.state.trainee_type) {
      action = <Update
        params={'trainee_type'}
        url={routes.trainee_type_url(this.props.trainee_type.id)}
        attributes={attributes}
        handleAfterUpdated={this.props.handleAfterUpdated}
      />
    } else {
      action = <Create
        params={'trainee_type'}
        url={routes.trainee_types_url()}
        attributes={attributes}
        handleAfterCreated={this.props.handleAfterCreated}
      />
    }
    return (
      <form>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('trainee_types.headers.name')}
            value={this.state.name} ref='nameField'
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            {action}
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
}
