import CoursePolicy from 'policy/course_policy';
import Managers from './managers';
import Members from './members';
import React from 'react';
import ModalPreviewDocument from 'shared/modal_preview_document';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: props.subject_detail.course_member,
      managers: props.subject_detail.course_managers,
      subject_detail: props.subject_detail
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail
    });
  }

  render() {
    let user_count = this.state.managers.length + this.state.members.length;
    return (
      <div className='info-panel clearfix'>
        <div className='box box-primary box-border'>
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
