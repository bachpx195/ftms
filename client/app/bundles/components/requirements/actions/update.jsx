import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';

const PROJECTS_URL = app_constants.APP_NAME + app_constants.PROJECTS_PATH;

export default class Update extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requirement: props.requirement,
    }
  }

  render() {
    return (
      <div className="box-tools pull-right">
        <button type="button" className="btn btn-info"
          onClick={this.handleClickButton.bind(this)}>
          <i className="fa fa-pencil"></i>{I18n.t('buttons.edit')}
        </button>&nbsp;
        <button className="btn btn-danger"
          onClick={this.handleDelete.bind(this)}>
          {I18n.t('buttons.delete')}</button>
      </div>
    );
  }

  handleClickButton() {
    let url = PROJECTS_URL + '/' + this.state.requirement.project_id + '/' +
      app_constants.REQUIREMENTS_PATH + '/' + this.state.requirement.id;
    this.props.handleOnClickEdit(this.state.requirement, url);
  }

  handleAfterUpdate(new_requirement) {
    this.setState({
      requirement: new_requirement,
    })
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const url = PROJECTS_URL + '/' + this.state.requirement.project_id + '/' +
        app_constants.REQUIREMENTS_PATH + '/' + this.state.requirement.id ;
      axios.delete(url, {
        params: {authenticity_token: ReactOnRails.authenticityToken()}
      })
      .then(response => {
        this.props.handleAfterDelete(this.state.requirement);
      })
      .catch(error => console.log(error));
    }
  }
}
