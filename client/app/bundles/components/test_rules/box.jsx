import axios from 'axios';
import Modal from './templates/modal_testrule'
import React from 'react';
import TestRules from './test_rules';
import * as table_constants from 'constants/griddle_table_constants';
import * as routes from 'config/routes';
import css from './css/test_rule.scss';
import css_slider from 'react-input-range/src/scss/index.scss';

export default class TestRulesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test_rules: this.props.test_rules,
      test_rule: {categories: [], questions: []},
    }
  }

  render() {
    let modal;
    if (this.state.test_rule.id) {
      modal = (
        <Modal url={routes.test_rule_url(this.state.test_rule.id)}
          test_rule={this.state.test_rule}
          title={I18n.t('test_rules.titles.edit')}
          categories={this.props.categories}
          questions={this.props.questions}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      )
    } else {
      modal = (
        <Modal url={routes.test_rules_url()}
          test_rule={this.state.test_rule}
          title={I18n.t('test_rules.titles.create')}
          categories={this.props.categories}
          questions={this.props.questions}
          afterCreateTestRule={this.afterCreateTestRule.bind(this)}/>
      )
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('test_rules.titles.all')}</h3>

              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='form-create pull-right'>
                <button className='btn btn-primary'
                  onClick={this.handleClickCreate.bind(this)}>
                  <i className="fa fa-plus"></i>
                  &nbsp;{I18n.t('test_rules.buttons.create')}
                </button>
              </div>
              <div className='list-categories clearfix'>
                <TestRules test_rules={this.state.test_rules} test_rule={this.state.test_rule}
                  handleRefresh={this.handleRefresh.bind(this)}/>
                {modal}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickCreate(event) {
    this.setState({
      test_rule: {categories: [], questions: []},
    });
    $('.modalForm').modal();
  }

  handleAfterUpdated(test_rule) {
    let index = this.state.test_rules
      .findIndex(test => test.id === test_rule.id);
    this.state.test_rules[index] = test_rule;
    this.setState({
      test_rules: this.state.test_rules,
    });
  }

  afterCreateTestRule(test_rule) {
    this.state.test_rules.push(test_rule);
    this.setState({
      test_rules: this.state.test_rules,
    })
  }

  handleRefresh(data){
    this.setState(data);
  }
}
