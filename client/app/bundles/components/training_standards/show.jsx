import * as routes from 'config/routes';
import axios from 'axios';
import ModalAssign from './templates/modal_assign';
import ModalEvaluation from './templates/modal_evaluation';
import Subjects from './subjects';
import React from 'react';

export default class TrainingStandardShow extends React.Component {
  constructor(props) {
    super(props);
    let evaluation_standards = [];
    if (props.evaluation_template.id) {
      for (let standard of props.evaluation_template.evaluation_standards) {
        evaluation_standards.push(standard);
      }
    }

    let training_results = [];
    if (props.evaluation_template.id) {
      for (let result of props.evaluation_template.training_results) {
        training_results.push(result);
      }
    }

    this.state = {
      evaluation_template: props.evaluation_template,
      old_evaluation_standards: evaluation_standards,
      old_training_results: training_results,
      selected_subjects: props.selected_subjects,
      remain_subjects: props.remain_subjects,
      standard_organizations: props.standard_organizations,
      subjects: [],
    }
  }

  render() {
    return(
      <div>
        <Subjects selected_subjects={this.state.selected_subjects}
          training_standard={this.props.training_standard}
          afterRejectSubject={this.afterRejectSubject.bind(this)}
          subject_url={routes.subjects_url()}
          standard_subject_url={routes.standard_subjects_url()}
          evaluation_template={this.state.evaluation_template}
          organization={this.props.organization}
          share_with_organization={this.props.share_with_organization}
          standard_organizations={this.state.standard_organizations} />

        <ModalEvaluation
          training_standard={this.props.training_standard}
          evaluation_template={this.state.evaluation_template}
          old_evaluation_standards={this.state.old_evaluation_standards}
          old_training_results={this.state.old_training_results}
          setEvaluationTemplate={this.setEvaluationTemplate.bind(this)}
          afterSaveEvaluationTemplate={this.afterSaveEvaluationTemplate.bind(this)}
        />

        <ModalAssign
          remain_subjects={this.state.remain_subjects}
          selected_subjects={this.state.selected_subjects}
          training_standard={this.props.training_standard}
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
    axios.post(routes.standard_subjects_url() + '.json', {
      standard_subject: {
        training_standard_id: this.props.training_standard.id,
        subject_id: subject.id
      },
      authenticity_token: ReactOnRails.authenticityToken(),
    }).then(response => {
      this.state.selected_subjects.push(subject);
      _.remove(this.state.remain_subjects, _subject => {
        return _subject == subject;
      });
      this.setState({
        selected_subjects: this.state.selected_subjects,
        remain_subjects: this.state.remain_subjects,
      });
    }).catch(error => console.log(error));
  }

  setEvaluationTemplate(evaluation_template) {
    this.setState({evaluation_template: evaluation_template});
  }

  afterSaveEvaluationTemplate(evaluation_template) {
    let evaluation_standards = [];
    for (let evaluation_standard of evaluation_template.evaluation_standards) {
      evaluation_standards.push(evaluation_standard);
    }

    let training_results = [];
    for (let training_result of evaluation_template.training_results) {
      training_results.push(training_result);
    }

    this.setState({
      evaluation_template: evaluation_template,
      old_evaluation_standards: evaluation_standards,
      old_training_results: training_results,
    });
  }
}
