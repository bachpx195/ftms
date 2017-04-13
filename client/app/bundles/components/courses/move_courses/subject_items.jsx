import React from 'react';
import css from '../assets/course.scss';

export default class ModalChangeCourse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {choose, subject, status} = this.props
    if (this.props.check_new_course) {
      return(
        <li className={`list-group-item cursor ${choose ? "remove-item" : ""}`}
          onClick={this.onClickItem.bind(this)}
          title={I18n.t("courses.move_courses.title_click_remove")}
          >
          {subject.name}
          <i className="fa fa-times pull-right" aria-hidden="true"></i>
        </li>
      );
    } else {
      return(
        <li className= "list-group-item cursor list-group-item-left"
          title={subject.name}>
          {subject.name}
          <span className={`pull-right status ${status}`}>{status}</span>
        </li>
      );
    }
  }

  onClickItem() {
    this.props.afterClickCourseSubjectItem(this.props.subject);
  }
}
