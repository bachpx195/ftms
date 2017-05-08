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
    let is_selected = this.state.select_organizations.findIndex(
      organization => organization.id == this.props.organization.id) >= 0;

    return (
      <li className="list-group-item"
        onClick={this.onClickOrganization.bind(this)}
        title={this.props.organization.name}>
        <input type="checkbox" value={this.props.organization.id}
          checked={is_selected} readOnly
          name={this.props.organization.name}>
        </input>
        {this.props.organization.name}
      </li>
    );
  }

  onClickOrganization(event) {
    let index = this.state.select_organizations.findIndex(
      organization => organization.id == this.props.organization.id);

    if (index >= 0) {
      this.state.select_organizations.splice(index, 1);
    } else {
      this.state.select_organizations.push(this.props.organization);
    }
    this.props.chooseOrganization(this.state.select_organizations);
  }
}
