import React from 'react';
import Tasks from './tasks';
import EvaluationSubject from './evaluation_subject';

import * as routes from 'config/routes';

require('../assets/profile.scss');

export default class ListSubjetcs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects,
    };
  }

  renderTeam(team) {
    if (team) {
      return (
        <span className='td-team-name'>
          {team.name}
        </span>
      );
    }
    else return null;
  }

  renderIcon(subject) {
    if (subject.tasks.length > 0) {
      return (
        <i className='fa fa-minus-circle td-icon' aria-hidden='true'
          onClick={this.handleClickIcon.bind(this)}></i>
      );
    }
    else {
      return (
        <i className='fa fa-plus-circle td-icon' aria-hidden='true'
          onClick={this.handleClickIcon.bind(this)}></i>
      );
    }
  }

  renderListSubjects(subjects) {
    return _.map(subjects, subject => {
      return (
        <div key={subject.id}
          className='td-profile-subject col-sm-12'>
          <h4 className={`inline-block td-collapse-${subject.id}`}
            data-target={`.td-list-tasks-${subject.id}`}
            data-toggle='collapse' onClick={this.handleClick.bind(this)}>
            {this.renderIcon(subject)}
            {subject.subject_name}
          </h4>
          {this.renderTeam(subject.team)}
          <Tasks subject={subject}/>
          <EvaluationSubject
            evaluation_subject={subject.evaluations}
          />
        </div>
      );
    });
  }

  handleClick(event) {
    let target = event.target;
    if ($(target).children('.td-icon').hasClass('fa-plus-circle')) {
      $(target).children('.td-icon').removeClass('fa-plus-circle');
      $(target).children('.td-icon').addClass('fa-minus-circle');
    }
    else if ($(target).children('.td-icon').hasClass('fa-minus-circle')) {
      $(target).children('.td-icon').removeClass('fa-minus-circle');
      $(target).children('.td-icon').addClass('fa-plus-circle');
    }
  }

  handleClickIcon(event) {
    let target = event.target;
    if ($(target).hasClass('fa-plus-circle')) {
      $(target).removeClass('fa-plus-circle');
      $(target).addClass('fa-minus-circle');
    }
    else if ($(target).hasClass('fa-minus-circle')) {
      $(target).removeClass('fa-minus-circle');
      $(target).addClass('fa-plus-circle');
    }
  }

  render() {
    return (
      <div className='clearfix td-list-subjects'>
        {this.renderListSubjects(this.state.subjects)}
      </div>
    );
  }
}
