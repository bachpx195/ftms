import axios from 'axios';
import css from '../../subjects/assets/subject.scss';
import React from 'react';
import * as app_constants from 'constants/app_constants';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: ''
      },
      type: props.type || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type || ''
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        <div className="form-group">
          <div className="col-md-12">
            <input type="text" placeholder={I18n.t("subjects.headers.name")}
              className="form-control" name="name" ref="nameField"
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <input type="text" placeholder={I18n.t("subjects.headers.content")}
              className="form-control" name="content" ref="contentField"
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-3 col-md-offset-9">
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t("buttons.create_task")}</button>
          </div>
        </div>
      </form>
    )
  }

  formValid() {
    return this.state.task.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      task: {
        [attribute]: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url, {
      task: {
        name: this.refs.nameField.value,
        content: this.refs.contentField.value,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        type: this.props.type
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        this.refs.contentField.value = '';
        this.props.afterCreateTask(response.data.target,
          this.props.type, this.props.ownerable_type);
      })
      .catch(error => console.log(error));
  }
}
