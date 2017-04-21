import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import * as routes from 'config/routes';

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
      let program_url = routes.organization_program_url(
        this.props.organization.id, this.state.id);
      axios.patch(program_url, {
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
      let programs_url = routes.organization_programs_url(
        this.props.organization.id);
       axios.post(programs_url, {
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
