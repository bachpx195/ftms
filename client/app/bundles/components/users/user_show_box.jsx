import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH

export default class UserShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_detail: {},
    }
  }

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    axios.get(USER_URL + '/' +this.props.user.id + '.json')
    .then(response => {
      this.setState({
        user_detail: response.data.user_detail
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className='user-profile'>
        <div className='panel panel-info'>
          <div className='panel panel-heading'>
            <span className='pull-right'>
              <a href='#' data-original-title={I18n.t('users.edit_user')}
                data-toggle='tooltip' type='button' className='btn btn-md btn-success'>
                <i className='glyphicon glyphicon-edit'></i>
              </a>
              <a href='#' data-original-title={I18n.t('users.delete_user')}
                data-toggle='tooltip' type='button' className='btn btn-md btn-danger'>
                <i className='glyphicon glyphicon-trash'></i>
              </a>
            </span>
            <h2>{I18n.t('users.user_profile')}</h2>
          </div>
          <div className='panel panel-body'>
            <div className='col-md-3'>
              <img src={this.state.user_detail.avatar}
                className='img-circle img-responsive'/>
            </div>
            <div className='col-md-9'>
              <table className='table table-user-information'>
                <tbody>
                  <tr>
                    <td>{I18n.t('users.name')}</td>
                    <td>{this.state.user_detail.name}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.email')}</td>
                    <td>{this.state.user_detail.email}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.type')}</td>
                    <td>{this.state.user_detail.type}</td>
                  </tr>
                </tbody>
              </table>
              <a href='' className='btn btn-lg btn-primary'>{I18n.t('users.edit_role')}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
