import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import FormEdit from './form_edit';
import UserRolesBox from './user_roles_box';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH

export default class UserShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_detail: {
        avatar: {}
      },
    }
  }

  componentWillMount() {
    this.fetchUser();
  }

  fetchUser() {
    axios.get(USER_URL +this.props.user.id + '.json')
    .then(response => {
      this.setState({
        user_detail: response.data.user_detail
      })
    })
    .catch(error => {
      console.log(error);
    })
  }


  renderModal(){
    let title = '';
    title = I18n.t('users.edit_info_user');
    return (
      <div id='modal' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body'>
              <FormEdit user={this.state.user_detail} url={USER_URL}
                handleAfterSaved={this.handleAfterUpdated.bind(this)}
                avatar={this.state.user_detail.avatar}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(new_user) {
    this.setState({
      user_detail: new_user
    })
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      user: this.props.user[$target.data('show')]
    });
    $('#modal').modal();
  }

  render() {
    return(
      <div className='user-profile'>
        <div className='panel panel-info'>
          <div className='panel panel-heading'>
            <span className='pull-right'>
              <a onClick={this.handleEdit.bind(this)} data-original-title={I18n.t('users.edit_user')}
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
              <img src={this.state.user_detail.avatar.url}
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
                </tbody>
              </table>
              <UserRolesBox user={this.props.user}/>
            </div>
          </div>
        </div>
      {this.renderModal()}
      </div>
    )
  }
}
