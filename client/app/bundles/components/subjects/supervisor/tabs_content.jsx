import React from 'react';
import axios from 'axios';

import TeamList from '../team/team_list';
import UserSubjectList from '../user_subject_list';
import BlockTasks from '../block_tasks';
import Documents from './partials/documents';
import ModalPreviewDocument from '../../shareds/modal_preview_document';

import * as app_constants from 'constants/app_constants';

export default class TabsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      documents: props.subject_detail.documents,
      document_preview: {},
      course_subject_teams: props.course_subject_teams,
      member_evaluations: props.member_evaluations
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      documents: nextProps.subject_detail.documents,
      course_subject_teams: nextProps.course_subject_teams,
      member_evaluations: nextProps.member_evaluations
    });
  }

  render() {
    if(this.props.course) {
      return (
        <div className='tab-content'>
          <div id='tab-team-list' className='tab-pane fade in active'>
            <div className='col-md-12'>
              <TeamList course_subject={this.state.subject_detail.course_subject}
                course_subject_teams={this.state.course_subject_teams}
                handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
                unassigned_user_subjects={this.state.subject_detail
                  .user_subjects}
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
                  />
                </div>
              </div>
            </div>
          </div>
          <div id='tab-surveys' className='tab-pane fade'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.course_subject_task.surveys}
                title={I18n.t('subjects.titles.surveys')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='surveys'/>
            </div>
          </div>
          <div id='tab-assignments' className='tab-pane fade'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.course_subject_task.assignments}
                title={I18n.t('subjects.titles.assignments')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='assignments'/>
            </div>
          </div>
          <div id='tab-test-rules' className='tab-pane fade'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.course_subject_task.test_rules}
                title={I18n.t('subjects.titles.tests')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='test_rules'/>
            </div>
          </div>
          <div id='tab-documents' className='tab-pane fade'>
            <Documents
              documents={this.state.documents}
              onDocumentsDrop={this.onDocumentsDrop.bind(this)}
              handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
              clickPreviewDocument={this.clickPreviewDocument.bind(this)}/>
            <ModalPreviewDocument
              document_preview={this.state.document_preview}
              handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
            />
          </div>
          <div className='clearfix'></div>
        </div>
      );
    } else {
      return (
        <div className='tab-content'>
          <div id='tab-surveys' className='tab-pane fade in active'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.subject_task.surveys}
                title={I18n.t('subjects.titles.surveys')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='surveys'/>
            </div>
          </div>
          <div id='tab-assignments' className='tab-pane fade'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.subject_task.assignments}
                title={I18n.t('subjects.titles.assignments')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='assignments'/>
            </div>
          </div>
          <div id='tab-test-rules' className='tab-pane fade'>
            <div className='clearfix'>
              <BlockTasks
                tasks={this.state.subject_detail.subject_task.test_rules}
                title={I18n.t('subjects.titles.tests')}
                handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                type='test_rules'/>
            </div>
          </div>
          <div id='tab-documents' className='tab-pane fade'>
            <Documents
              documents={this.state.documents}
              onDocumentsDrop={this.onDocumentsDrop.bind(this)}
              handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
              clickPreviewDocument={this.clickPreviewDocument.bind(this)}/>
            <ModalPreviewDocument
              document_preview={this.state.document_preview}
              handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
            />
          </div>
          <div className='clearfix'></div>
        </div>
      );
    }
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    this.props.handleAfterDeleteTask(index, task, type, user_index, user);
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

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.subject_detail.id);
    formData.append('document[documentable_type]', 'Subject');
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = app_constants.APP_NAME + 'documents';

    axios({
      url: url,
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
}
