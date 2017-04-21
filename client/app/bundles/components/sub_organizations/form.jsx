import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';

const ORGANIZATIONS_URL = app_constants.APP_NAME + 
  app_constants.ORGANIZATIONS_PATH;

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state={...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" name="name" ref="nameField"
            value={this.state.name || ''} onChange={this.onChange.bind(this)} />
        </div>
        <div className="form-group">
          <div className="text-right">
            <button type="submit" className="btn btn-primary">{I18n.t("buttons.save")}</button>
          </div>
        </div>
      </form>
    );
  }

  onChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.status == "edit") {
      let url = ORGANIZATIONS_URL + "/" + this.props.organization.id + "/programs/" + this.state.id;
      axios.patch(url, {
        program: {
          name: this.refs.nameField.value,
        }, authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG)
      .then(response => {
        $('#modalNode').modal('hide');
        this.props.afterEdit(response.data.program);
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      let url = ORGANIZATIONS_URL + "/" + this.props.organization.id + "/programs";
       axios.post(url, {
        program: {
          name: this.refs.nameField.value,
        }, authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG)
      .then(response => {
        $('#modalNode').modal('hide');
        this.props.afterCreate(response.data.program);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
