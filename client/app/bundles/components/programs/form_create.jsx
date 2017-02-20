import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      errors: null,
      program: {
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
    if (this.state.parent) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className="form-group">
            <input type="text" placeholder={I18n.t("programs.create_sub")}
              className="form-control" name="name" ref="nameField" />
            <input type="text" className="form-control hidden disable"
              name="parent_id" defaultValue={this.props.parent.id} />
          </div>

          <div className="form-group">
            <div className="text-right">
              <button type="submit"
                className="btn btn-primary">{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <div className="form-group">

            <input type="text" placeholder={I18n.t("programs.headers.name")}
              className="form-control" name="name" ref="nameField" />
          </div>
          <div className="form-group">
            <div className="text-right">
              <button type="submit"
                className="btn btn-primary">{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </form>
      );
    }
  }

  handleSubmit(event) {
    let request = null;
    event.preventDefault();
    axios.post(this.props.url, {
      program: {
        name: this.refs.nameField.value,
        parent_id: this.props.parent.id
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        $('#modalEdit').modal('hide');
        this.setState({parent: ''});
        this.fetchAllProgram();
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchAllProgram() {
    const url = this.props.url;
    axios.get(url + '.json')
      .then(response => {
        this.setState({programs: response.data.programs});
        this.props.handleAfterSaved(this.state.programs);
      })
      .catch(error => {
        console.log(error)
      });
  }
}
