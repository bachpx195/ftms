import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import CSS from '../organization.scss';
import * as app_constants from 'constants/app_constants';

export default class FormCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      organization: {
        name: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parent: nextProps.parent
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal
        margin-form-create">
        <div className="form-group">
          <div className="col-md-10">
            <input type="text" placeholder={I18n.t("organizations.headers.name")}
              className="form-control" name="name" ref="nameField"
              onChange={this.handleChange.bind(this)} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("buttons.save")}</button>
          </div>
        </div>
      </form>
    );
  }

  formValid(){
    return this.state.organization.name != '';
  }

  handleChange(event) {
    this.setState({
      organization: {
        name: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url, {
      organization: {
        name: this.refs.nameField.value,
        parent_id: this.state.parent ? this.state.parent.id : ''
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        window.location.href = this.props.url + '/' +
          response.data.organization.id;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
