import React from 'react';
import UserSubjectList from '../subjects/user_subject_list';
import BlockTasks from '../subjects/block_tasks';
import Documents from './partials/documents';
import ModalPreviewDocument from '../shareds/modal_preview_document';

export default class TabsContent extends React.Component {
  render() {
    return (
      <div className='tab-content'>
        <div id='user-subject' className='tab-pane fade in active'>
          <div className='col-md-12'>
            <div className='box box-success'>
              <div className='box-body'>
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
              </div>
            </div>
          </div>
        </div>
        <div id='surveys' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.surveys}
              title={I18n.t('subjects.titles.surveys')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='surveys'/>
          </div>
        </div>
        <div id='assignments' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.assignments}
              title={I18n.t('subjects.titles.assignments')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='assignments'/>
          </div>
        </div>
        <div id='test-rules' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.test_rules}
              title={I18n.t('subjects.titles.tests')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='test_rules'/>
          </div>
        </div>
        <div id='projects' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.projects}
              title={I18n.t('subjects.titles.tests')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='test_rules'/>
          </div>
        </div>
        <div id='tab-documents' className='tab-pane fade'>
          <Documents
            documents={this.props.documents}
            onDocumentsDrop={this.props.onDocumentsDrop}
            handleDocumentDeleted={this.props.handleDocumentDeleted}
            clickPreviewDocument={this.props.clickPreviewDocument}/>
          <ModalPreviewDocument
            document_preview={this.props.document_preview}
            handleDocumentDeleted={this.props.handleDocumentDeleted}
          />
        </div>
        <div className='clearfix'></div>
      </div>
    );
  }
}
