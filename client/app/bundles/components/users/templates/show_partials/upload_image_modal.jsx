import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import * as app_constants from 'constants/app_constants';
import * as user_constants from '../../user_constants';

export default class UploadImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.avatar,
      imageChanged: false,
    };
  }

  render() {
    let avatar = null;
    if (this.state.avatar) {
      if (this.state.avatar.url) {
        avatar = <img src={this.state.avatar.url} className='img-size' />;
      } else if (this.state.avatar.preview) {
        avatar = <img src={this.state.avatar.preview} className='img-size' />;
      } else {
        avatar = <img src={app_constants.DEFAULT_IMAGE_USER_URL} className='img-size' />;
      }
    }

    return (
      <div className='modal fade modal-upload-image' role='dialog'>
        <div className='modal-dialog modal-md' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title' >
                {I18n.t('users.modal_upload_image.title')}
              </h4>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <div className='dropzone'>
                    <div className='form-group'>
                      <button type='button' className='btn btn-success btn-select-file'
                        onClick={this.onOpenDropZone.bind(this)}>
                        <i className='fa fa-upload'></i> {I18n.t('dropzones.select_image')}
                      </button>
                    </div>
                  </div>
                  <div className='hidden'>
                    <Dropzone onDrop={this.onAvatarDrop.bind(this)} ref='dropzoneField'
                      multiple={false} accept='image/*' />
                  </div>
                  <div className='image-preview image-center'>{avatar}</div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>
                {I18n.t('buttons.cancel')}
              </button>
              <button type='button' className='btn btn-primary'
                onClick={this.handleSubmit.bind(this)}>{I18n.t('buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onOpenDropZone() {
    this.refs.dropzoneField.open();
  }

  onAvatarDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      avatar: acceptedFiles[0],
      changeImage: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    let current_user = JSON.parse(localStorage.current_user);
    if (this.state.changeImage) {
      formData.append('user[avatar]', this.state.avatar);
      formData.append('authenticity_token', ReactOnRails.authenticityToken());
      let url =  app_constants.APP_NAME + user_constants.ORGANIZATION_PATH
        + this.props.user_detail.user_profile.organization.id + '/'
        + user_constants.USER_PATH + this.props.user_detail.id;

      axios({
        url: url, method: 'PATCH', data: formData,
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        $('.modal-upload-image').modal('hide');
        Object.assign(current_user, {avatar: response.data.user_detail.avatar});
        localStorage.setItem('current_user', JSON.stringify(current_user));
        this.props.handleAfterUploaded(response.data.user_detail.avatar);
        window.location.reload();
      })
      .catch(error => {console.log(error);});
    } else {
      $('.modal-upload-image').modal('hide');
    }
  }
}
