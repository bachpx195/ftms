import React from 'react';

import * as app_constants from 'constants/app_constants';

const DEFAULT_IMAGE_USER = app_constants.DEFAULT_IMAGE_USER_URL;

export default class BlockMembers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      managers: props.managers
    }
  }

  renderProfile() {
    return this.state.managers.map((manager, index) => {
      let avatar = DEFAULT_IMAGE_USER;
      let name = '';
      let email = '';
      if (manager.user_avatar && manager.user_avatar != undefined) {
        avatar = manager.user_avatar;
        name = manager.user_name;
        email = manager.user_email;
      }
      if (manager.avatar && manager.avatar.url != undefined) {
        avatar = manager.avatar.url;
        name = manager.name;
        email = manager.email;
      }
      return ( <li key={index} className="col-xs-4 td-list-manager">
        <div className="width-100 td-manager-box">
          <img src={avatar} className='col-sm-4 img-circle width-80' />
          <div className="col-sm-8">
            <p className="td-manager-name" title={name}>
              {name}</p>
            <p className="td-manager-email" title={email}>
              {email}</p>
          </div>
          <div className="clearfix"></div>
        </div>
      </li>);
    });
  }

  render() {
    return (
      <div className={`modal-manager-${this.state.course.id} modal fade
        td-modal-manager-profile`}
        key={this.state.course.id} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">
                {I18n.t('courses.list_managers')}
              </h4>
            </div>
            <div className="modal-body td-manager-profile-list">
              {this.renderProfile()}
              <div className="clearfix"></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default"
                data-dismiss="modal">
                {I18n.t('courses.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
