import _ from 'lodash';
import axios from 'axios';
import Create from '../actions/create';
import React from 'react';
import Update from '../actions/update';
import * as app_constants from 'constants/app_constants';
import * as program_constants from '../constants/program_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + program_constants.ORGANIZATION_PATH;
const PROGRAMS = program_constants.PROGRAMS_PATH;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.program.name || '',
      parent_id: props.parent_id || '',
      program: props.program || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program: nextProps.program,
      name: nextProps.program.name || '',
      parent_id:  nextProps.parent_id
    });
  }


  render() {
    let input_parent = '';
    let action = '';
    let attributes = _.omit(this.state, 'program');
    let placeholder = this.state.parent_id ? I18n.t("programs.create_sub") :
      I18n.t("programs.create")
    if (this.state.program) {
      action =
        <Update
          url={this.props.url}
          params={"program"}
          attributes={attributes}
          handleAfterUpdated={this.props.handleAfterUpdated}/>
    } else {

      action =
        <Create
          url={this.props.url}
          params={"program"}
          attributes={attributes}
          handleAfterCreated={this.props.handleAfterCreated}
        />
    }

    return (
      <form>

        <div className="form-group">
          <input type="text" placeholder={placeholder}
            className="form-control" name="name" ref="nameField"
            value={this.state.name}
            onChange={this.handleChange.bind(this)} />
          {input_parent}
        </div>

        <div className="form-group">
          <div className="text-right">
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
