import axios from 'axios';
import {APP_NAME, CLONE_PATH, ORGANIZATIONS_PATH, TRAINING_STANDARDS_PATH} from 
  'constants/app_constants';
import React from 'react';

export default class Clone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      organization: props.organization,
      share_with_organization: props.share_with_organization
    };
    this.current_user = JSON.parse(localStorage.current_user);
  }

  onClone() {
    if (confirm(I18n.t("data.confirm_clone"))) {
      let clone_path = APP_NAME + CLONE_PATH;
      axios({
        url: clone_path,
        method: 'POST',
        data: {
          clone:{
            training_standard_id: this.state.training_standard.id,
            organization_id: this.state.organization.id
          },
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      }).then(response => {
        let new_training_standard = response.data.training_standard;
        let training_standard_url = APP_NAME + ORGANIZATIONS_PATH + '/' +
          this.state.organization.id + '/' + TRAINING_STANDARDS_PATH +
          '/' + new_training_standard.id;

        window.location.href =  training_standard_url;
      }).catch(error => {
        this.setState({errors: error.response.data.errors});
      });
    }
  }


  check_publiced() {
    return this.state.training_standard.policy == "publiced";
  }

  check_shared() {
    return this.state.share_with_organization != null &&
      this.state.share_with_organization.organization_id == this.state.organization.id;
  }

  check_not_belong_organization() {
    return this.state.training_standard.organization_id != this.state.organization.id;
  }

  check_creator_or_owner() {
    return this.state.training_standard.creator_id == this.current_user.id ||
      this.state.organization.user_id == this.current_user.id;
  }

  render() {
    if ((this.check_publiced() || this.check_shared()) &&
      this.check_not_belong_organization() && this.check_creator_or_owner()) {
      return (
        <div className="col-md-1">
          <a className="btn btn-success" onClick={this.onClone.bind(this)}>
            <i className="fa fa-clone"></i> {I18n.t("training_standards.clone")}
          </a>
        </div>
      )
    } else {
      return null;
    }
  }
}
