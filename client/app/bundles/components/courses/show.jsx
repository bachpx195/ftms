import axios from 'axios';
import css from './assets/course.scss';
import CoursePanelRight from './templates/course_panel_right';
import CoursePolicy from 'policy/course_policy';
import ModalTask from './add_tasks/modal_task';
import ModalTrainingStandard from './templates/modal_training_standard'
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumbs/show';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

import CourseDetail from './partials/course_detail';
import Subjects from './partials/subjects';

require('../../assets/sass/course.scss');

export default class CourseShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program: props.course.program,
      organization: props.course.organization,
      course: props.course,
      subjects: props.subjects,
      current_user_subjects: props.current_user_subjects,
      evaluation_template: props.course.evaluation_template,
      remain_surveys: props.remain_surveys,
      selected_surveys: props.selected_surveys,
      evaluation_standards: props.course.evaluation_standards,
      user: {},
      member_evaluations: props.course.member_evaluations,
      remain_testings: props.remain_testings,
      selected_testings: props.selected_testings,
      selected_items: [],
      remain_items: [],
      targetable_type: '',
      documents: props.course.documents,
      document_preview: {},
      managed_courses: props.managed_courses,
      other_courses: props.other_courses,
      meta_types: props.meta_types,
    }
  }

  render() {
    let add_tasks_button = null;
    if (this.props.course.status != 'finished') {
      add_tasks_button = (
        <button className='btn add-task'
          title={I18n.t('courses.title_add_task')}
          onClick={this.addTask.bind(this)}>
          <i className='fa fa-plus' aria-hidden='true'></i>
          {I18n.t('courses.add_task_for_course')}
        </button>
      );
    }
    let member_ids = this.props.member_ids;
    const courseListPermit =[
      {action: ['course_manager'], target: 'children',
        data: {controller: 'courses', member_ids: member_ids}}
    ];
    return (
      <div className='row course-show'>
        <ShowBreadCrumb
          course={this.state.course}
          program={this.state.program}
          organization={this.state.organization}
          others={this.state.other_courses}
        />
        <div className='col-md-9'>
          <CourseDetail
            courseListPermit={courseListPermit}
            course={this.state.course}
            program={this.state.program}
            handleAfterUpdate={this.handleAfterUpdate.bind(this)}
            handleAfterChangeStatus={this.handleAfterChangeStatus.bind(this)}
          />

          <CoursePolicy permit={courseListPermit} >
            {add_tasks_button}
          </CoursePolicy>

          <button className='btn add-task btn-preview'
            title={I18n.t('courses.title_preview')}
            onClick={this.preview.bind(this)}>
            <i className='fa fa-eye'></i>
            {I18n.t('courses.preview')}
          </button>
          <ModalTrainingStandard course={this.state.course}/>
          <Subjects
            subjects={this.state.subjects}
            course={this.state.course}
            current_user_subjects={this.state.current_user_subjects}
          />
        </div>

        <div className='col-md-3'>
          <CoursePanelRight
            state={this.state}
            courseListPermit={courseListPermit}
            onDocumentsDrop={this.onDocumentsDrop.bind(this)}
            handleEvaluateModal={this.handleEvaluateModal.bind(this)}
            openModalChangeCourse={this.openModalChangeCourse.bind(this)}
            onDocumentsDrop={this.onDocumentsDrop.bind(this)}
            handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
            handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
            clickPreviewDocument={this.clickPreviewDocument.bind(this)}
            afterAssignUsers={this.afterAssignUsers.bind(this)}
            afterMoveCourse={this.afterMoveCourse.bind(this)}
            afterEvaluateMember={this.afterEvaluateMember.bind(this)}
          />
        </div>

        <ModalTask
          targetable={this.state.course}
          ownerable_type='Course'
          ownerable_id={this.state.course.id}
          selected_items={this.state.selected_items}
          remain_items={this.state.remain_items}
          targetable_type={this.state.targetable_type}
          afterSubmitCreateTask={this.afterSubmitCreateTask.bind(this)}
          afterChangeSelectBox={this.afterChangeSelectBox.bind(this)}
          handleAfterSave={this.handleAfterSave.bind(this)}
          meta_types={this.state.meta_types}
          categories={this.props.categories}
          questions={this.props.questions}
          course={this.state.course}
        />
      </div>
    );
  }

  handleAfterSave(selected_items) {
    this.setState({
      selected_items: selected_items
    })
  }

  handleEvaluateModal(user) {
    this.setState({
      user: user
    });
    $('.modal-evaluate-member').modal();
  }

  afterEvaluateMember(member_evaluation, member_evaluation_items) {
    Object.assign(member_evaluation, {member_evaluation_items});
    let index = this.state.member_evaluations.findIndex(_evaluation => {
      return _evaluation.id == member_evaluation.id;
    });
    if (index >= 0) {
      this.state.member_evaluations[index] = member_evaluation;
    } else {
      this.state.member_evaluations.push(member_evaluation);
    }

    this.setState({
      member_evaluations: this.state.member_evaluations,
    });
  }

  addTask() {
    $('.modal-task-course').modal();
  }

  afterSubmitCreateTask(selected_items, remain_items) {
    this.setState({
      selected_items: selected_items,
      remain_items: remain_items
    })
  }

  afterChangeSelectBox(type_option) {
    if (type_option == 'survey') {
      this.setState({
        remain_items: this.state.remain_surveys,
        selected_items: this.state.selected_surveys,
        targetable_type: 'Survey'
      });
    } else {
      this.setState({
        remain_items: this.state.remain_testings,
        selected_items: this.state.selected_testings,
        targetable_type: 'TestRule'
      });
    }
  }

  handleAfterUpdate(new_course) {
    this.state.course[new_course.name] = new_course.value;
    if (new_course.image) {
      this.state.course.image.url = new_course.image.url;
    }
    if (new_course.documents) {
      this.state.documents = new_course.documents;
    }
    this.setState({
      course: this.state.course
    });
  }

  afterAssignUsers(unassigned_users, managers, members) {
    Object.assign(this.state.course, {
      unassigned_users: unassigned_users,
      managers: managers,
      members: members
    });
    this.setState({course: this.state.course});
  }

  handleAfterChangeStatus(new_course) {
    this.setState({
      course: new_course
    })
  }

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.course.id);
    formData.append('document[documentable_type]', 'Course');
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = routes.documents_url();
    axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.handleDocumentUploaded(response.data.document);
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleDocumentUploaded(document) {
    this.state.documents.push(document);
    this.setState({documents: this.state.documents});
  }

  handleDocumentDeleted(document) {
    this.setState({
      documents: this.state.documents.filter(item => item.id != document.id)
    });
  }

  clickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }

  openModalChangeCourse(user) {
    axios.get(routes.move_course_url(this.state.course.id) + '.json', {
      params: {
        user_id: user.id
      }
    }).then(response => {
      this.setState({
      user_subjects: response.data.user_subjects,
      user: user
    })
    $('.modal-change-course').modal();
    }).catch(error => {
      console.log(error);
    });
  }

  afterMoveCourse(user) {
    let index = this.state.course.members.findIndex(member => member == user);
    this.state.course.members.splice(index, 1);
    this.setState({
      course: this.state.course
    });
  }

  preview() {
    $('.modal-training-standard').modal();
  }
}
