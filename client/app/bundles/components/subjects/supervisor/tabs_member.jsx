import React from 'react';
import TeamList from '../team/team_list';
import UserSubjectList from '../user_subject_list';
import BlockTasks from '../block_tasks';

export default class TabsMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      tabs_group_focus: props.tabs_group_focus
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      tabs_group_focus: nextProps.tabs_group_focus
    });
  }

  renderHeaders() {
    return (
      <ul className='nav nav-tabs pull-left'>
        <li className='active'>
          <a data-toggle='tab' href='#tab-surveys'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-file-text-o'></i>
              {I18n.t('subjects.titles.surveys')}
            </div>
          </a>
        </li>
        <li>
          <a data-toggle='tab' href='#tab-assignments'>
            <div className='custom-subjects-titles'>
              <i className='fa fa-pencil-square-o'></i>
              {I18n.t('subjects.titles.assignments')}
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
      </ul>
    );
  }

  renderContents() {
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

        <div className='clearfix'></div>
      </div>
    );
  }

  renderSidebar() {
    let surveys_count = this.state.subject_detail.subject_task.surveys.length;
    let assignments_count = this.state.subject_detail.subject_task.assignments.length;
    let tests_count = this.state.subject_detail.subject_task.test_rules.length;
    return (
      <a className='btn btn-success button-change-group-focus'>
        <h4 className='side-bar-title'>
          {I18n.t("subjects.titles.tasks")}
        </h4>
        <ul>
          <li className='statistic-item'>
            {I18n.t("subjects.titles.surveys")}
            <p className="many-member text-center">
              {surveys_count}
            </p>
          </li>
          <li className='statistic-item'>
            {I18n.t("subjects.titles.assignments")}
            <p className="many-member text-center">
              {assignments_count}
            </p>
          </li>
          <li className='statistic-item'>
            {I18n.t("subjects.titles.tests")}
            <p className="many-member text-center">
              {tests_count}
            </p>
          </li>
        </ul>
      </a>
    )
  }

  render() {
    if (this.state.tabs_group_focus == 2) {
      return (
        <div className="flex-big">
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
    this.props.changeTabsGroupFocus(2);
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    this.props.handleAfterDeleteTask(index, task, type, user_index, user);
  }
}
