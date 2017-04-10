import React from 'react';
import SubjectItems from './subject_items';

export default class ModalChangeCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects,
      choose_course_subjects: props.choose_course_subjects
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subjects: nextProps.subjects,
      choose_course_subjects: nextProps.choose_course_subjects
    });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderCourseSubjectList()}
      </ul>
    );
  }

  renderCourseSubjectList() {
    return this.state.subjects.map(subject => {
      let index = this.state.choose_course_subjects.findIndex(choose => choose == subject.id);
      let choose = index > -1 ? true : false
      return <SubjectItems
        key={subject.id}
        check_new_course={this.props.check_new_course}
        subject={subject}
        choose={choose}
        afterClickCourseSubjectItem={this.afterClickCourseSubjectItem.bind(this)}
      />
    });
  }

  afterClickCourseSubjectItem(subject) {
    this.props.afterClickCourseSubjectItem(subject);
  }
}
