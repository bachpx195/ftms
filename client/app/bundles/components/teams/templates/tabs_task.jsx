import BlockTasks from '../../subjects/block_tasks';
import Documents from './documents';
import ModalPreviewDocument from '../../shareds/modal_preview_document';
import React from 'react';

export default class TabsTask extends React.Component {
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

  renderHeaders() {
    return (
      <ul className='nav nav-tabs pull-left'>
        <li className='active'>
          <a data-toggle='tab' href='#tab-assignments'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-file-word-o'></i>
              {I18n.t('subjects.titles.assignments')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-surveys'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-file-excel-o'></i>
              {I18n.t('subjects.titles.surveys')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-test-rules'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-check-square-o'></i>
              {I18n.t('subjects.titles.tests')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-projects'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-folder-open'></i>
              {I18n.t('subjects.titles.projects')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-documents'>
            <i className='fa fa-file-pdf-o'></i>
            {I18n.t('subjects.titles.documents')}
          </a>
        </li>
      </ul>
    );
  }

  renderContents() {
    return (
      <div className='tab-content'>
        <div id='tab-assignments' className='tab-pane fade in active'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.assignments}
              title={I18n.t('subjects.titles.assignments')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='assignments'/>
          </div>
        </div>
        <div id='tab-surveys' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.surveys}
              title={I18n.t('subjects.titles.surveys')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='surveys'/>
          </div>
        </div>
        <div id='tab-test-rules' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.test_rules}
              title={I18n.t('subjects.titles.tests')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='test_rules'/>
          </div>
        </div>
        <div id='tab-projects' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              tasks={this.props.subject_detail.team_task.projects}
              title={I18n.t('subjects.titles.tests')}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='projects'/>
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

  renderSidebar() {
    let surveys_count = this.props.subject_detail.team_task.surveys.length;
    let assignments_count = this.props.subject_detail.team_task.assignments.length;
    let tests_count = this.props.subject_detail.team_task.test_rules.length;
    let projects_count = this.props.subject_detail.team_task.projects.length;

    return (
      <a className='btn btn-success button-change-group-focus'>
        <h4 className='side-bar-title'>
          {I18n.t('subjects.titles.tasks')}
        </h4>
        <ul>
          <li className='statistic-item'>
            {I18n.t('teams.titles.surveys')}
            <p className='many-member text-center'>
              {surveys_count}
            </p>
          </li>
          <li className='statistic-item'>
            {I18n.t('teams.titles.assignments')}
            <p className='many-member text-center'>
              {assignments_count}
            </p>
          </li>
          <li className='statistic-item'>
            {I18n.t('teams.titles.tests')}
            <p className='many-member text-center'>
              {tests_count}
            </p>
          </li>
          <li className='statistic-item'>
            {I18n.t('teams.titles.projects')}
            <p className='many-member text-center'>
              {projects_count}
            </p>
          </li>
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
}
