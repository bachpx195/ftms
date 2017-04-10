import React from 'react';
import axios from 'axios';
import ModalAssignMember from './modal_assign_member/modal';
import ModalTask from './add_tasks/modal_task';
import ModalEvaluateMember from './modal_evaluate_member/modal';
import ModalPreviewDocument from '../shareds/modal_preview_document';
import CoursePolicy from 'policy/course_policy';
import css from './course_css.scss';

import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/program_constants';
import * as course_constants from './course_constants';
import * as subject_constants from '../subjects/subject_constants';
import * as user_constants from '../users/user_constants';

import CourseSubjects from './partials/course_subjects';
import Users from './partials/users';
import Documents from './partials/documents';
import CourseDetail from './partials/course_detail';

require('../../assets/sass/course.scss');

export default class CoursesShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      course_subjects: [],
      evaluation_template: {},
      rerender: false,
      remain_surveys: props.remain_surveys,
      selected_surveys: props.selected_surveys,
      evaluation_standards: [],
      user: {},
      member_evaluations: [],
      remain_testings: props.remain_testings,
      selected_testings: props.selected_testings,
      selected_items: [],
      remain_items: [],
      targetable_type: '',
      foo: true,
      documents: [],
      document_preview: {},
    }
  }

  componentWillMount() {
    Object.assign(this.state.course, {
      unassigned_users: [],
      managers: [],
      members: []
    });
    this.setState({course: this.state.course});
  }

  componentDidMount() {
    this.fetchCourse();
  }

  fetchCourse() {
    const COURSES_URL = app_constants.APP_NAME +
      program_constants.PROGRAMS_PATH + this.props.program.id + '/'
      + course_constants.COURSES_PATH + this.props.course.id;

    axios.get(COURSES_URL + '.json')
      .then(response => {
        this.setState({
          course: response.data.course,
          course_subjects: response.data.course_subjects,
          evaluation_standards: response.data.course.evaluation_standards,
          evaluation_template: response.data.course.evaluation_template,
          member_evaluations: response.data.course.member_evaluations,
          documents: response.data.course.documents
        });
      }).catch(error => console.log(error));
  }

  render() {
    let members_ids = this.props.members_ids;
    const courseListPermit =[
      {controller: 'courses', action: ['ownerController'], target: 'children',
        data: {controller: 'courses'}},
      {controller: 'my_space/courses', action: ['ownerController',
        'course_manager'], target: 'children', data: {
        controller: 'my_space/courses', members_ids: members_ids}}
    ];
    return (
      <div className='row course-show'>
        <div className='col-md-9'>
          <CourseDetail
            courseListPermit={courseListPermit}
            course={this.state.course}
            program={this.props.program}
            clickButtonList={this.clickButtonList.bind(this)}
            handleAfterUpdate={this.handleAfterUpdate.bind(this)}
            handleAfterChangeStatus={this.handleAfterChangeStatus.bind(this)}
          />
          <CoursePolicy permit={courseListPermit} >
            <button className="btn add-task"
              title={I18n.t("courses.title_add_task")}
              onClick={this.addTask.bind(this)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
              {I18n.t("courses.add_task")}
            </button>
          </CoursePolicy>
          <CourseSubjects
            course_subjects={this.state.course_subjects}
            course={this.state.course}
          />
        </div>

        <Users
          courseListPermit={courseListPermit}
          course={this.state.course}
          handleEvaluateModal={this.handleEvaluateModal.bind(this)}
          handleAssignMember={this.handleAssignMember.bind(this)}
        />
        <Documents
          courseListPermit={courseListPermit}
          documents={this.state.documents}
          onDocumentsDrop={this.onDocumentsDrop.bind(this)}
          handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
          clickPreviewDocument={this.clickPreviewDocument.bind(this)}
        />
        <ModalAssignMember unassignedUsers={this.state.course.unassigned_users}
          managers={this.state.course.managers}
          members={this.state.course.members}
          rerender={this.state.rerender} course={this.state.course}
          afterAssignUsers={this.afterAssignUsers.bind(this)} />

        <ModalTask
          targetable={this.state.course}
          ownerable_type="Course"
          selected_items={this.state.selected_items}
          remain_items={this.state.remain_items}
          targetable_type={this.state.targetable_type}
          afterSubmitCreateTask={this.afterSubmitCreateTask.bind(this)}
          afterChangeSelectBox={this.afterChangeSelectBox.bind(this)}
        />

        <ModalEvaluateMember
          evaluation_standards={this.state.evaluation_standards}
          program={this.props.program}
          member_evaluations={this.state.member_evaluations}
          user={this.state.user} course={this.state.course}
          evaluation_template={this.state.evaluation_template}
          afterEvaluateMember={this.afterEvaluateMember.bind(this)}
        />

        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />
      </div>
    );
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
    this.setState({member_evaluations: this.state.member_evaluations});
  }

  addTask() {
    $('#modalTaskSurvey').modal();
    this.setState({foo: !this.state.foo})
  }

  afterSubmitCreateTask(selected_items, remain_items) {
    this.setState({
      selected_items: selected_items,
      remain_items: remain_items
    })
  }

  afterChangeSelectBox(type_option) {
    if (type_option == "survey") {
      this.setState({
        remain_items: this.state.remain_surveys,
        selected_items: this.state.selected_surveys,
        targetable_type: "Survey"
      });
    } else {
      this.setState({
        remain_items: this.state.remain_testings,
        selected_items: this.state.selected_testings,
        targetable_type: "TestRule"
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

  handleAssignMember() {
    this.setState({rerender: true});
    $('.modal-assign-member').modal();
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
      course: new_course,
    })
  }

  clickButtonList() {
    if ($('.td-course-edit-delete').hasClass('hidden')) {
      $('.td-course-edit-delete').removeClass('hidden');
    } else {
      $('.td-course-edit-delete').addClass('hidden');
    }

    if ($('.td-course-edit-delete').find('.finish-button')) {
      $('.td-course-edit-delete').css('margin-left','0%');
    }
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

    let url = app_constants.APP_NAME + 'documents';

    axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.handleDocumentUploaded(response.data.document);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
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
}
