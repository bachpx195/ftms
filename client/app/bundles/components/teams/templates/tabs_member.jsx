import React from 'react';
import UserSubjectList from '../../subjects/user_subject_list';

export default class TabsMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs_group_focus: props.tabs_group_focus
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tabs_group_focus: nextProps.tabs_group_focus
    });
  }

  renderContents() {
    return (
      <UserSubjectList
        user_subjects={this.props.subject_detail.user_subjects}
        statuses={this.props.statuses}
        team={this.props.team}
        course={this.props.course}
        subject={this.props.subject}
        training_standard={this.props.training_standard}
        evaluation_template={this.props.evaluation_template}
        evaluation_standards={this.props.evaluation_standards}
        member_evaluations={this.props.member_evaluations}
        afterAddTaskForUser={this.props.afterAddTaskForUser}
      />
    )
  }

  renderMember(user) {
    return (
      <li className='member-item' key={user.id}>
        <img className='img-circle' title={user.user_name}
          src={user.user_avatar.url} width='40' height='40'/>
      </li>
    )
  }

  renderSidebar() {
    let members = this.props.subject_detail.user_subjects.slice(0, 5);
    return (
      <a className='btn btn-success button-change-group-focus'>
      <h4 className='side-bar-title'>
        {I18n.t('subjects.titles.members')}
      </h4>
        {this.props.subject_detail.user_subjects.length}
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
    if (this.state.tabs_group_focus == 2) {
      return (
        <div className='flex-big'>
          <div className='blocks'>
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
    this.props.changeTabsGroupFocus(2);
  }
}
