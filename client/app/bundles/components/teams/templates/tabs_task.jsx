import BlockTasks from '../../subjects/block_tasks';
import Documents from './documents';
import ModalPreviewDocument from '../../shareds/modal_preview_document';
import React from 'react';
import ModalCreateTasks from '../../subjects/managers/templates/modal_create_tasks';

export default class TabsTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs_group_focus: props.tabs_group_focus,
      type: '',
      meta_types: props.meta_types
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
      </ul>
    );
  }

  renderContents() {
    let ownerable_id, ownerable_type, tasks = '';
    if (this.props.team) {
      ownerable_type = 'Team';
      ownerable_id = this.props.team.id;
    } else if (this.props.course) {
      ownerable_type = 'CourseSubject';
      ownerable_id = this.state.subject_detail.course_subject.id;
    } else {
      ownerable_type = 'Subject';
      ownerable_id = this.props.subject.id;
    }

    return (
      <div className='tab-content'>
        <div id='tab-assignments' className='tab-pane fade in active'>
          <div className='clearfix'>
            <BlockTasks
              course={this.props.course}
              course_subject={this.props.subject_detail.course_subject}
              tasks={this.props.subject_detail.tasks.assignments}
              title={I18n.t('subjects.titles.assignments')}
              handleChooseType={this.props.handleChooseType}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='assignments'
              handleChooseType={this.handleChooseType.bind(this)} />
          </div>
        </div>
        <div id='tab-surveys' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              course={this.props.course}
              course_subject={this.props.subject_detail.course_subject}
              tasks={this.props.subject_detail.tasks.surveys}
              title={I18n.t('subjects.titles.surveys')}
              handleChooseType={this.props.handleChooseType}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='surveys'
              handleChooseType={this.handleChooseType.bind(this)} />
          </div>
        </div>
        <div id='tab-test-rules' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              course={this.props.course}
              course_subject={this.props.subject_detail.course_subject}
              tasks={this.props.subject_detail.tasks.test_rules}
              title={I18n.t('subjects.titles.tests')}
              handleChooseType={this.props.handleChooseType}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='test_rules'
              handleChooseType={this.handleChooseType.bind(this)} />
          </div>
        </div>
        <div id='tab-projects' className='tab-pane fade'>
          <div className='clearfix'>
            <BlockTasks
              course={this.props.course}
              course_subject={this.props.subject_detail.course_subject}
              location='team'
              tasks={this.props.subject_detail.tasks.projects}
              title={I18n.t('subjects.titles.tests')}
              handleChooseType={this.props.handleChooseType}
              handleAfterDeleteTask={this.props.handleAfterDeleteTask}
              type='projects'
              handleChooseType={this.handleChooseType.bind(this)} />
          </div>
        </div>
        <div className='clearfix'></div>
        <ModalCreateTasks
          meta_types={this.state.meta_types}
          subject_detail={this.props.subject_detail}
          ownerable_id={ownerable_id}
          ownerable_type={ownerable_type}
          subject={this.props.subject}
          type={this.state.type}
          handleAfterCreatedTasks={this.props.handleAfterCreatedTasks}
          team={this.props.team}
        />
      </div>
    );
  }

  handleChooseType(type) {
    this.setState({type: type});
  }

  renderSidebar() {
    let surveys_count = this.props.subject_detail.tasks.surveys.length;
    let assignments_count = this.props.subject_detail.tasks.assignments.length;
    let tests_count = this.props.subject_detail.tasks.test_rules.length;
    let projects_count = this.props.subject_detail.tasks.projects.length;

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
