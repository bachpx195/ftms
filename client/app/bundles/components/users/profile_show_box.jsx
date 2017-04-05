import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import FormEditProfile from './form_edit_profile';

const PROFILE_URL = app_constants.APP_NAME + 'change_profile/' + user_constants.USER_PATH

export default class ProfileShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_profile: {
        user: {
          name: '',
          email: '',
          avatar: {}
        },
        organization: {
          name: ''
        },
        program: {
          name: ''
        },
        organizations: {},
        programs: {}
      }
    }
  }

  componentWillMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    axios.get(PROFILE_URL + '/' + this.props.profile.user_id + '.json')
    .then(response => {
      this.setState({
        user_profile: response.data.user_profile
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
      <div id='modalProfile' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body'>
              <FormEditProfile
                user_profile={this.state.user_profile}
                url={PROFILE_URL}
                organization={this.state.organization}
                program={this.state.program}
                handleAfterSaved={this.handleAfterUpdated.bind(this)}
                organizations={this.state.organizations}
                programs={this.state.programs} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(new_user_profile) {
    _.map(this.state.user_profile.organizations, organization => {
      if (organization.id == new_user_profile.organization_id) {
        let name = organization.name;
        this.state.user_profile.organization.name = name;
        this.setState({
          user_profile: this.state.user_profile
        });
      }
    })

    _.map(this.state.user_profile.programs, program => {
      if (program.id == new_user_profile.program_id) {
        let name = program.name;
        this.state.user_profile.program.name = name;
        this.setState({
          user_profile: this.state.user_profile
        });
      }
    })
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    $('#modalProfile').modal();
  }

  render() {
    return(
      <div className='user-profile'>
        <div className='panel panel-info'>
          <div className='panel panel-heading'>
            <span className='pull-right'>
              <a onClick={this.handleEdit.bind(this)} data-original-title={I18n.t('users.edit_user')}
                data-toggle='tooltip' data-show='' type='button' className='btn btn-md btn-success'>
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
              <img src={this.state.user_profile.user.avatar.url}
                className='img-circle img-responsive'/>
            </div>
            <div className='col-md-9'>
              <table className='table table-user-information'>
                <tbody>
                  <tr>
                    <td>{I18n.t('users.staff_code')}</td>
                    <td>{this.state.user_profile.staff_code}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.name')}</td>
                    <td>{this.state.user_profile.user.name}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.email')}</td>
                    <td>{this.state.user_profile.user.email}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.organization')}</td>
                    <td>{this.state.user_profile.organization.name}</td>
                  </tr>
                  <tr>
                    <td>{I18n.t('users.program')}</td>
                    <td>{this.state.user_profile.program.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}
