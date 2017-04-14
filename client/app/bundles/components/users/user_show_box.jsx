import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import FormEdit from './form_edit';
import UserRolesBox from './user_roles_box';
import ModalChangeProgram from './change_program/modal';
import CustomPolicy from 'policy/course_policy';

require('../../assets/sass/user.scss');

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH

export default class UserShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_detail: this.props.user_detail,
      user_program: this.props.user_detail.user_program,
      remaining_organization_programs: this.props
        .user_detail.remaining_organization_programs,
      user_profile: this.props.user_detail.user_profile,
    }
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

  renderChangeProgramModal(){
    if(this.state.user_program) {
      return (
        <ModalChangeProgram
          user={this.state.user_detail}
          user_program={this.state.user_program}
          remaining_organization_programs={this.state.remaining_organization_programs}
          afterChangeProgram={this.afterChangeProgram.bind(this)}
        />
      );
    }
  }

  render() {
    let btn_change_program, division, join_div_date, naitei_company,
      finish_training_date, leave_date = <tr></tr>;
    if(this.state.user_program) {
      btn_change_program = <div className='btn btn-primary'
        onClick={this.handleChangeProgram.bind(this)}>
        {I18n.t('users.buttons.change_program')}
      </div>;
    }

    if(this.state.user_profile.division) {
      division = <tr>
        <td>{I18n.t('users.profile_detail.division')}</td>
        <td>{this.state.user_profile.division.name}</td>
      </tr>;
    }

    if(this.state.user_profile.join_div_date) {
      join_div_date = <tr>
        <td>{I18n.t('users.profile_detail.join_div_date')}</td>
        <td>{this.state.user_profile.join_div_date}</td>
      </tr>;
    }

    if(this.state.user_profile.naitei_company) {
      naitei_company = <tr>
        <td>{I18n.t('users.profile_detail.naitei_company')}</td>
        <td>{this.state.user_profile.naitei_company}</td>
      </tr>;
    }

    if(this.state.user_profile.finish_training_date) {
      finish_training_date = <tr>
        <td>{I18n.t('users.profile_detail.finish_training_date')}</td>
        <td>{this.state.user_profile.finish_training_date}</td>
      </tr>;
    }

    if(this.state.user_profile.leave_date) {
      leave_date = <tr>
        <td>{I18n.t('users.profile_detail.leave_date')}</td>
        <td>{this.state.user_profile.leave_date}</td>
      </tr>;
    }

    return(
      <div className='user-profile'>
        <div className='panel panel-info'>
          <div className='panel panel-heading'>
            <span className='pull-right'>
              <CustomPolicy permit={[{controller: 'users', action: ['index'], target: 'children'},
                {action: ['setOwner'], target: 'children', data: {organization_ids:
                this.state.organization_ids}}]} >
                {btn_change_program}
              </CustomPolicy>
              <a onClick={this.handleEdit.bind(this)} data-original-title={I18n.t('users.edit_user')}
                data-toggle='tooltip' type='button' className='btn btn-md btn-primary'>
                <i className='glyphicon glyphicon-edit'></i>
              </a>
              <CustomPolicy permit={[{controller: 'users', action: ['index'], target: 'children'},
                {action: ['setOwner'], target: 'children', data: {organization_ids:
                this.state.organization_ids}}]} >
                <a href='#' data-original-title={I18n.t('users.delete_user')}
                  data-toggle='tooltip' type='button' className='btn btn-md btn-danger'>
                  <i className='glyphicon glyphicon-trash'></i>
                </a>
              </CustomPolicy>
            </span>
            <h2>{I18n.t('users.user_profile')}</h2>
          </div>
          <div className='panel panel-body col-md-12'>
            <div className='col-md-2 '>
              <img src={this.state.user_detail.avatar.url}
                className='img-circle img-responsive img-size-50p'/>
              <UserRolesBox user={this.props.user}/>
            </div>
            <div className='col-md-5'>
              <div className='box'>
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
                      <td>{I18n.t('users.profile_detail.university')}</td>
                      <td>{this.state.user_profile.university ?
                        this.state.user_profile.university.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.working_day')}</td>
                      <td>{this.state.user_profile.working_day || ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.user_status')}</td>
                      <td>{this.state.user_profile.user_status ?
                        this.state.user_profile.user_status.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.graduation')}</td>
                      <td>{this.state.user_profile.graduation || ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.ready_for_project')}</td>
                      <td>{this.state.user_profile.ready_for_project ?
                        I18n.t('users.profile_detail.ready') :
                        I18n.t('users.profile_detail.not_ready')}
                      </td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.start_training_date')}</td>
                      <td>{this.state.user_profile.start_training_date || ''}</td>
                    </tr>
                    {finish_training_date}
                    {leave_date}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='box'>
                <table className='table table-user-information'>
                  <tbody>
                    <tr>
                      <td>{I18n.t('users.profile_detail.organization')}</td>
                      <td>{this.state.user_profile.organization ?
                        this.state.user_profile.organization.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.program')}</td>
                      <td>{this.state.user_profile.program ?
                        this.state.user_program.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.staff_code')}</td>
                      <td>{this.state.user_profile.staff_code || ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.language')}</td>
                      <td>{this.state.user_profile.language ?
                        this.state.user_profile.language.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.trainee_type')}</td>
                      <td>{this.state.user_profile.trainee_type ?
                        this.state.user_profile.trainee_type.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.stage')}</td>
                      <td>{this.state.user_profile.stage ?
                        this.state.user_profile.stage.name : ''}</td>
                    </tr>
                    <tr>
                      <td>{I18n.t('users.profile_detail.contract_date')}</td>
                      <td>{this.state.user_profile.contract_date || ''}</td>
                    </tr>
                    {division}
                    {join_div_date}
                    {naitei_company}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {this.renderModal()}
      {this.renderChangeProgramModal()}
      </div>
    )
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

  handleChangeProgram(event) {
    let $target = $(event.target);
    $target.blur();
    $('.modal-change-program').modal();
  }

  afterChangeProgram(new_user_program, new_remaining_organization_programs) {
    this.setState({
      user_program: new_user_program,
      remaining_organization_programs: new_remaining_organization_programs,
    });
  }
}
