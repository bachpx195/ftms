import axios from 'axios';
import AboutBox from './templates/show_partials/about_box';
import BasicInfoBox from './templates/show_partials/basic_info_box';
import CustomPolicy from 'policy/course_policy';
import ModalChangeProgram from './change_program/modal';
import ProfileTabPane from './templates/show_partials/profile_tab_pane';
import React from 'react';
import TimelineTabPane from './templates/show_partials/timeline_tab_pane';
import RolesBox from './templates/show_partials/roles_box';
import * as routes from 'config/routes';
import ShowBreadCrumb from '../profiles/templates/bread_crumbs/show';

require('../../assets/sass/user.scss');

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

  componentDidMount() {
    load_timeline();
  }

  renderChangeProgramModal(){
    if (this.state.user_program) {
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
    let btn_change_program = <tr></tr>;
    if (this.state.user_program) {
      btn_change_program = <div className='btn btn-primary'
        onClick={this.handleChangeProgram.bind(this)}>
        {I18n.t('users.buttons.change_program')}
      </div>;
    }

    return(
      <div className='user-profile row clearfix'>
        <ShowBreadCrumb
          user={this.state.user_detail}
        />

        <div className='col-md-12'>
          <div className='col-md-3'>
            <BasicInfoBox user_detail={this.state.user_detail}
              user={this.props.user}
            />
           <AboutBox user_profile={this.state.user_profile} />
          </div>
          <div className='col-md-9'>
            <div className='nav-tabs-custom'>
              <ul className='nav nav-tabs nav-user'>
                <li className='active'><a href='#timeline' data-toggle='tab'>Timeline</a></li>
                <li><a href='#activites' data-toggle='tab'>Activities</a></li>
                <li><a href='#profile' data-toggle='tab'>Profile</a></li>
              </ul>
              <div className='tab-content'>
                <TimelineTabPane
                  user_id={this.state.user_detail.id}
                />
                <ProfileTabPane user_profile={this.state.user_profile}
                  user_detail={this.state.user_detail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleAfterUpdated(new_user) {
    this.setState({
      user_detail: new_user
    })
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
