import React from 'react';
import axios from 'axios';
import {APP_NAME} from 'constants/app_constants';
import {CLONE_PATH} from '../constants/training_standard_constants';
import {ORGANIZATION_PATH, TRAINING_STANDARD_PATH} from '../constants/training_standard_constants';

export default class Clone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      organization: props.organization
    };
  }

  render() {
    return (
      <div className="col-md-1">
        <a className="btn btn-success" onClick={this.onClone.bind(this)}>
          <i className="fa fa-clone"></i> {I18n.t("training_standards.clone")}
        </a>
      </div>
    );
  }

  onClone() {
    if (confirm(I18n.t("data.confirm_clone"))) {
      let clone_path = APP_NAME + CLONE_PATH;
      axios({
        url: clone_path,
        method: 'POST',
        data: {
          training_standard_id: this.state.training_standard.id,
          organization_id: this.state.organization.id,
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      }).then(response => {
        let new_training_standard = response.data.training_standard;
        debugger
        let training_standard_url = APP_NAME + ORGANIZATION_PATH + '/' +
          this.state.organization.id + '/' + TRAINING_STANDARD_PATH +
          '/' + new_training_standard.id;

        window.location.href =  training_standard_url;
      }).catch(error => {
        this.setState({errors: error.response.data.errors});
      });
    }
  }
}
