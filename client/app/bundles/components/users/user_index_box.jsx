import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import UserListBox from './user_list_box';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH;

export default class UserIndexBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users
    }
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">

            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("users.users")}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-footer'>
              <UserListBox users={this.state.users}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
