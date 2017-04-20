import * as app_constants from 'constants/app_constants';
import axios from 'axios';
import {CLONE_PATH} from '../constants/training_standard_constants';
import ModalShareTrainingStandard from '../templates/modal_share_training_standard';
import {ORGANIZATION_PATH, TRAINING_STANDARD_PATH, SHARE_WITH_PATH} from
  '../constants/training_standard_constants';
import React from 'react';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + TRAINING_STANDARD_PATH;
const SHARE_WITH_URL = app_constants.APP_NAME + SHARE_WITH_PATH;

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      organization: props.organization,
      selected_organizations: props.selected_organizations
    };
    this.current_user = JSON.parse(localStorage.current_user);
  }

  is_privated() {
    return this.state.training_standard.policy == "privated";
  }

  check_creator_or_owner() {
    return this.state.training_standard.creator_id == this.current_user.id ||
      this.state.organization.user_id == this.current_user.id;
  }

  check_organization() {
    return this.state.training_standard.organization_id == this.state.organization.id;
  }

  render() {
    if (this.is_privated() && this.check_creator_or_owner() && this.check_organization()) {
      return (
        <div className='col-md-2'>
          <ModalShareTrainingStandard
            url={TRAINING_STANDARD_URL}
            training_standard={this.state.training_standard}
            selected_organizations={this.state.selected_organizations}
            handleAfterShareTrainingStandard={this.handleAfterShareTrainingStandard.bind(this)}
          />
          <button className="btn btn-success"
            title={I18n.t("training_standards.share_training_standard")}
            onClick={this.onClickShareTrainingStandard.bind(this)}>
            <i className="fa fa-eye"></i>
            {I18n.t("training_standards.share_training_standard")}
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  handleAfterShareTrainingStandard(select_organizations) {
    if (confirm(I18n.t("data.confirm_share"))) {
      select_organizations.map((select_organization) => {
        this.sendRequestShare(select_organization);
      });
    }
  }


  sendRequestShare(organization) {
    axios.post(SHARE_WITH_URL + ".json", {
      share_with: {
        training_standard_id: this.state.training_standard.id,
        organization_id: organization.id
      }, authenticity_token: ReactOnRails.authenticityToken(),
        headers: {'Accept': 'application/json'}
    }).then(response => {
      _.remove(this.state.selected_organizations,
        shared => shared.id === response.data.share_with.organization_id);
      this.setState({
        selected_organizations: this.state.selected_organizations
      });
    }).catch(error => {
      console.log(error);
    });
  }


  onClickShareTrainingStandard() {
    $('.modal-share-training-standard').modal();
  }
}
