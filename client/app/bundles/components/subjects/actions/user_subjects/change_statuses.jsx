import axios from 'axios';
import React from 'react';
import * as routes from 'config/routes';

export default class ChangeStatuses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      object_type: props.object_type,
      object_id: props.object_id,
      course_subject_id: props.course_subject_id,
      status: props.status
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      object_type: nextProps.object_type,
      object_id: nextProps.object_id,
      course_subject_id: nextProps.course_subject_id,
      status: nextProps.status
    })
  }

  render() {
    const RenderButton = () => {
      if (this.props.course.status == 'finished') return null;
      if (this.state.status == 'init') {
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
    formData.append('object_type', this.state.object_type);
    formData.append('object_id', this.state.object_id);
    formData.append('user_subject[status]', status);
    formData.append('course_subject_id', this.state.course_subject_id);
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
