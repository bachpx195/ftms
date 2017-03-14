import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';

export default class FormCreate extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" placeholder={I18n.t("sub_organizations.create")}
            className="form-control" name="name" ref="nameField" />
        </div>
        <div className="form-group">
          <div className="text-right">
            <button type="submit"
              className="btn btn-primary">
              {I18n.t("buttons.save")}
            </button>
          </div>
        </div>
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url + "/" + this.props.organization.id + "/programs", {
      program: {
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.refs.nameField.value = '';
      this.props.afterCreate(response.data.program);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
