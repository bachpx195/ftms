import React from 'react';
import axios from 'axios';
import SubjectItems from './subject_items';
import SubjectList from './subject_list';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

const MOVE_USERS_URL = routes.move_users_url();

export default class ModalChangeCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects,
      user: props.user || '',
      course: props.course,
      managed_courses: props.managed_courses || [],
      course_checked: '',
      program: props.program,
      target_subjects: [],
      choose_course_subjects: [],
      user_subjects: props.user_subjects || []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subjects: nextProps.subjects,
      user: nextProps.user || '',
      managed_courses: nextProps.managed_courses,
      user_subjects: nextProps.user_subjects || []
    })
  }

  render() {
    let pick_records = this.state.target_subjects.length -
      this.state.choose_course_subjects.length;
    let content_right = '';
    if (this.state.target_subjects.length > 0) {
      content_right = <div className="text-center title">
        {I18n.t("courses.move_courses.content_right_1")}
        </div>
    } else {
      content_right = <div className="text-center">
        {I18n.t("courses.move_courses.content_right_2")}
        </div>
    }
    return (
      <div className="modal fade modal-change-course" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <div className="row text-center">
                <h4>
                  {I18n.t("courses.move_courses.change_course_for",
                    {user: this.state.user.name})}
                </h4>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      {I18n.t("courses.move_courses.from",
                        {course: this.state.course.name})}
                    </div>
                    <div className="panel-body clearfix">
                      <div className="text-center title">
                        {I18n.t("courses.move_courses.user_subjects_of_course")}
                      </div>
                      <ul className="list-group">
                        {this.renderSubjectsOfUser()}
                      </ul>
                    </div>
                    <div className="panel-footer clearfix">
                      <span className="pull-right">
                        {I18n.t("courses.move_courses.records",
                          {record: this.state.user_subjects.length})}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="col-md-6">
                  <div className="panel panel-default">
                    <div className="panel-heading text-center">
                      <div className="form-inline">
                        <div className="form-group">
                          <span className="col-md-3">
                            {I18n.t("courses.move_courses.to")}
                          </span>
                          <div className="col-md-9">
                            <select className="form-control"
                              onChange={this.onChooseCourseItem.bind(this)}>
                              <option value="empty">
                                {I18n.t("courses.move_courses.choose_course")}
                              </option>
                              {this.renderAllCourse()}
                            </select>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="panel-body clearfix">
                      {content_right}
                      <SubjectList
                        check_new_course={true}
                        subjects={this.state.target_subjects}
                        choose_course_subjects={this.state.choose_course_subjects}
                        afterClickCourseSubjectItem={this.afterClickCourseSubjectItem.bind(this)}
                      />
                    </div>
                    <div className="panel-footer clearfix">
                      <span className="pull-right">
                        {I18n.t("courses.move_courses.records",
                          {record: pick_records})}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={this.onSubmitChangeCourse.bind(this)}
                className="btn btn-success center-block">
                {I18n.t('courses.buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSubjectsOfUser() {
    return this.state.user_subjects.map(user_subject => {
      let index = this.state.subjects.findIndex(subject =>
        subject.id == user_subject.subject_id);
      let _subject = this.state.subjects[index];
      return(
        <SubjectItems
          key={_subject.id}
          subject={_subject}
          check_new_course={false}
          status={user_subject.status}
        />
      );
    });
  }

  renderAllCourse() {
    return this.state.managed_courses.map(course => {
      return(
        <option name={course.name}
          value={course.id}
          key={course.name + "-" + course.id}>{course.name}</option>
      );
    })
  }

  onChooseCourseItem(event) {
    let target = event.target
    if (target.value == "empty") {
      this.setState({
        target_subjects: [],
        choose_course_subjects: [],
        course_checked: target.value
      });
    } else {
      axios.get(routes.move_course_url(target.value) + ".json")
        .then(response => {
          this.setState({
            target_subjects: response.data.subjects,
            choose_course_subjects: [],
            course_checked: target.value
          });
        })
        .catch(error => {
          console.log(error);
        }
      );
    }
  }

  afterClickCourseSubjectItem(subject) {
    let index = this.state.choose_course_subjects
      .findIndex(choose => choose == subject.id);
    if (index > -1) {
      this.state.choose_course_subjects.splice(index, 1);
    } else {
      this.state.choose_course_subjects.push(subject.id);
    }

    this.setState({
      choose_course_subjects: this.state.choose_course_subjects
    });
  }

  onSubmitChangeCourse(event) {
    axios.post(MOVE_USERS_URL + ".json", {
      moving_history: {
        sourceable_id: this.state.course.id,
        sourceable_type: "Course",
        destinationable_id: this.state.course_checked,
        destinationable_type: "Course",
        user_id: this.state.user.id
      }, reject_course_subjects: this.state.choose_course_subjects,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.setState({
          choose_course_subjects: [],
          course_checked: '',
          target_subjects: []
        })
        this.props.afterMoveCourse(this.state.user);
        $('.modal-change-course').modal('hide');
      })
      .catch(error => {
        console.log(error)
      })
  }
}
