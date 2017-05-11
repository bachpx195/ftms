import axios from 'axios';
import AdditionFormCategory from './addition_form_category';
import AdditionFormQuestion from './addition_form_question';
import ConditionForm from './condition_form';
import {FunctionsHelper} from '../helper/functions';
import Form from './information_form'
import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.objectRefresh = {};
    this.state = {
      test_rule: props.test_rule,
      temp_test_rule: {categories: [], questions: []},
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.test_rule.id) $('a[href="#phrase-1"]').trigger('click');
    this.setState({
      test_rule: nextProps.test_rule,
      temp_test_rule: FunctionsHelper.deepClone(nextProps.test_rule)
    })
  }

  render() {
    let form = (
      <Form handleUpdateCondition={this.handleUpdateCondition.bind(this)}
        test_rule={this.state.temp_test_rule}
        url={this.props.url}
      />
    );

    const conditionForm = (
      <ConditionForm
        categories={this.state.temp_test_rule.categories}
        questions={this.state.temp_test_rule.questions}
        handleAfterUpdated={this.handleUpdateCondition.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleAddForm={this.handleAddForm.bind(this)}
        handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}
        handleRefresh={this.handleRefresh.bind(this)}
      />
    );

    const additionFormCategory = (
      <AdditionFormCategory
        categories={this.props.categories}
        current_categories={this.state.temp_test_rule.categories}
        handleAddForm={this.handleAddForm.bind(this)}
        handleAddCategories={this.handleAddCategories.bind(this)}
        handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}
        handleRefresh={this.handleRefresh.bind(this)}
      />
    );

    const additionFormQuestion = (
      <AdditionFormQuestion
        questions={this.props.questions}
        current_questions={this.state.temp_test_rule.questions}
        handleAddForm={this.handleAddForm.bind(this)}
        handleAddQuestions={this.handleAddQuestions.bind(this)}
        handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}
        handleRefresh={this.handleRefresh.bind(this)}
      />
    );

    return (
      <div className='modal fade in modalForm' role='dialog'>
        <div className='modal-dialog modal-test-rule'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{this.props.title}</h4>
            </div>
            <div className='modal-body'>
              <ul className="nav nav-pills">
                <li className="active">
                  <a data-toggle="tab" href="#phrase-1">
                    {I18n.t('test_rules.tabs.information')}
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#phrase-2">
                    {I18n.t('test_rules.tabs.condition')}
                  </a>
                </li>
                <li className="hidden">
                  <a data-toggle="tab" href="#phrase-3"></a>
                </li>
                <li className="hidden">
                  <a data-toggle="tab" href="#phrase-4"></a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="phrase-1" className="tab-pane fade in active">
                  {form}
                </div>
                <div id="phrase-2" className="tab-pane fade">
                  {conditionForm}
                </div>
                <div id="phrase-3" className="tab-pane fade">
                  {additionFormCategory}
                </div>
                <div id="phrase-4" className="tab-pane fade">
                  {additionFormQuestion}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleRefresh(keys, data = {}){
    var object = null;
    if(!Array.isArray(keys)){
      this.objectRefresh[keys].refreshObject(data);
      return;
    }
    for(var key of keys){
      object = object ? object.objectRefresh[key] : this.objectRefresh[key];
    }
    object ? object.refreshObject(data) : {};
  }

  handleRegisterRefresh(key, object){
    this.objectRefresh[key] = object
  }

  handleUpdateCondition(data) {
    Object.assign(this.state.temp_test_rule, data);
    this.setState({temp_test_rule: this.state.temp_test_rule});
  }

  handleAddForm(type) {
    if(type == 'category')
      $('a[href="#phrase-3"]').trigger('click');
    else if(type == 'question')
      $('a[href="#phrase-4"]').trigger('click');
  }

  handleAddCategories(data) {
    _.each(data, (item) => {this.state.temp_test_rule.categories.push(item)});
    this.setState({
      temp_test_rule: this.state.temp_test_rule
    });
  }

  handleAddQuestions(data) {
    _.each(data, (item) => {this.state.temp_test_rule.questions.push(item)});
    this.setState({
      temp_test_rule: this.state.temp_test_rule
    });
  }

  handleSubmit() {
    var data = {};
    var test_rule = {};
    
    test_rule['name'] = this.state.temp_test_rule.name;
    test_rule['total_question'] = this.state.temp_test_rule.total_question;
    test_rule['time_of_test'] = this.state.temp_test_rule.time_of_test;
    test_rule['min_score_for_pass'] = this.state.temp_test_rule.min_score_for_pass;
    test_rule['opportunity'] = this.state.temp_test_rule.opportunity;
    test_rule['number_of_test'] = this.state.temp_test_rule.number_of_test;
    test_rule['test_rule_categories_attributes'] = this.state.temp_test_rule.categories;
    test_rule['test_rule_questions_attributes'] = this.state.temp_test_rule.questions;
    data['authenticity_token'] = ReactOnRails.authenticityToken();
    data['targetable'] = test_rule;
    data['test_rule'] = test_rule;
    data['type'] = 'TestRule';
    data['ownerable_type'] = this.props.ownerable_type;
    data['ownerable_id'] = this.props.ownerable_id;

    let method = this.state.test_rule.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: data,
      headers: {'Accept': 'application/json'}
    })
      .then(response => {
        if (this.props.test_rule['id'] != undefined) {
          this.props.handleAfterUpdated(response.data.test_rule)
        } else {
          this.props.afterCreateTestRule(response.data.target, 'test_rules');
        }
        $('.modalForm').modal('hide');
      })
      .catch(error => {
        this.setState({errors: error.response.data.errors})});
  }
}
