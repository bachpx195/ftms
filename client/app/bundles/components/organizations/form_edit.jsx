import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization,
      errors: null,
      organizations: props.organizations
    };
  }

  render() {
    let parent = this.state.organization.parent || {};
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className="form-group">
          <select className="form-control" ref="parentIdField" name="parent"
            value={parent.id} onChange={this.handleChange.bind(this)}>
            <option value="">{I18n.t('organizations.select_parent')}</option>
            {this.renderOptions()}
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder={I18n.t("organizations.edit")}
            className="form-control" name="name" ref="nameField"
            value={this.state.organization.name}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <div className="text-right">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
          </div>
        </div>
      </form>
    );
  }

  renderOptions(){
    let organizations = this.state.organizations;
    return organizations.map(organization => {
      return <option key={organization.id}
        value={organization.id}>{organization.name}</option>;
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      errors: null,
      organizations: nextProps.organizations
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    let value = event.target.value;
    if(attribute == 'parent') {
      value = this.props.organizations
        .find(organization => organization == event.target.value);
    }
    let organization = Object.assign({}, this.state.organization,
      {[attribute]: value});
    this.setState({
      organization: organization
    });
  }

  formValid() {
    return this.state.organization.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.patch(this.props.url + "/" + this.state.organization.id, {
      organization: {
        parent_id: this.refs.parentIdField.value,
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modal').modal('hide');
      this.props.handleAfterSaved(response.data.organization);
    })
    .catch(error => {
      console.log(error)
    })
  }
}
