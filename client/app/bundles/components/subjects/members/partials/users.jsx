import CoursePolicy from 'policy/course_policy';
import Managers from './managers';
import Members from './members';
import React from 'react';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: this.props.members,
      managers: this.props.managers
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      members: nextProps.members,
      managers: nextProps.managers
    });
  }

  render() {
    let user_count = this.state.managers.length + this.state.members.length;
    return (
      <div className='info-panel clearfix'>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t('courses.member.title')}
            </h3>
            <span className='badge label-primary'>
              {user_count}
            </span>
          </div>

          <div className='box-body'>
            <div>
              <div className='member-title'>
                {I18n.t('courses.member.trainers')}
              </div>
              <ul className='user-list clearfix'>
                <Managers managers={this.state.managers} />
              </ul>
              <div className='member-title'>
                {I18n.t('courses.member.trainee')}
              </div>
              <Members members={this.state.members} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
