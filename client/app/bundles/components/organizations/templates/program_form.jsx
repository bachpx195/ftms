import _ from 'lodash';
import axios from 'axios';
import Create from '../actions/create';
import React from 'react';
import Update from '../actions/update';
import * as routes from 'config/routes';

export default class FormProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.program ? props.program.name : '',
      program: props.program || '',
      organization_id: props.organization.id
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.program ? nextProps.program.name : '',
      program: nextProps.program,
      organization_id: nextProps.organization.id
    });
  }

  render() {
    let action = '';
    let attributes = _.omit(this.state, 'program');
    if (this.state.program) {
      action =
        <Update
          url={this.props.url}
          params={'program'}
          attributes={attributes}
          handleAfterUpdated={this.props.handleAfterUpdated}/>
    } else {
      action =
        <Create
          url={this.props.url}
          params={'program'}
          attributes={attributes}
          handleAfterCreated={this.handleAfterCreated.bind(this)}
        />
    }
    return (
      <form className="form-inline">
        <div className='form-group col-md-10'>
          <input type='text' placeholder={I18n.t('programs.create')}
            className='form-control input-program col-md-10' name='name'
            ref='nameField' value={this.state.name}
            onChange={this.handleChange.bind(this)} />
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

  handleAfterCreated(response) {
    let program = response.data.program;
    let organization_url = routes.organization_url(this.state.organization_id);
    window.location.href = organization_url;
    this.refs.nameField.value = '';
  }
}
