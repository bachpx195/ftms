import React from 'react';

export default class SubjectItem extends React.Component {
  render() {
    return (
      <div className='subject-item'>
        <p className='list-group-item' data-toggle='collapse'
          data-target={`.subject-${this.props.subject.id}`}
          onClick={this.onClickSubjectItem.bind(this)}>
          <i>{this.props.index}.</i> {this.props.subject.name}
          <span className='pull-right'>
            <i className='fa fa-chevron-right'></i>
          </span>
        </p>
        <div
          className={`list-group collapse subject-${this.props.subject.id}`}>
          <p>{I18n.t('courses.assignment_notice',
            {count_assignment: this.props.subject.assignments.length})}</p>
          {this.renderAssignments()}
        </div>
      </div>
    );
  }

  renderAssignments() {
    return this.props.subject.assignments.map((assignment, index) => {
      return <p key={index} className='list-group-item'>
        <i>{index + 1}.</i> {assignment.name}
      </p>;
    });
  }

  onClickSubjectItem(event) {
    let $target = $(event.target);
    if ($target.hasClass('collapsed')) {
      $('.fa-chevron-down', $target).removeClass('fa-chevron-down')
        .addClass('fa-chevron-right');
    } else {
      $('.fa-chevron-right', $target).removeClass('fa-chevron-right')
        .addClass('fa-chevron-down');
    }
  }
}
