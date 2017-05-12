import axios from 'axios';
import React from 'react';
import * as routes from 'config/routes';

export default class ChangeStatuses extends React.Component {
  render() {
    const RenderButton = () => {
      if (this.props.course.status == 'finished' ||
        this.props.course_subject.status == 'finished') return null;
      if (this.props.status == 'init') {
        return (
          <button type='button' className='btn btn-primary'
            onClick={this.submitMultipleUserStatus.bind(this, "in_progress")}>
            &nbsp;{I18n.t('subjects.team_member.start_subject')}
          </button>
        );
      } else {
        return (
          <button type='button' className='btn btn-danger'
            onClick={this.submitMultipleUserStatus.bind(this, "finished")}>
            &nbsp;{I18n.t('subjects.team_member.finish_subject')}
          </button>
        );
      }
    }
    return (
      <div>
        <RenderButton />
      </div>
    );
  }

  submitMultipleUserStatus(status, event) {
    let formData = new FormData();
    let url = routes.change_status_user_subject_url();
    formData.append('object_type', this.props.object_type);
    formData.append('object_id', this.props.object_id);
    formData.append('user_subject[status]', status);
    formData.append('course_subject_id', this.props.course_subject.id);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: url + '.json',
      method: 'PUT',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      location.reload()
    })
    .catch(error => console.log(error));
  }
}
