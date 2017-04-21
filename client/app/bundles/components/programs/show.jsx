import axios from 'axios';
import Documents from '../shareds/documents/documents';
import Dropzone from 'react-dropzone';
import Errors from '../shareds/errors';
import FilterTrainingStandard from './templates/filter_training_standards';
import ModalCourse from './templates/modal_course';
import ModalPreviewDocument from '../shareds/modal_preview_document';
import ModalCreateStandard from './templates/modal_create_standard';
import ProgramInfo from './templates/program_info';
import ProgramRightPanel from './templates/program_right_panel';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import RenderListCourse from './templates/render_list_course_of_program';
import ShowBreadCrumb from './templates/bread_crumbs/show';
import SubjectLists from './subjects';
import UserLists from './user_lists';

import * as routes from 'config/routes';

require('../../assets/sass/program_show.scss');

export default class ProgramsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_roles: props.all_roles,
      owners: props.owners,
      organization: props.program_detail.organization,
      program_detail: props.program_detail,
      training_standards: props.program_detail.training_standards,
      image: '',
      selected_standard: 0,
      course: {},
      errors: null,
      documents: props.program_detail.documents,
      document_preview: {},
      other_programs: props.other_programs
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      courses: nextProps.courses,
      program_detail: nextProps.program_detail,
      organization: nextProps.organization,
     });
  }

  renderUser(user) {
    let user_url = routes.user_url(user.id);
    return (
     <li key={user.id}>
       <a href={user_url} title={user.name}>
         <img className='img-circle' src={user.avatar.url} width='20' height='20'/>
       </a>
     </li>
    );
  }

  render() {
    let program_url = routes.organization_program_url(
      this.state.organization.id, this.props.program.id);

    return (
      <div className='clearfix'>
        <ShowBreadCrumb
          organization={this.state.organization}
          program={this.props.program}
          others={this.state.other_programs}
        />
        <div className='col-md-9'>

          <div className='margin-select row'>
            <ProgramInfo
              program_detail={this.state.program_detail}
              organization={this.state.organization}
              owners={this.state.owners}
            />
            <FilterTrainingStandard
              training_standards={this.state.training_standards}
              handleAfterClickCreateCourse={this.handleAfterClickCreateCourse.bind(this)}
              handleAfterSelectTrainingStandard={this.handleAfterSelectTrainingStandard.bind(this)}
            />
          </div>

          <RenderListCourse
            program={this.props.program}
            program_detail={this.state.program_detail}
            selected_standard={this.state.selected_standard}
          />
        </div>

        <ProgramRightPanel program_detail={this.state.program_detail} />

      <div className='col-md-3 info-panel'>

        <Documents
          documents={this.state.documents}
          documentable={this.state.program_detail}
          document_type={"Program"}
          handlerAfterClickPreviewDocument={this.handlerAfterClickPreviewDocument.bind(this)}
          handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
        />

      </div>

        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />

        <ModalCreateStandard
          assign_standard_url={routes.assign_standards_url()}
          standard_url={routes.training_standards_url()}
          program={this.props.program}
          handleAfterCreatedStandard={this.handleAfterCreatedStandard.bind(this)}
        />

        <ModalCourse
          program_detail={this.state.program_detail}
          url={routes.prorgam_courses_url(this.props.program.id)}
          image={this.state.image}
          program={this.props.program}
          all_roles={this.state.all_roles}
          owners={this.state.owners}
          course={this.state.course}
          url_programs={program_url} />
      </div>
    );
  }

  handleAfterCreatedStandard(training_standard) {
    this.state.training_standards.push(training_standard);
    this.setState({
      training_standards: this.state.training_standards
    });
  }

  handleAfterClickCreateCourse() {
    this.setState({
      course: {}
    })
  }

  handleAfterSelectTrainingStandard(training_standard) {
    this.setState({
      selected_standard: training_standard
    });
  }

  handleAfterUpdate(new_course){
    let index = this.state.program_detail.courses
      .findIndex(course => course.id === new_course.id);
    this.state.program_detail.courses[index] = new_course;
    this.setState({
      program_detail: this.state.program_detail,
      course: {},
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

  handlerAfterClickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }
}
