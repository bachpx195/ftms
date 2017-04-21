import * as routes from 'config/routes';
import axios from 'axios';
import ModalAssign from './templates/modal_assign';
import ModalEvaluation from './templates/modal_evaluation';
import Subjects from './subjects';
import React from 'react';

export default class TrainingStandardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation_standards: [],
      evaluation_template: {},
      showForm: '',
      training_standard: props.training_standard,
      selected_subjects: props.selected_subjects,
      remain_subjects: props.remain_subjects,
      standard_organizations: props.standard_organizations,
      subjects: [],
    }
  }

  render() {
    let evaluation_template_url = routes.training_standard_evaluation_template_url(
      this.state.training_standard.id);
    return(
      <div>
        <Subjects selected_subjects={this.state.selected_subjects}
          training_standard={this.state.training_standard}
          afterRejectSubject={this.afterRejectSubject.bind(this)}
          subject_url={routes.subjects_url()} 
          standard_subject_url={routes.standard_subjects_url()}
          evaluation_template={this.props.evaluation_template}
          onClickCreateEvaluationTemplate={this.onClickCreateEvaluationTemplate.bind(this)}
          onClickButtonAssignSubject={this.onClickButtonAssignSubject.bind(this)}
          organization={this.props.organization}
          share_with_organization={this.props.share_with_organization}
          standard_organizations={this.state.standard_organizations}
          url={routes.training_standards_url()}
        />

        <ModalEvaluation
          url={evaluation_template_url} showForm={this.state.showForm}
          evaluation_template={this.state.evaluation_template}
          evaluation_standards={this.state.evaluation_standards}/>

        <ModalAssign
          remain_subjects={this.state.remain_subjects}
          selected_subjects={this.state.selected_subjects}
          training_standard={this.state.training_standard}
          handleAfterAssignSubject={this.handleAfterAssignSubject.bind(this)}
        />
      </div>
    );
  }

  afterRejectSubject(subject) {
    _.remove(this.state.selected_subjects, _subject => {
      return _subject == subject;
    });
    this.state.remain_subjects.push(subject);
    this.setState({
      selected_subjects: this.state.selected_subjects,
      remain_subjects: this.state.remain_subjects
    })
  }

  handleAfterAssignSubject(select_subjects) {// Handle create standard_subject
    select_subjects.map((select_subject) => {
      this.sendRequestAssign(select_subject);
    });
  }

  sendRequestAssign(subject) { //create standard_subject
    axios.post(routes.standard_subjects_url() + ".json", {
      standard_subject: {
        training_standard_id: this.state.training_standard.id,
        subject_id: subject.id
      }, authenticity_token: ReactOnRails.authenticityToken(),
        headers: {'Accept': 'application/json'}
    }).then(response => {
      this.state.selected_subjects.push(subject);
      _.remove(this.state.remain_subjects, _subject => {
        return _subject == subject;
      });
      this.setState({
        selected_subjects: this.state.selected_subjects,
        remain_subjects: this.state.remain_subjects,
      });
    }).catch(error => {
      console.log(error);
    });
  }

  onClickButtonAssignSubject() {
    $('#modalAssignSubject').modal();
  }

  onClickCreateEvaluationTemplate(){
    let evaluation_template = this.state.evaluation_template;
    this.setState({
      evaluation_standards: [],
      evaluation_template: {
        name: ''
      },
      showForm: '',
    });
    $('#modalEvaluation').modal();
  }
}
