import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class ProfileTabPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    let division, join_div_date, naitei_company,
      finish_training_date, leave_date = <tr></tr>;
    if (this.props.user_profile.division) {
      division = <tr>
        <td>{I18n.t('users.profile_detail.division')}</td>
        <td>{this.props.user_profile.division.name}</td>
      </tr>;
    }

    if (this.props.user_profile.join_div_date) {
      join_div_date = <tr>
        <td>{I18n.t('users.profile_detail.join_div_date')}</td>
        <td>{this.props.user_profile.join_div_date}</td>
      </tr>;
    }

    if (this.props.user_profile.naitei_company) {
      naitei_company = <tr>
        <td>{I18n.t('users.profile_detail.naitei_company')}</td>
        <td>{this.props.user_profile.naitei_company}</td>
      </tr>;
    }

    if (this.props.user_profile.finish_training_date) {
      finish_training_date = <tr>
        <td>{I18n.t('users.profile_detail.finish_training_date')}</td>
        <td>{this.props.user_profile.finish_training_date}</td>
      </tr>;
    }

    if (this.props.user_profile.leave_date) {
      leave_date = <tr>
        <td>{I18n.t('users.profile_detail.leave_date')}</td>
        <td>{this.props.user_profile.leave_date}</td>
      </tr>;
    }
    return(
      <div className='tab-pane profile-container clearfix' id='profile'>
        <div className='col-md-6'>
          <div className='box'>
            <table className='table table-user-information'>
              <tbody>
                <tr>
                  <td>{I18n.t('users.name')}</td>
                  <td>{this.props.user_detail.name}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.email')}</td>
                  <td>{this.props.user_detail.email}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.university')}</td>
                  <td>{this.props.user_profile.university ?
                    this.props.user_profile.university.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.working_day')}</td>
                  <td>{this.props.user_profile.working_day || ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.user_status')}</td>
                  <td>{this.props.user_profile.user_status ?
                    this.props.user_profile.user_status.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.graduation')}</td>
                  <td>{this.props.user_profile.graduation || ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.ready_for_project')}</td>
                  <td>{this.props.user_profile.ready_for_project || ''}
                  </td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.start_training_date')}</td>
                  <td>{this.props.user_profile.start_training_date || ''}</td>
                </tr>
                {finish_training_date}
                {leave_date}
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='box'>
            <table className='table table-user-information'>
              <tbody>
                <tr>
                  <td>{I18n.t('users.profile_detail.organization')}</td>
                  <td>{this.props.user_profile.organization ?
                    this.props.user_profile.organization.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.program')}</td>
                  <td>{this.props.user_profile.program ?
                    this.props.user_profile.program.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.staff_code')}</td>
                  <td>{this.props.user_profile.staff_code || ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.language')}</td>
                  <td>{this.props.user_profile.language ?
                    this.props.user_profile.language.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.trainee_type')}</td>
                  <td>{this.props.user_profile.trainee_type ?
                    this.props.user_profile.trainee_type.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.stage')}</td>
                  <td>{this.props.user_profile.stage ?
                    this.props.user_profile.stage.name : ''}</td>
                </tr>
                <tr>
                  <td>{I18n.t('users.profile_detail.contract_date')}</td>
                  <td>{this.props.user_profile.contract_date || ''}</td>
                </tr>
                {division}
                {join_div_date}
                {naitei_company}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
