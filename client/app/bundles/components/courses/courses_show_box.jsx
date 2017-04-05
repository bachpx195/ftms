import React from 'react';
import axios from 'axios';
import MenuCourse from './menu_course';
import ModalAssignMember from './modal_assign_member/modal';
import ModalTask from './add_tasks/modal_task';
import ModalEvaluateMember from './modal_evaluate_member/modal';
import css from './course_css.scss';

import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/program_constants';
import * as course_constants from './course_constants';
import * as subject_constants from '../subjects/subject_constants';
import * as user_constants from '../users/user_constants';

require('../../assets/sass/course.scss');

const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = course_constants.LIMIT_DESCRIPTION;

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
      foo: true
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
        });
      }).catch(error => console.log(error));
  }

  renderCourseSubjects() {
    return this.state.course_subjects.map((course_subject, index) => {
      let course_subject_path = app_constants.APP_NAME +
        course_constants.COURSES_PATH + this.props.course.id + '/' +
        subject_constants.SUBJECT_PATH + course_subject.id;
      let subject_image = course_subject.image.url;
      return (
        <tr key={index} className="item ui-sortable-handle">
          <td >
            <div className="subject row">
              <a href={course_subject_path}>
                <div className="col-xs-2 subject-image">
                  <img className="img-circle" src={subject_image}
                    width="100" height="100" />
                </div>
                <div className="col-xs-10 infor">
                  <div>
                    <span className="subject-name">{course_subject.name}
                    </span>&nbsp;
                    <span><i>{course_subject.during_time}
                      {I18n.t('courses.during_time')}</i>
                    </span>&nbsp;&nbsp;
                  </div>
                  <div>{course_subject.description}
                  </div>
                </div>
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }

  renderManager(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
      <li key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
        </a>
      </li>
    );
  }

  renderManagerList(users) {
    return (
      <ul className='user-list clearfix'>
        {
          users.map((user, index) => {
            return this.renderManager(user)
          })
        }
      </ul>
    );
  }

  renderMember(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
      <li className="member-item" key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
          {user.name}
        </a>
        <div className="pull-right user-course">
          <div id="user-course-113">
            <div className="menu-right-user-course">
              <div className="dropdown action-user-course">
                <span id="dLabe" data-toggle="dropdown"
                  className="evaluation-show">
                  <i className="glyphicon glyphicon-align-justify text-danger">
                  </i>
                </span>
                <ul className="dropdown-menu dropdown-menu-right" >
                  <li>
                    <a href="#"
                      onClick={this.handleEvaluateModal.bind(this, user)} >
                      {I18n.t('courses.evaluation.evaluate')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  renderMemberList(users) {
    return (
      <ul className='member-list clearfix'>
        {
          users.map((user, index) => {
            return this.renderMember(user);
          })
        }
      </ul>
    );
  }

  renderUsers() {
    let course = this.state.course;
    let user_count = course.managers.length + course.members.length;
    let link_owner = null;
    if (course.owner) {
      let owner_path = app_constants.APP_NAME + user_constants.USER_PATH +
        course.owner.id;
      user_count = user_count + 1;
      link_owner = <li>
        <a href={owner_path} title={course.owner.name}>
          <img className='img-circle' src={course.owner.avatar.url}
            width='30' height='30'/>
        </a>
      </li>;
    }
    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t('courses.member.title')}
            </h3>
            <span className='badge label-primary'>
              {user_count}
            </span>
            <div className="pull-right">
              <button type="button" className="btn btn-default"
                onClick={this.handleAssignMember.bind(this)}
                title={I18n.t("courses.assign_user")}>
                <i className="fa fa-user-plus"></i>
              </button>
            </div>
          </div>
          <div className='box-body'>
            <div>
              <div className='member-title'>
                {I18n.t('courses.member.trainers')}
              </div>
              <ul className='user-list clearfix'>
                {link_owner}
                {this.renderManagerList(course.managers)}
              </ul>
              <div className='member-title'>
                {I18n.t('courses.member.trainee')}
              </div>
              {this.renderMemberList(course.members)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let course = this.state.course;
    let link_creator = null;
    let creator_name = '';
    if (course.creator) {
      let creator_path = app_constants.APP_NAME + user_constants.USER_PATH +
        course.creator.id;
      creator_name = course.creator.name;
      link_creator = <a href={creator_path} title={course.creator.name}>
        <img className='creator-image' src={course.creator.avatar.url} />
      </a>;
    }
    let description = this.state.course.description;
    if (description.length > LIMIT_DESCRIPTION) {
      description =
        this.state.course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }

    return(
      <div className='row course-show'>
        <div className='col-md-9'>
          <div className='course-subject row'>
            <div className='col-md-7 image-course-header'>
              <div className='subject-image img-resposive'>
                <img className='img-circle'
                  src={this.state.course.image.url ?
                    this.state.course.image.url :
                    DEFAULT_IMAGE_COURSE}/>
              </div>
              <div className='course-header'>
                <span className='header-title'>
                  {this.state.course.name}
                </span>
                <span className={'label-status' + ' ' +
                  this.state.course.status + '-background-color'}>
                  {I18n.t(`courses.${this.state.course.status}`)}
                </span>
                <div className='show-creator'>
                  {link_creator}
                  <h3 className='label box-title'>
                    <b>{creator_name}</b>
                  </h3>
                </div>
                <div className='description-course'
                  title={this.state.course.description}>
                  <i>
                    {description ? description :
                      I18n.t('courses.default_description')}
                  </i>
                </div>
              </div>
            </div>

            <div className='col-md-5'>
              <span className="btn glyphicon glyphicon-list pull-right"
                onClick={this.clickButtonList.bind(this)}></span>
              <MenuCourse url={COURSE_URL + this.props.program.id + '/' +
                course_constants.COURSES_PATH + this.props.course.id}
                course={this.state.course}
                handleAfterEdit={this.handleAfterUpdate.bind(this)}
                program={this.props.program}
                handleAfterChangeStatus={this.handleAfterChangeStatus.bind(this)} />
            </div>
          </div>

          <button className="btn add-task"
            title={I18n.t("courses.title_add_task")}
            onClick={this.addTask.bind(this)}>
            <i className="fa fa-plus" aria-hidden="true"></i>
            {I18n.t("courses.add_task")}
          </button>

          <div className='subject-list content row'>
            <table className="table" id="sortable">
              <tbody className="sortable-table">
                {this.renderCourseSubjects()}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-3 info-panel">
          {
            this.renderUsers()
          }
        </div>
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
      </div>
    );
  }

  handleEvaluateModal(user, event) {
    event.preventDefault();
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
    if (new_course.document) {
      this.state.course.document.url = new_course.document.url;
    }
    this.setState({
      course: this.state.course,
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
}
