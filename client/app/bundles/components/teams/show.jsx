import axios from 'axios';
import Documents from '../shareds/documents/documents';
import ListTabs from './list_tabs';
import ModalAssignTask from '../subjects/managers/templates/modal_assign_task';
import ModalCreateAssignment from '../subjects/managers/templates/modal_create_assignment';
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumb/show';
import ModalPreviewDocument from '../shareds/modal_preview_document';
import TeamDetail from './templates/team_detail';
import ModalCreateProject from '../projects/templates/modal';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../assets/sass/team.scss');

const CREATE_TASKS_URL = routes.subject_tasks_url();

export default class TeamsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard,
      user_subjects: props.user_subjects,
      subject: props.subject,
      organization: props.organization,
      team: props.team,
      statuses: props.statuses,
      course: props.course,
      course_subjects: props.course_subjects,
      documents: props.documents,
      document_preview: {},
      subject_detail: props.team_detail,
      type: '',
      meta_types: props.meta_types
    }
  }

  render() {
    return (
      <div className='admin-subject-show clearfix'>
        <ShowBreadCrumb
          course={this.props.course}
          organization={this.props.organization}
          subject={this.props.subject}
          team={this.props.team}
        />

        <div className='col-md-9 content-list'>
          <div className='box box-primary'>
            <TeamDetail
              subject={this.state.subject}
              training_standard={this.state.training_standard}
              organization={this.state.organization}
              team={this.state.team}
            />
            <ListTabs
              team={this.props.team}
              course={this.props.course}
              subject_detail={this.state.subject_detail}
              statuses={this.props.statuses}
              subject={this.props.subject}
              training_standard={this.props.training_standard}
              evaluation_template={this.props.evaluation_template}
              evaluation_standards={this.props.evaluation_standards}
              member_evaluations={this.props.member_evaluations}
              user={this.state.user}
              user_index={this.state.user_index}
              meta_types={this.state.meta_types}
              afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
              handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
              handleAfterAddTask={this.handleAfterAddTask.bind(this)}
              afterCreateTask={this.afterCreateTask.bind(this)}
              handleChooseType={this.handleChooseType.bind(this)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <Documents
            document_type={'Team'}
            documents={this.state.documents}
            documentable={this.props.team}
            handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
            handlerAfterClickPreviewDocument={this.handlerAfterClickPreviewDocument.bind(this)}
          />

          <ModalPreviewDocument
            document_preview={this.state.document_preview}
            handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
          />
        </div>

        <ModalAssignTask
          remain_tasks={this.state.subject_detail.remain_tasks}
          type={this.state.type}
          ownerable_id={this.props.team ? this.props.team.id : ''}
          ownerable_type={"Team"}
          handleAfterAssignTask={this.handleAfterAssignTask.bind(this)}
        />

        <ModalCreateAssignment
          meta_types={this.state.meta_types}
          subject_detail={this.state.subject_detail}
          ownerable_id={this.props.team ? this.props.team.id : ''}
          ownerable_type={"Team"}
          url={CREATE_TASKS_URL}
          subject={this.state.subject}
          permit_create_meta_type={true}
          handleAfterCreatedAssignment={this.handleAfterCreatedAssignment.bind(this)}
        />

        <ModalCreateProject
          organization={this.state.organization}
          team={this.state.team}
          handleAfterActionProject={this.handleAfterActionProject.bind(this)} />
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

  afterAddTaskForUser(user, user_index) {
    this.setState({
      user: user,
      user_index: user_index
    })
    $('.modal-assign-member').modal();
  }


  handleAfterDeleteTask(index, task, type, user_index) {
    _.remove(this.state.subject_detail.tasks[type],
      ({task_id}) => task_id == index);
    this.state.subject_detail.remain_tasks[type].push(task);
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterAddTask(type, targetable_ids, targets, subject_detail, user_id, user_index) {
    if (user_id) {
      _.mapValues(targets, function(target) {
        subject_detail.user_subjects[user_index].user_course_task[type]
          .push(target);
      })
    } else {
      _.remove(this.state.subject_detail.team_task[type], targetable => {
        return targetable_ids.indexOf(targetable.id) >= 0;
      });
      _.mapValues(targets, function(target){
        subject_detail.team_task[type].push(target)
      })
    }

    this.setState({
      subject_detail: subject_detail
    })
  }

  afterCreateTask(target, type, owner) {
    this.state.subject_detail.team_task[type].push(target);

    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleAfterActionProject(target, type) {
    this.state.subject_detail.tasks[type].push(target);
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleChooseType(type) {
    this.setState({
      type: type
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
}
