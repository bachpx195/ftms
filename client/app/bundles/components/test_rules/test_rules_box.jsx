import React from 'react';
import axios from 'axios';
import Form from './form'
import Modal from './modal'
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as test_rule_constants from './test_rule_constants';
import css from './test_rule.scss';

const TEST_RULE_URL = app_constants.APP_NAME +
  test_rule_constants.TEST_RULE_PATH

export default class TestRuleBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test_rules: this.props.test_rules,
      test_rule: {},
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='griddle-head clearfix'>
          <div className='col-md-6'>
            <Filter />
          </div>
          <div className='col-md-6 text-right'>
            <Pagination />
          </div>
        </div>
        <Table />
      </div>
    );

    const ButtonEdit = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleClickEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        data-type='delete' onClick={this.handleClickDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    )

    let modal;
    if (this.state.test_rule.id){
      modal = (
        <Modal url={TEST_RULE_URL + '/' + this.state.test_rule.id}
          test_rule={this.state.test_rule}
          title={I18n.t('test_rules.titles.edit')}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      )
    } else {
      modal = (
        <Modal url={TEST_RULE_URL}
          test_rule
          title={I18n.t('test_rules.title.create')}
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
                  {I18n.t('test_rules.buttons.create')}
                </button>
              </div>
              <div className='list-categories clearfix'>
                <Griddle data={this.state.test_rules}
                  plugins={[plugins.LocalPlugin]}
                  components={{Layout: NewLayout}}
                  styleConfig={table_constants.styleConfig}>
                  <RowDefinition>
                    <ColumnDefinition id='name' title={I18n.t('programs.name')}/>
                    <ColumnDefinition id='total_question'
                      title={I18n.t('test_rules.form.total_question')} />
                    <ColumnDefinition id='time_of_test'
                      title={I18n.t('test_rules.form.time_of_test')} />
                    <ColumnDefinition id='min_score_for_pass'
                      title={I18n.t('test_rules.form.min_score_for_pass')} />
                    <ColumnDefinition id='opportunity'
                      title={I18n.t('test_rules.form.opportunity')} />
                    <ColumnDefinition id='number_of_test'
                      title={I18n.t('test_rules.form.number_of_test')} />
                    <ColumnDefinition id='edit' title={I18n.t('buttons.edit')}
                      customComponent={ButtonEdit}/>
                    <ColumnDefinition id='delete'
                      title={I18n.t('buttons.delete')}
                      customComponent={ButtonDelete}/>
                  </RowDefinition>
                </Griddle>
                {modal}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickCreate(event){
    $('.modalForm').modal();
  }

  handleClickEdit(event){
    let $target = $(event.target);
    $target.blur();
    this.setState({
      test_rule: this.state.test_rules[$target.data('index')]
    });
    $('.modalForm').modal();
  }

  handleClickDelete(event){
    let $target = $(event.target);
    $target.blur();
    let test_rule = this.state.test_rules[$target.data('index')];
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(TEST_RULE_URL + '/' + test_rule.id + '.json', {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        }
      })
      .then(response => {
        _.remove(this.state.test_rules, _test_rule => {
          return _test_rule.id == response.data.test_rule.id;
        });
        this.setState({
          test_rules: this.state.test_rules,
          test_rule: {}
        });
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(test_rule) {
    let index = this.state.test_rules
      .findIndex(test => test.id === test_rule.id);
    this.state.test_rules[index] = test_rule;
    this.setState({
      test_rules: this.state.test_rules,
      test_rule: {}
    });
  }

  afterCreateTestRule(test_rule){
    this.state.test_rules.push(test_rule)
    this.setState({
      test_rules: this.state.test_rules,
      test_rule: {}
    })
  }
}
