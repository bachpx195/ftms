import _ from 'lodash';
import axios from 'axios';
import Create from '../actions/create';
import React from 'react';
import * as routes from 'config/routes';

export default class StatusAddingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group col-md-10'>
          <input type='text' placeholder={I18n.t('users.modal.create')}
            className='form-control input-program col-md-10' name='name'
            ref='nameField' value={this.state.name}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <Create
              state={this.state}
              user_status={this.props.user_status}
              handleAfterCreated={this.handleAfterCreated.bind(this)}
            />
          </div>
        </div>
      </form>
    );
  }

  handleChange(event) {
    this.setState({
      name: this.refs.nameField.value
    });
  }

  handleAfterCreated(user_status) {
    this.setState({
      name: ''
    });
    this.props.handleAfterCreated(user_status);
  }
}
