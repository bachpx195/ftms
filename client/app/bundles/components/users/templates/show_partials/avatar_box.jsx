import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../../../shareds/errors';
import * as app_constants from 'constants/app_constants';
import UploadImageModal from './upload_image_modal';

export default class AvatarBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.user_detail.avatar,
    }
  }

  renderUploadImageModal(){
    return(
      <UploadImageModal avatar={this.state.avatar}
        organization={this.props.user_detail.user_profile.organization.id}
        user_detail={this.props.user_detail}
        handleAfterUploaded={this.handleAfterUploaded.bind(this)}/>
    );
  }

  render(){
    return(
      <div>
        <div className='avatar-container clearfix'>
          <img src={this.state.avatar.url || app_constants.DEFAULT_IMAGE_USER_URL}
            className='img-circle img-responsive avatar-size'/>
          <div className='upload-btn-overlay clearfix'
            onClick={this.handleUploadImageModal.bind(this)}>
            <div className='row'>
              <div className='col-md-12'>
                <div className='col-md-2'>
                  <i className='fa fa-camera'></i>
                </div>
                <div className='col-md-10'>
                  <span>{I18n.t('users.avatar.upload_profile_picture')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderUploadImageModal()}
      </div>
    );
  }

  handleUploadImageModal(){
    $('.modal-upload-image').modal();
  }

  handleAfterUploaded(avatar){
    this.setState({
      avatar: avatar,
    });
  }
}
