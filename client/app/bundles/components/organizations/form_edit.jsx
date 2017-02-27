import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: this.props.organization,
      errors: null,
      organizations: []
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    let organization = Object.assign({}, this.state.organization,{[attribute]: event.target.value});
    this.setState({
      organization: organization
    });
  }

  formValid() {
    return this.state.organization.name != '';
  }

  handleSubmit(event) {
    let request = null;
    event.preventDefault();
    if (this.state.organization) {
      request = axios.patch(this.props.url + "/" + this.state.organization.id, {
        organization: {
          name: this.refs.nameField.value
        }, authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG);
    }

    request.then(response => {
      $('#modalEdit').modal('hide');
      this.fetchAllOrganization();
    })
    .catch(error => {
      console.log(error)
    })
  }

  fetchAllOrganization() {
    const url = this.props.url;
    axios.get(url + '.json')
      .then(response => {
        this.setState({organizations: response.data.organizations});
        this.props.handleAfterSaved(this.state.organizations);
      })
      .catch(error => {
          console.log(error)
      }
    );
  }
}
