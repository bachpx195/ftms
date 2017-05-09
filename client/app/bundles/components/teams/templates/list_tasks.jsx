import React from 'react';

export default class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      static_tasks: props.static_tasks,
      checked_tasks: props.checkedTasks
    };
  }

  componentWillReceiveProps(nextProps) {
    let filter = $('#filter-' + this.props.className).val();
    let static_tasks = nextProps
      .static_tasks.filter(static_assignment => {
      return static_assignment.name.toLowerCase().includes(filter.toLowerCase());
    });
    this.setState({static_tasks: this.state.static_tasks});
    this.setState({
      static_tasks: static_tasks,
      checked_tasks: nextProps.checkedTasks
    });
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading text-center">
          {this.props.title}
        </div>
        <div className="panel-body">
          <input className="form-control search_form"
            id={`filter-${this.props.className}`}
            placeholder={I18n.t('courses.search_user')}
            autoComplete="off" onChange={this.filterTasks.bind(this)} />
          <div className={`list-group ${this.props.className}`}>
            {this.renderTasks()}
          </div>
          <div className="panel-footer count-member">
            {I18n.t('courses.labels.records',
              {count: this.state.static_tasks.length})}
          </div>
        </div>
      </div>
    );
  }

  renderTasks() {
    return this.state.static_tasks.map((static_task, index) => {
      let checked = this.state.checked_tasks.indexOf(static_task) >= 0;
      return <li key={`${this.props.className}-${index}`}
        className={`list-group-item ${checked ? 'active' : ''}`}
        onClick={this.handleClickTask.bind(this, static_task, checked)}>
        <span className={`glyphicon
          glyphicon-${checked ? 'check' : 'unchecked'} check-icon`} />
        {static_task.name}
      </li>;
    });
  }

  handleClickTask(static_task, checked) {
    this.props.handleClickTask(static_task, checked);
  }

  filterTasks(event) {
    let value = event.target.value;
    this.state.static_tasks =
      this.props.static_tasks.filter(static_task => {
      return static_task.name.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({users: this.state.static_tasks });
  }
}
