import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from '../constants/training_standard_constants';
import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    let {name} = this.props.organization
    return(
      <li className="list-group-item"
        onClick={this.onClickOrganization.bind(this)}
        title={this.props.organization.name}>
        <input type="checkbox" value={this.props.organization.id}
          checked={this.state.checked} readOnly
          name={this.props.organization.name}>
        </input>
        {name}
      </li>
    );
  }

  onClickOrganization(event) {
    if (this.state.checked) {
      let index = this.state.standard_organizations.findIndex(
        standard_organizations => standard_organizations.id == this.props.organization.id)
      this.state.select_organizations.splice(index, 1);
      this.props.chooseOrganization(this.state.standard_organizations);
    } else {
      this.state.select_organizations.push(this.props.organization);
      this.props.chooseOrganization(this.state.select_organizations);
    }
  }
}
