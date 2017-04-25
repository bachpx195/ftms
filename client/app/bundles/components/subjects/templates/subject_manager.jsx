import CreateProject from '../../projects/actions/create';
import Documents from '../../shareds/documents/documents';
import ModalPreviewDocument from '../../shareds/modal_preview_document';
import ModalCreateAssignment from './modal_create_assignment';
import ListTabs from '../supervisor/list_tabs';
import React from 'react';
import SubjectManagerInfo from  './subject_manager_info';
import SubjectPolicy from 'policy/subject_policy';

import * as routes from 'config/routes';

export default class SubjectManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_subject_teams: props.course_subject_teams,
      subject_detail: props.subject_detail,
      member_evaluations: props.member_evaluations,
      member_ids: props.member_ids,
      user_index: 0,
      meta_types: props.meta_types,
      documents: props.subject_detail.documents,
      document_preview: {}
    }
  }

  render() {
    let projects_url = routes.subject_projects_url(this.state.subject_detail.id);
    let add_task_button = null;
    if (this.props.course) {
      add_task_button = (
        <SubjectPolicy
          permit={
            [{action: ['owner'], target: 'children',
                data: {owner_id: this.props.course.owner_id}},
              {action: ['course_manager'], target: 'children',
                data: {members_ids: this.state.member_ids}}]}
        >
          <button type='button' className='btn btn-primary'
            onClick={this.afterClickAddTask.bind(this)}>
            {I18n.t('subjects.add_task_for_course_subject')}
          </button>
        </SubjectPolicy>
      );
    } else {
      add_task_button = (
        <button type='button' className='btn btn-primary'
          onClick={this.afterClickAddTask.bind(this)}>
          {I18n.t('subjects.add_task_for_course_subject')}
        </button>
      );
    }

    let user = null;
    if (this.props.course) {
      user = this.state.subject_detail.user_subjects[this.state.user_index];
    }

    let ownerable_id, ownerable_type = '';
    if (this.props.course) {
      ownerable_type = 'CourseSubject';
      ownerable_id = this.state.subject_detail.course_subject.id
    } else {
      ownerable_type = 'Subject';
      ownerable_id = this.props.subject.id
    }

    return (
      <div className='admin-subject-show clearfix'>
        <div className='row'>
          <div className='col-md-9 content-list'>
            <div className='box box-primary'>

              <div className='box-header with-border'>
                <SubjectManagerInfo subject_detail={this.state.subject_detail} />
              </div>
            </div>

            <ListTabs
              subject_detail={this.state.subject_detail}
              course={this.props.course} user={user}
              user_index={this.state.user_index}
              course_subject_teams={this.state.course_subject_teams}
              afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
              handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
              handleAfterAddTask={this.handleAfterAddTask.bind(this)}
              afterCreateTask={this.afterCreateTask.bind(this)}
              handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
              subject={this.props.subject}
              training_standard={this.props.training_standard}
              evaluation_template={this.props.evaluation_template}
              evaluation_standards={this.props.evaluation_standards}
              member_evaluations={this.state.member_evaluations} />

          </div>
          <div className="col-md-3">
            <div className='box box-primary'>
              <div className='box-header with-border box-header-gray'>
                {I18n.t("assignments.title_action")}
              </div>
              {add_task_button}
              <button type='button' className='btn btn-primary'
                onClick={this.onCreateAssignments.bind(this)}>
                {I18n.t("assignments.create_assignment")}
              </button>
            </div>

            <Documents
              document_type={'Subject'}
              documents={this.state.documents}
              documentable={this.props.subject}
              handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
              handlerAfterClickPreviewDocument={this.handlerAfterClickPreviewDocument.bind(this)}
            />
          </div>
        </div>

        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />

        <ModalCreateAssignment
          meta_types={this.state.meta_types}
          subject_detail={this.state.subject_detail}
          ownerable_id={ownerable_id}
          ownerable_type={ownerable_type}
          handleAfterCreatedAssignment={this.handleAfterCreatedAssignment.bind(this)}
        />
      </div>
    );
  }

  handleDocumentUploaded(document) {
    this.state.documents.push(document);
    this.setState({documents: this.state.documents});
  }

  handlerAfterClickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }

  handleDocumentDeleted(document) {
    this.setState({
      documents: this.state.documents.filter(item => item.id != document.id)
    });
  }

  handleAfterCreatedTeam(course_subject_teams, subject_detail) {
    this.setState({
      course_subject_teams: course_subject_teams,
      subject_detail: subject_detail
    });
  }

  onCreateAssignments(event) {
    $('.modal-create-assignment').modal();
  }

  afterClickAddTask() {
    this.setState({
      user: {}
    })
    $('#modalAddTask').modal();
  }

  afterAddTaskForUser(user, user_index) {
    this.setState({
      user: user,
      user_index: user_index
    })
    $('#modalUserTask').modal()
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    if (user) {
      _.remove(this.state.subject_detail.user_subjects[user_index]
        .user_course_task[type], ({task_id}) => task_id == index);
    } else if (this.props.course) {
      _.remove(this.state.subject_detail.course_subject_task[type],
        ({task_id}) => task_id == index);
    } else {
      _.remove(this.state.subject_detail.subject_task[type], ({task_id}) => {
        return task_id == index
      });
    }
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleAfterAddTask(type, targetable_ids, targets, subject_detail, user_id, user_index) {
    if (this.props.course) {
      if (user_id) {
        _.mapValues(targets, function(target) {
          subject_detail.user_subjects[user_index].user_course_task[type].push(target)
        })
      } else {
        _.mapValues(targets, function(target){
          subject_detail.course_subject_task[type].push(target)
        })
      }
    } else {
      _.mapValues(targets, function(target) {
        subject_detail.subject_task[type].push(target)
      })
    }
    this.setState({
      subject_detail: subject_detail
    })
  }

  afterCreateTask(target, type, owner) {
    if (owner == 'CourseSubject') {
      this.state.subject_detail.course_subject_task[type].push(target);
    } else {
      this.state.subject_detail.subject_task[type].push(target);
    }
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleAfterCreatedAssignment(target) {
    this.state.subject_detail.course_subject_task.assignments.push(target);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }
}
