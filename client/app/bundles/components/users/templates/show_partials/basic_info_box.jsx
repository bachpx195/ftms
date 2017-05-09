import React from 'react';
import RolesBox from './roles_box';
import UploadImageModal from './upload_image_modal';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import UserPolicy from 'policy/user_policy';

export default class BasicInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.user_detail.avatar,
    }
  }

  renderUploadImageModal() {
    return (
      <UploadImageModal avatar={this.state.avatar}
        organization={this.props.user_detail.user_profile.organization.id}
        user_detail={this.props.user_detail}
        handleAfterUploaded={this.handleAfterUploaded.bind(this)}/>
    );
  }

  render() {
    return (
      <div className='box box-primary'>
        <div className='box-body box-profile'>
          <div className='avatar-container clearfix'>
            <img src={this.state.avatar.url || app_constants.DEFAULT_IMAGE_USER_URL}
              className='img-circle img-responsive avatar-size'/>
            <div className='upload-btn-overlay clearfix'
              onClick={this.handleUploadImageModal.bind(this)}>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='col-md-2'><i className='fa fa-camera'></i></div>
                  <div className='col-md-10'>
                    <span>{I18n.t('users.avatar.upload_profile_picture')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className='profile-username text-center'>
            {this.props.user_detail.name}
          </h3>
          <p className='text-muted text-center'>
            <b>{I18n.t('users.email')} </b>{this.props.user_detail.email} &nbsp;
            <UserPolicy permit={[
              {action: ['update']},
              {action: ['correctUser'], data: {id: this.props.user.id}}
            ]}>
              <a href={routes.edit_user_url(this.props.user_detail.id)}>
                <i className='fa fa-pencil'></i></a>
            </UserPolicy>
          </p>
          <RolesBox user={this.props.user} />
          <UserPolicy permit={[{action: ['show']}]}>
            <div className='btn btn-primary col-md-12'>
              {I18n.t('users.buttons.export_user_profile')}
            </div>
          </UserPolicy>
          {this.renderUploadImageModal()}
        </div>
      </div>
    );
  }

  handleUploadImageModal() {
    $('.modal-upload-image').modal();
  }

  handleAfterUploaded(avatar) {
    this.setState({
      avatar: avatar,
    });
  }
}
