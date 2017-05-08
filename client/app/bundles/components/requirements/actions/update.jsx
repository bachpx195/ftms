import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';

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
        <button title={I18n.t('buttons.edit')} type="button"
          className="btn btn-info"
            onClick={this.handleClickButton.bind(this)}>
          <i className="fa fa-pencil-square-o"></i>
        </button>&nbsp;
        <button title={I18n.t('buttons.delete')} className="btn btn-danger"
          onClick={this.handleDelete.bind(this)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  }

  handleClickButton() {
    let requirement_url = requirement_url = routes.project_requirement_url(
        this.state.requirement.project_id, this.state.requirement.id);
    this.props.handleOnClickEdit(this.state.requirement, requirement_url);
  }

  handleAfterUpdate(new_requirement) {
    this.setState({
      requirement: new_requirement,
    })
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const requirement_url = routes.project_requirement_url(
        this.state.requirement.project_id, this.state.requirement.id);
      axios.delete(requirement_url, {
        params: {authenticity_token: ReactOnRails.authenticityToken()}
      })
      .then(response => {
        this.props.handleAfterDelete(this.state.requirement);
      })
      .catch(error => console.log(error));
    }
  }
}
