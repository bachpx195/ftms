import * as routes from 'config/routes';
import axios from 'axios';
import ModalShareTrainingStandard from '../templates/modal_share_training_standard';
import React from 'react';

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      organization: props.organization,
      standard_organizations: props.standard_organizations
    };
    this.current_user = JSON.parse(localStorage.current_user);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      training_standard: nextProps.training_standard
    })
  }

  is_privated() {
    return this.state.training_standard.policy == 'privated';
  }

  check_creator_or_owner() {
    return this.state.training_standard.creator_id == this.current_user.id ||
      this.state.organization.user_id == this.current_user.id;
  }

  check_organization() {
    return this.state.training_standard.organization_id ==
      this.state.organization.id;
  }

  render() {
    if (this.is_privated() && this.check_creator_or_owner() &&
      this.check_organization()) {
      return (
        <div className='pull-left'>
          <ModalShareTrainingStandard
            url={routes.training_standards_url()}
            training_standard={this.state.training_standard}
            standard_organizations={this.state.standard_organizations}
            handleAfterShareTrainingStandard={this
              .handleAfterShareTrainingStandard.bind(this)}
          />
          <button className='btn btn-success header-button'
            title={I18n.t('training_standards.share_training_standard')}
            onClick={this.onClickShareTrainingStandard.bind(this)}>
            <i className='fa fa-eye'></i> &nbsp;
            {I18n.t('training_standards.share')}
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  handleAfterShareTrainingStandard(select_organizations) {
    if (confirm(I18n.t('data.confirm_share'))) {
      select_organizations.map((select_organization) => {
        this.sendRequestShare(select_organization);
      });
    }
  }


  sendRequestShare(organization) {
    axios.post(routes.share_with_url() + '.json', {
      share_with: {
        training_standard_id: this.state.training_standard.id,
        organization_id: organization.id
      },
      authenticity_token: ReactOnRails.authenticityToken(),
    }).then(response => {
      _.remove(this.state.standard_organizations,
        shared => shared.id === response.data.share_with.organization_id);
      this.setState({
        standard_organizations: this.state.standard_organizations
      });
    }).catch(error => {
      console.log(error);
    });
  }


  onClickShareTrainingStandard() {
    $('.modal-share-training-standard').modal();
  }
}
