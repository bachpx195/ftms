import _ from 'lodash';
import axios from 'axios';
import Create from '../actions/create';
import React from 'react';
import * as routes from 'config/routes';

export default class ProgramCreatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    let attributes = _.omit(this.state, 'program');

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
            <Create
              url={routes.organization_programs_url(this.props.organization.id)}
              params={'program'}
              attributes={attributes}
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

  handleAfterCreated(response) {
    let program = response.data.program;
    this.setState({
      name: ''
    });
    this.props.handleAfterCreated(program);
  }
}
