import React from 'react';
import axios from 'axios';

import * as routes from 'config/routes';

export default class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: null,
    }
  }

  render() {
    return (
      <button className='btn btn-primary'
        onClick={this.handleSubmit.bind(this)}>
        {I18n.t('users.buttons.create')}</button>
    );
   }

   handleSubmit(event) {
     event.preventDefault();
     let user = this.props.state.user;
     let profile = this.props.state.profile;
     let formData = new FormData();
     for(let key of Object.keys(user)) {
       formData.append('user[' + key + ']', user[key]);
     }
     for(let key of Object.keys(profile)) {
       formData.append('user[profile_attributes][' + key + ']', profile[key]);
     }
     formData.append('user[profile_attributes][stage_id]]', this.props.stage.id);
     formData.append('user[profile_attributes][organization_id]]',
       this.props.organization.id);
     if (this.props.program) {
       formData.append('user[profile_attributes][program_id]]', this.props.program.id);
     }
     formData.append('authenticity_token', ReactOnRails.authenticityToken());
     axios({
       url: this.props.url,
       method: 'POST',
       data: formData,
       headers: {'Accept': 'application/json'}
     })
     .then(response => {
      window.location.href = routes.user_url(response.data.user.id);
     })
     .catch(error => {this.props.handleErrors(error.response.data.errors);});
   }
}
