import React from 'react';
import ReactOnRails from 'react-on-rails';
import _ from 'lodash';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormEditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_profile: props.user_profile,
      organization: props.user_profile.organization || {},
      program: props.user_profile.program || {},
      programs: props.programs,
      organizations: props.organizations,
      errors: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user_profile: nextProps.user_profile,
      organization: nextProps.user_profile.organization,
      program: nextProps.user_profile.program,
      organizations: nextProps.organizations,
      programs: nextProps.programs,
      errors: null
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />

        <div className="form-group">
          <select className="form-control" ref="organizationField" name="organizationField"
            value={this.state.organization.id} onChange={this.handleChangeOrganization.bind(this)}>
            {this.renderOrganizationOptions()}
          </select>
        </div>

        <div className="form-group">
          <select className="form-control" ref="programField" name="programField"
            value={this.state.program.id} onChange={this.handleChangeProgram.bind(this)}>
            {this.renderProgramOptions()}
          </select>
        </div>

        <div className="form-group">
          <div className="text-right">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("users.buttons.save")}</button>
          </div>
        </div>
      </form>
    );
  }

  handleChangeOrganization(event) {
    let attribute = event.target.name;
    let value = event.target.value;
    if(attribute == 'organizationField') {
      value = this.state.user_profile.organizations
        .find(organization => organization.id == event.target.value);
    }
    this.setState({
      organization: value
    });
  }

  handleChangeProgram(event) {
    let attribute = event.target.name;
    let value= event.target.value;
    if(attribute == 'programField') {
      value = this.state.user_profile.programs
        .find(program => program.id == event.target.value);
    }
    this.setState({
      program: value
    });
  }

  formValid() {
    return this.state.program.id != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.patch(this.props.url + '/' + this.state.user_profile.user.id, {
      profile: {
        organization_id: this.refs.organizationField.value,
        program_id: this.refs.programField.value,
        user_attributes: this.state.user_profile.user
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modalProfile').modal('hide');
      this.props.handleAfterSaved(response.data.user_profile);
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderOrganizationOptions(){
    let organizations = this.state.user_profile.organizations;
    return _.map(organizations, organization => {
      return <option key={organization.id}
        value={organization.id}>{organization.name}</option>;
    });
  }

  renderProgramOptions(){
    let programs = this.state.user_profile.programs;
    return _.map(programs, program => {
      if (program.organization_id == this.state.organization.id) {
        return <option key={program.id}
          value={program.id}>{program.name}</option>;
      }
    });
  }
}
