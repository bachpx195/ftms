import axios from 'axios';
import EvaluationTemplateTab from './templates/show_partials/evaluation_template_tab';
import Header from './templates/header';
import ModalEdit from './templates/modal_edit';
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumbs/show';
import Subjects from './templates/show_partials/subjects';
import TrainingStandardInfoTab from './templates/show_partials/training_standard_info_tab';
import * as routes from 'config/routes';

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
      training_standard: props.training_standard,
      evaluation_template: props.evaluation_template,
      selected_subjects: props.selected_subjects,
      remain_subjects: props.remain_subjects,
      standard_organizations: props.standard_organizations,
      cloneable_organizations: props.cloneable_organizations,
      subjects: [],
    }
  }

  render() {
    return(
      <div className='row clearfix'>
        <ShowBreadCrumb training_standard={this.state.training_standard}
          organization={this.props.organization}
          other_training_standards={this.props.other_training_standards}/>
        <div className='box box-success box-standard-subjects'>

          <Header evaluation_template={this.state.evaluation_template}
            training_standard={this.state.training_standard}
            organization={this.props.organization}
            cloneable_organizations={this.state.cloneable_organizations}
            standard_organizations={this.state.standard_organizations} />
          <div className='nav-tabs-custom'>
            <ul className='nav nav-tabs nav-user'>
              <li className='active'>
                <a href='#training_standard_info' data-toggle='tab'>
                  {I18n.t('training_standards.nav_tabs.training_standard_info')}
                </a>
              </li>
              <li>
                <a href='#assigned_subject' data-toggle='tab'>
                  {I18n.t('training_standards.nav_tabs.assigned_subjects')}
                </a>
              </li>
              <li>
                <a href='#evaluation_template' data-toggle='tab'>
                  {I18n.t('training_standards.nav_tabs.evaluation_template')}
                </a>
              </li>
            </ul>
            <div className='tab-content'>
              <TrainingStandardInfoTab
                training_standard={this.state.training_standard}/>
              <Subjects selected_subjects={this.state.selected_subjects}/>
              <EvaluationTemplateTab
                evaluation_template={this.state.evaluation_template}/>
            </div>
          </div>

          <ModalEdit
            remain_subjects={this.state.remain_subjects}
            selected_subjects={this.state.selected_subjects}
            training_standard={this.state.training_standard}
            evaluation_template={this.state.evaluation_template}
            training_standard={this.state.training_standard}
            training_standard={this.state.training_standard}
            organization={this.props.organization}
            handleAfterAssignSubject={this.handleAfterAssignSubject.bind(this)}
            afterSaveEvaluationTemplate={this.afterSaveEvaluationTemplate.bind(this)}
            setEvaluationTemplate={this.setEvaluationTemplate.bind(this)}
            handleAfterUpdate={this.handleAfterUpdate.bind(this)}
          />
        </div>
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
        training_standard_id: this.state.training_standard.id,
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
      evaluation_template: evaluation_template
    });
  }

  handleAfterUpdate(new_training_standard) {
    this.setState({
      training_standard: new_training_standard
    })
  }
}
