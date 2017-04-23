import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import Dropzone from 'react-dropzone';
import ReactOnRails from 'react-on-rails';
import Create from '../actions/create';
import Update from '../actions/update';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.stage.name || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.stage.name || ''
    });
  }

  render() {
    let action = '';
    if (this.props.stage.id) {
      action =
        <Update
          state={this.state}
          url={this.props.url}
          stage={this.props.stage}
          handleAfterUpdated={this.props.handleAfterUpdated}/>
    } else {
      action =
        <Create
          state={this.state}
          url={this.props.url}
          stage={this.props.stage}
          handleAfterCreated={this.props.handleAfterCreated}
        />
    }

    return (
      <div>
        <form>
          <div className='form-group'>
            <input type='text' placeholder={I18n.t('stages.headers.name')}
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
      </div>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }
}
