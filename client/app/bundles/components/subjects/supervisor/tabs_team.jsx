import React from 'react';
import TeamList from '../team/team_list';
import UserSubjectList from '../user_subject_list';

export default class TabsTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      course_subject_teams: props.course_subject_teams,
      member_evaluations: props.member_evaluations,
      tabs_group_focus: props.tabs_group_focus
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      course_subject_teams: nextProps.course_subject_teams,
      member_evaluations: nextProps.member_evaluations,
      tabs_group_focus: nextProps.tabs_group_focus
    });
  }

  renderHeaders() {
    return (
      <ul className='nav nav-tabs pull-left'>
        <li className='active'>
          <a data-toggle='tab' href='#tab-team-list'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-list-alt'></i>
              {I18n.t('subjects.titles.list_team')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-user-subject-list'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-ban'></i>
              {I18n.t('subjects.titles.unassigned_members')}
            </div>
          </a>
        </li>
      </ul>
    );
  }

  renderContents() {
    return (
      <div className='tab-content'>
        <div id='tab-team-list' className='tab-pane fade in active'>
          <div className='col-md-12'>
            <TeamList course_subject={this.state.subject_detail.course_subject}
              course_subject_teams={this.state.course_subject_teams}
              handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
              unassigned_user_subjects={this.state.subject_detail
                .user_subjects}
              owner_id={this.props.course.owner_id}
            />
          </div>
        </div>
        <div id='tab-user-subject-list' className='tab-pane fade'>
          <div className='col-md-12'>
            <div className='box box-success'>
              <div className='box-body'>
                <UserSubjectList statuses={this.state.subject_detail.statuses}
                  user_subjects={this.state.subject_detail.user_subjects}
                  afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
                  course={this.props.course} subject={this.props.subject}
                  training_standard={this.props.training_standard}
                  evaluation_template={this.props.evaluation_template}
                  evaluation_standards={this.props.evaluation_standards}
                  member_evaluations={this.state.member_evaluations}
                  owner_id={this.props.course.owner_id}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='clearfix'></div>
      </div>
    );
  }

  renderMember(user) {
    return (
      <li className='member-item' key={user.id}>
        <img className='img-circle' title={user.name}
          src={user.avatar.url} width='40' height='40'/>
      </li>
    )
  }

  renderSidebar() {
    let members = this.state.subject_detail.course_member.slice(0, 5);
    return (
      <a className='btn btn-success button-change-group-focus'>
        {I18n.t("subjects.titles.members")}
        <ul>
          {
            members.map((user, index) => {
              return this.renderMember(user);
            })
          }
        </ul>
      </a>
    )
  }

  render() {
    if (this.state.tabs_group_focus == 1) {
      return (
        <div className='flex-big'>
          <div className='blocks'>
            <div className='col-md-12'>
              {this.renderHeaders()}
            </div>
            {this.renderContents()}
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex-small'
          onClick={this.changeTabsGroupFocus.bind(this)}>
          {this.renderSidebar()}
        </div>
      )
    }
  }

  changeTabsGroupFocus(event) {
    event.preventDefault();
    this.props.changeTabsGroupFocus(1);
  }

  handleAfterCreatedTeam(team) {
    this.state.course_subject_teams.push(team);
    let user_subjects = this.state.subject_detail.user_subjects
      .filter(user_subject => {
      return team.user_subjects.findIndex(_user_subject => {
        return _user_subject.id == user_subject.id
      }) < 0;
    });
    Object.assign(this.state.subject_detail, {user_subjects});
    this.props.handleAfterCreatedTeam(this.state.course_subject_teams,
      this.state.subject_detail);
  }

  afterAddTaskForUser(user, user_index) {
    this.props.afterAddTaskForUser(user, user_index);
  }
}
