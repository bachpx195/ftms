import React from 'react';
import TeamList from '../subjects/team/team_list';
import UserSubjectList from '../subjects/user_subject_list';
import ModalBody from '../subjects/subject_form/modalBody';
import ModalTask from '../subjects/subject_form/modalTask';

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
      course_subjects: props.course_subjects
    }
  }

  render() {
    let list_blocks = (
      <div className='blocks'>
        <ul className='nav nav-tabs tab-bar'>
          <li className='active'>
            <a data-toggle='tab' href='#user-subject'>
              <i className='fa fa-file-text-o'></i>
                {this.state.team.name}
            </a>
          </li>
        </ul>
        <div className='tab-content'>
          <div id='user-subject' className='tab-pane fade in active'>
            <div className='col-md-12'>
              <div className='box box-success'>
                <div className='box-body'>
                  <UserSubjectList
                    user_subjects={this.state.user_subjects}
                    statuses={this.state.statuses}
                    team={this.state.team}
                    course={this.state.course}
                    course_subjects={this.state.course_subjects}
                    subject={this.state.subject}
                    training_standard={this.props.training_standard}
                    evaluation_template={this.props.evaluation_template}
                    evaluation_standards={this.props.evaluation_standards}
                    member_evaluations={this.props.member_evaluations}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    )
    return (
      <div className='admin-subject-show'>
        <div className='row'>
          <div className='col-md-2'>
            <img src={this.state.subject.image.url}
              alt={I18n.t('subjects.alt_image')} className='image-subject' />
          </div>
          <div className='col-md-10'>
            <div className='subject-info col-md-9'>
              <h2 className='subject-name'>
                {this.state.subject.name}
              </h2>
              <div className='description'>
                {this.state.subject.description}
              </div>
              <div className='workings-day'>
                {I18n.t('subjects.headers.workings_day')}
                {this.state.subject.during_time}
                {I18n.t('subjects.headers.days')}
              </div>
              <div className='organization'>
                {I18n.t('subjects.headers.training_standard')}
                {this.state.training_standard.name}
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
        {list_blocks}
      </div>
    );
  }

  afterClickAddTask(){
    this.setState({
      user: ''
    })
    $('#modalAddTask').modal();
  }
}
