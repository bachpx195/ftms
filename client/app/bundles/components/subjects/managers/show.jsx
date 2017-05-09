import * as routes from 'config/routes';
import axios from 'axios';
import Documents from '../../shareds/documents/documents';
import ListTabs from '../supervisor/list_tabs';
import ModalAssignTask from './templates/modal_assign_task';
import ModalPreviewDocument from '../../shareds/modal_preview_document';
import ModalCreateTasks from './templates/modal_create_tasks';
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumb/show';
import SubjectManagerInfo from  './templates/subject_manager_info';
import SubjectPolicy from 'policy/subject_policy';

const SUBJECT_TASKS_URL = routes.subject_tasks_url();

export default class SubjectManagerShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      training_standard: props.training_standard,
      evaluation_template: props.evaluation_template,
      evaluation_standards: props.evaluation_standards,
      organizations: props.organizations,
      course_subject_teams: props.subject_detail.course_subject_teams,
      subject_detail: props.subject_detail,
      member_evaluations: props.member_evaluations,
      member_ids: props.member_ids,
      user_index: 0,
      meta_types: props.meta_types,
      documents: props.subject_detail.documents,
      document_preview: {},
      type: '',
    }
  }

  render() {
    let user = null;
    if (this.props.course) {
      user = this.state.subject_detail.user_subjects[this.state.user_index];
    }

    let ownerable_id, ownerable_type, tasks, remain_tasks = '';
    let breadcumb;
    if (this.props.course) {
      ownerable_type = 'CourseSubject';
      ownerable_id = this.state.subject_detail.course_subject.id;
      breadcumb = (
        <ShowBreadCrumb
          course={this.props.course}
          program={this.state.subject_detail.program}
          organization={this.state.subject_detail.organization}
          subject={this.props.subject_detail}
        />
      )
    } else {
      ownerable_type = 'Subject';
      ownerable_id = this.props.subject.id;
      breadcumb = (
        <ShowBreadCrumb
          organization={this.state.subject_detail.organization}
          subject={this.props.subject_detail}
        />
      )
    }
    tasks = this.state.subject_detail.tasks;
    remain_tasks = this.state.subject_detail.remain_tasks;

    return (
      <div className='admin-subject-show clearfix'>
        <ShowBreadCrumb
          course={this.props.course}
          program={this.state.subject_detail.program}
          organization={this.state.subject_detail.organization}
          subject={this.props.subject_detail}
        />
        <div className='row'>
          <div className='col-md-9 content-list'>
            <div className='box box-primary'>

              <div className='box-header with-border'>
                <SubjectManagerInfo subject_detail={this.state.subject_detail}/>
              </div>
            </div>

            <ListTabs
              type={this.state.type}
              subject_detail={this.state.subject_detail}
              course={this.props.course} user={user}
              user_index={this.state.user_index}
              course_subject_teams={this.state.course_subject_teams}
              subject={this.props.subject}
              training_standard={this.props.training_standard}
              evaluation_template={this.props.evaluation_template}
              evaluation_standards={this.props.evaluation_standards}
              member_evaluations={this.state.member_evaluations}
              handleChooseType={this.handleChooseType.bind(this)}
              afterCreateTask={this.afterCreateTask.bind(this)}
              handleAfterAddTask={this.handleAfterAddTask.bind(this)}
              afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
              handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
              handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
            />

          </div>
          <div className="col-md-3">
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

        <ModalCreateTasks
          meta_types={this.state.meta_types}
          subject_detail={this.state.subject_detail}
          ownerable_id={ownerable_id}
          ownerable_type={ownerable_type}
          subject={this.props.subject}
          type={this.state.type}
          handleAfterCreatedTasks={this.handleAfterCreatedTasks.bind(this)}
        />

        <ModalAssignTask
          remain_tasks={remain_tasks}
          type={this.state.type}
          ownerable_id={ownerable_id}
          ownerable_type={ownerable_type}
          handleAfterAssignTask={this.handleAfterAssignTask.bind(this)}
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

  afterAddTaskForUser(user, user_index) {
    this.setState({
      user: user,
      user_index: user_index
    })
    $('.modalUserTask').modal()
  }

  handleAfterDeleteTask(index, task, type) {
    _.remove(this.state.subject_detail.tasks[type], ({task_id}) => task_id == index)
    this.state.subject_detail.remain_tasks[type].push(task);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterAddTask(type, targetable_ids, targets, subject_detail, user_id, user_index) {
    if (this.props.course) {
      if (user_id) {
        _.mapValues(targets, function(target) {
          subject_detail.user_subjects[user_index].tasks[type].push(target)
        })
      } else {
        _.mapValues(targets, function(target){
          subject_detail.tasks[type].push(target)
        })
      }
    } else {
      _.mapValues(targets, function(target) {
        subject_detail.tasks[type].push(target)
      })
    }
    this.setState({
      subject_detail: subject_detail
    })
  }

  handleAfterAssignTask(list_targets) {
    list_targets.map(list_target => {
      this.state.subject_detail.tasks[this.state.type].push(list_target);
    })
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterCreatedAssignment(target) {
    this.state.subject_detail.tasks.assignments.push(target);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  afterCreateTask(target, type, owner) {
    if (owner == 'CourseSubject') {
      this.state.subject_detail.course_subject_task[type].push(target);
    } else {
      this.state.subject_detail.tasks[type].push(target);
    }
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleChooseType(type) {
    this.setState({
      type: type
    })
  }

  handleAfterCreatedSurvey(survey) {
    this.state.subject_detail.tasks[this.state.type].push(survey);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterCreatedTasks(target, type) {
    this.state.subject_detail.tasks[type].push(target);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }
}
