import React from 'react';
import axios from 'axios';
import ListTabs from './list_tabs';

import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

export default class TeamsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      user_subjects: props.user_subjects,
      subject: props.subject,
      team: props.team,
      statuses: props.statuses,
      course: props.course,
      course_subjects: props.course_subjects,
      documents: props.documents,
      document_preview: {},
      subject_detail: props.team_detail
    }
  }

  render() {
    return (
      <div className='admin-subject-show'>
        <div className='row'>
          <div className='col-md-2'>
            <img src={this.props.subject.image.url}
              alt={I18n.t('subjects.alt_image')} className='image-subject' />
          </div>
          <div className='col-md-10'>
            <div className='subject-info col-md-9'>
              <h2 className='subject-name'>
                {this.props.subject.name}
              </h2>
              <div className='description'>
                {this.props.subject.description}
              </div>
              <div className='workings-day'>
                {I18n.t('subjects.headers.workings_day')}
                {this.props.subject.during_time}
                {I18n.t('subjects.headers.days')}
              </div>
              <div className='organization'>
                {I18n.t('subjects.headers.training_standard')}
                {this.props.training_standard.name}
              </div>
            </div>
            <div className='col-md-3 text-right'>
              <button type='button' className='btn btn-primary'
                onClick={this.afterClickAddTask.bind(this)}>
                {I18n.t('subjects.headers.add_task')}
              </button>
            </div>
          </div>
        </div>
        <ListTabs team={this.props.team} course={this.props.course}
          subject_detail={this.state.subject_detail}
          statuses={this.props.statuses} subject={this.props.subject}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.props.member_evaluations}
          user={this.state.user} user_index={this.state.user_index}
          afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
          handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
          handleAfterAddTask={this.handleAfterAddTask.bind(this)}
          afterCreateTask={this.afterCreateTask.bind(this)}
          onDocumentsDrop={this.onDocumentsDrop.bind(this)}
          handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
          clickPreviewDocument={this.clickPreviewDocument.bind(this)}
          documents={this.state.documents}
          document_preview={this.state.document_preview}
        />
      </div>
    );
  }

  afterClickAddTask(){
    this.setState({
      user: null
    })
    $('#modalAddTask').modal();
  }

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.team.id);
    formData.append('document[documentable_type]', 'Team');
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let documents_url = routes.documents_url();

    axios({
      url: documents_url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.handleDocumentUploaded(response.data.document);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  handleDocumentUploaded(document) {
    this.state.documents.push(document);
    this.setState({documents: this.state.documents});
  }

  handleDocumentDeleted(document) {
    this.setState({
      documents: this.state.documents.filter(item => item.id != document.id)
    });
  }

  clickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }

  afterAddTaskForUser(user, user_index) {
    this.setState({
      user: user,
      user_index: user_index
    })
    $('#modalUserTask').modal()
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    if (user) {
      _.remove(this.state.subject_detail.user_subjects[user_index]
        .user_course_task[type], ({task_id}) => task_id == index);
      this.state.subject_detail.course_subject_task[type].push(task)
      this.state.subject_detail.course_subject_task[type]
        .sort((obj1, obj2) => obj1.id - obj2.id);
    } else if (this.props.course) {
      _.remove(this.state.subject_detail.course_subject_task[type],
        ({task_id}) => task_id == index);
    }

    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleAfterAddTask(type, targetable_ids, targets, subject_detail, user_id, user_index) {
    if (user_id) {
      _.mapValues(targets, function(target) {
        subject_detail.user_subjects[user_index].user_course_task[type]
          .push(target);
      })
    } else {
      _.remove(this.state.subject_detail.course_subject_task[type], targetable => {
        return targetable_ids.indexOf(targetable.id) >= 0;
      });
      _.mapValues(targets, function(target){
        subject_detail.team_task[type].push(target)
      })
    }

    this.setState({
      subject_detail: subject_detail
    })
  }

  afterCreateTask(target, type, owner) {
    this.state.subject_detail.team_task[type].push(target);

    this.setState({
      subject_detail: this.state.subject_detail
    });
  }
}
