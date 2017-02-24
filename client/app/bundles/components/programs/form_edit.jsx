import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: this.props.parent,
      program: this.props.program,
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className="form-group">
          <input type="text" placeholder={I18n.t("programs.edit")}
            className="form-control" name="name" ref="nameField"
            value={this.state.program.name}
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
      program: nextProps.program,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    let program = Object.assign({}, this.state.program,
      {[attribute]: event.target.value});
    this.setState({
      program: program
    });
  }

  formValid() {
    return this.state.program.name != '';
  }

  handleSubmit(event) {
    let request = null;
    event.preventDefault();
    if (this.state.program) {
      request = axios.patch(this.props.url + "/" + this.state.program.id, {
        program: {
          name: this.refs.nameField.value
        },
        authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG);
    }

    request.then(response => {
      $('#modalEdit').modal('hide');
      this.fetchAllProgram();
    })
      .catch(error => {
        console.log(error)
      })
  }

  fetchAllProgram() {
    const url = this.props.url;
    axios.get(url + '.json')
      .then(response => {
        this.setState({programs: response.data.programs});
        this.props.handleAfterEdited(this.state.programs);
      })
      .catch(error => {
          console.log(error)
        }
      );
  }
}
