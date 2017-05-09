import axios from 'axios';
import ModalCloneTrainingStandard from '../templates/modal_clone_training_standard';
import React from 'react';
import * as routes from 'config/routes';

export default class Clone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard
    };
    this.current_user = JSON.parse(localStorage.current_user);
  }

  onClone() {
    $('.modal-clone-training-standard').modal();
  }

  onSubmitClone(organization) {
    if (confirm(I18n.t('data.confirm_clone'))) {
      let clone_url = routes.clone_url();
      axios({
        url: clone_url,
        method: 'POST',
        data: {
          clone:{
            training_standard_id: this.state.training_standard.id,
            organization_id: organization.id
          },
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      }).then(response => {
        let new_training_standard = response.data.training_standard;
        let training_standard_url = routes.organization_training_standard_url(
          organization.id, new_training_standard.id);
        window.location.href =  training_standard_url;
      }).catch(error => {
        this.setState({errors: error.response.data.errors});
      });
    }
  }

  render() {
    return (
      <span>
        <ModalCloneTrainingStandard
          training_standard={this.state.training_standard}
          onSubmitClone={this.onSubmitClone.bind(this)} />
        <button type='button' className='btn btn-success header-button'
          onClick={this.onClone.bind(this)}>
          <i className='fa fa-clone'></i> {I18n.t('training_standards.clone')}
        </button>
      </span>
    );
  }
}
