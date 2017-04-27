import React from 'react';
import axios from 'axios';

import ResultBox from './result_box';
import * as routes from 'config/routes';

require('../../../assets/sass/modal_evaluate_member.scss');

export default class ModalEvaluateMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation_standards: props.evaluation_standards,
      evaluation_template: props.evaluation_template,
      member_evaluations: props.member_evaluations,
      member_evaluation: {},
      member_evaluation_items: [],
      course: props.course,
      user: props.user,
      standard_points: {},
      total_point: 0,
      training_result: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    let current_user = JSON.parse(localStorage.current_user);
    let member_evaluation = nextProps.member_evaluations.find(evaluation => {
      return (evaluation.member_id == nextProps.user.id) &&
        (evaluation.manager_id == current_user.id);
    }) || {};

    let total_point = 0;
    let standard_points = {};
    if (member_evaluation.id) {
      for (let standard of member_evaluation.member_evaluation_items) {
        Object.assign(standard_points,
          {[standard.evaluation_standard_id]: standard.evaluation_point});
        total_point += parseInt(standard.evaluation_point);
      }
    }
    let training_result = '';
    this.props.evaluation_template.training_results.map(result => {
      if (total_point >= result.min_point && total_point <= result.max_point) {
        training_result = result;
      }
    });

    this.setState({
      evaluation_standards: nextProps.evaluation_standards,
      evaluation_template: nextProps.evaluation_template,
      member_evaluation: member_evaluation,
      user: nextProps.user,
      course: nextProps.course,
      training_result: training_result,
      standard_points: standard_points,
      total_point: total_point,
    });
  }

  renderEvaluationStandards() {
    return this.state.evaluation_standards.map((evaluation_standard, index) => {
      return(
        <li className="list-group-item" key={evaluation_standard.id}>
          <div className="row">
            <div className="col-md-6">
              <label>{index + 1}. {evaluation_standard.name}</label>
            </div>
            <div className="col-md-6 text-right point-input">
              <input className="text-right" type="number" step="1" min='0'
                value={this.state.standard_points[evaluation_standard.id] || 0}
                onChange={this.handlePointChange.bind(this, evaluation_standard.id)} />
            </div>
          </div>
        </li>
      )
    });
  }

  render() {
    return (
      <div className="modal fade modal-evaluate-member" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.state.user.name}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 course-info">
                  <strong>{I18n.t('courses.evaluation.modal_course')}: </strong>
                  {this.state.course.name}[{this.state.course.start_date}]
                </div>

                <div className="col-md-12 action-assign">
                  <ul className="list-group">{this.renderEvaluationStandards()}</ul>
                </div>

                <ResultBox total_point={this.state.total_point}
                  training_result={this.state.training_result}
                  evaluation_template={this.state.evaluation_template}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                {I18n.t('buttons.cancel')}
              </button>
              <button type="button" className="btn btn-primary"
                onClick={this.handleSubmit.bind(this)} disabled={!this.formValid()}>
                {I18n.t('buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  formValid() {
    for(let evaluation_standard of this.state.evaluation_standards) {
      let point = this.state.standard_points[evaluation_standard.id];
      if(!point) {
        return false;
      }
      if(point < parseInt(evaluation_standard.min_point) ||
        point > parseInt(evaluation_standard.max_point)) {
        return false
      }
    }
    return true;
  }

  handlePointChange(evaluation_standard_id, event){
    let standard_points = this.state.standard_points
    standard_points[evaluation_standard_id] = parseInt(event.target.value || 0);
    let total_point = 0;
    let training_result = '';
    for (let key of Object.keys(standard_points)) {
      total_point += standard_points[key];
    }

    this.props.evaluation_template.training_results.map(result => {
      if (total_point >= result.min_point && total_point <= result.max_point) {
        training_result = result;
      }
    });
    this.setState({
      training_result: training_result,
      total_point: total_point,
      standard_points: standard_points,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let method = '';
    let evaluation_id = '';
    if (this.state.member_evaluation.id) {
      method = 'PATCH';
      evaluation_id = this.state.member_evaluation.id
    } else {
      method = 'POST';
    }
    let formData = new FormData();
    let standard_points = this.state.standard_points;
    if (this.props.subject) {
      formData.append('subject_id', this.props.subject.id);
    }
    formData.append('course_id', this.state.course.id);
    formData.append('member_evaluation[member_id]', this.state.user.id);
    formData.append('member_evaluation[total_point]', this.state.total_point);
    formData.append('member_evaluation[evaluation_template_id]',
      this.state.evaluation_template.id);

    let index = 0;
    for (let key of Object.keys(standard_points)) {
      if (this.state.member_evaluation.id) {
        let item = this.state.member_evaluation.member_evaluation_items.find(_item => {
          return _item.evaluation_standard_id == key;
        });
        if (item) {
          formData.append('member_evaluation[member_evaluation_items_attributes]'+
            '[' + index + '][id]', item.id);
        }
      }
      formData.append('member_evaluation[member_evaluation_items_attributes]'+
        '[' + index + '][evaluation_standard_id]', key);
      formData.append('member_evaluation[member_evaluation_items_attributes]'+
        '[' + index + '][evaluation_point]', standard_points[key]);
      index++;
    }
    formData.append('certificate[total_point]', this.state.total_point);
    formData.append('certificate[course_id]', this.state.course.id);
    formData.append('certificate[program_id]', this.state.course.program.id);
    formData.append('certificate[user_id]', this.state.user.id);
    formData.append('certificate[training_result_id]',
      this.state.training_result.id);
    formData.append('certificate[training_standard_id]',
      this.state.course.training_standard.id);

    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = routes.member_evaluation_url(this.props.course.id, evaluation_id);
    axios({
      url: url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.afterEvaluateMember(response.data.member_evaluation,
        response.data.member_evaluation_items, response.data.certificate);
      $('.modal-evaluate-member').modal('hide');
    })
    .catch(error => console.log(error));
  }
}
