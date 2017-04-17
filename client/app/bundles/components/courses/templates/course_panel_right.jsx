import React from 'react';
import Users from '../partials/users';
import Documents from '../partials/documents';
import ModalAssignMember from '../modal_assign_member/modal';
import ModalChangeCourse from '../move_courses/move_course_modal';
import ModalEvaluateMember from '../modal_evaluate_member/modal';
import ModalPreviewDocument from '../../shareds/modal_preview_document';

export default class CoursePanelRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.state}
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.state
  }

  render() {
    return (
      <div>
        <Users
          courseListPermit={this.props.courseListPermit}
          course={this.state.course}
          handleEvaluateModal={this.props.handleEvaluateModal}
          openModalChangeCourse={this.props.openModalChangeCourse}
        />

        <Documents
          courseListPermit={this.props.courseListPermit}
          documents={this.state.documents}
          onDocumentsDrop={this.props.onDocumentsDrop}
          handleDocumentUploaded={this.props.handleDocumentUploaded}
          handleDocumentDeleted={this.props.handleDocumentDeleted}
          clickPreviewDocument={this.props.clickPreviewDocument}
        />

        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.props.handleDocumentDeleted}
        />

        <ModalAssignMember
          unassignedUsers={this.state.course.unassigned_users}
          managers={this.state.course.managers}
          members={this.state.course.members}
          course={this.state.course}
          afterAssignUsers={this.props.afterAssignUsers} />

        <ModalChangeCourse
          user={this.state.user}
          course={this.state.course}
          program={this.state.program}
          subjects={this.state.subjects}
          user_subjects={this.state.user_subjects}
          managed_courses={this.state.managed_courses}
          afterMoveCourse={this.props.afterMoveCourse}
        />

        <ModalEvaluateMember
          evaluation_standards={this.state.evaluation_standards}
          program={this.state.program}
          member_evaluations={this.state.member_evaluations}
          user={this.state.user} course={this.state.course}
          evaluation_template={this.state.evaluation_template}
          afterEvaluateMember={this.props.afterEvaluateMember}
        />
      </div>
    );
  }
}
