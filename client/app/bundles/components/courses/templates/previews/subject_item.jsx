import React from 'react';

export default class SubjectItem extends React.Component {
  constructor(props) {
    super(props);
    let assignments = props.subject.assignments || [];
    let surveys = props.subject.surveys || [];
    let all_tasks = [...assignments, ...surveys];

    this.state = {
      all_tasks: all_tasks,
    }
  }

  componentWillReceiveProps(nextProps) {
    let assignments = nextProps.subject.assignments || [];
    let surveys = nextProps.subject.surveys || [];
    let all_tasks = [...assignments, ...surveys];

    this.setState({
      all_tasks: all_tasks,
    });
  }

  render() {
    return (
      <div className='subject-item'>
        <p className='list-group-item' data-toggle='collapse'
          data-index={this.props.index}
          data-target={`.subject-${this.props.subject.id}`}
          onClick={this.onClickSubjectItem.bind(this)}>
          <i>{this.props.index + 1}.</i> {this.props.subject.name}
          <span className='pull-right'>
            <i className='fa fa-chevron-right'></i>
          </span>
        </p>
        <div
          className={`list-group collapse subject-${this.props.subject.id}`}>
          <p>{I18n.t('courses.assignment_notice',
            {count_assignment: this.state.all_tasks.length})}</p>
          {this.renderAssignments()}
        </div>
      </div>
    );
  }

  renderAssignments() {
    return this.state.all_tasks.map((task, index) => {
      return <p key={index} className='list-group-item'
        data-subject={this.props.index} data-index={index}
        onClick={this.onClickTaskItem.bind(this)}>
        <i>{index + 1}.</i> {task.name}
      </p>;
    });
  }

  onClickTaskItem(event) {
    let $target = $(event.target);
    let subject_index = $target.data('subject');
    let task_index = $target.data('index');
    this.props.handleTaskDetails(subject_index, task_index);
  }

  onClickSubjectItem(event) {
    let $target = $(event.target);
    let index = $target.data('index');
    this.props.handleSubjectDetails(index);

    if ($target.hasClass('collapsed')) {
      $('.fa-chevron-down', $target).removeClass('fa-chevron-down')
        .addClass('fa-chevron-right');
    } else {
      $('.fa-chevron-right', $target).removeClass('fa-chevron-right')
        .addClass('fa-chevron-down');
    }
  }
}
