import _ from 'lodash';
import axios from 'axios';
import Create from '../actions/create';
import Dropzone from 'react-dropzone';
import Errors from 'shared/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import Update from '../actions/update';


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.university.name || '',
      errors: null
    };
  }

  render() {
    let action = '';
    if (this.props.university.id) {
      action = <Update
        url={this.props.url}
        state={this.state}
        university={this.props.university}
        handleAfterUpdated={this.props.handleAfterUpdated}
      />
    } else {
      action = <Create
        state={this.state}
        university={this.props.university}
        handleAfterCreated={this.props.handleAfterCreated}
      />
    }

    return (
      <form>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('universities.headers.name')}
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.university.name || '',
      errors: null
    });
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
}
