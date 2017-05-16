import Errors from 'shared/errors';
import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      test_rule: [],
      name: props.test_rule.name || '',
      total_question: props.test_rule.total_question || '',
      time_of_test: props.test_rule.time_of_test || '',
      min_score_for_pass: props.test_rule.min_score_for_pass || '',
      opportunity: props.test_rule.opportunity || '',
      number_of_test: props.number_of_test || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      test_rule: nextProps.test_rule,
      name: nextProps.test_rule.name || '',
      total_question: nextProps.test_rule.total_question || '',
      time_of_test: nextProps.test_rule.time_of_test || '',
      min_score_for_pass: nextProps.test_rule.min_score_for_pass || '',
      opportunity: nextProps.test_rule.opportunity || '',
      number_of_test: nextProps.test_rule.number_of_test || ''
    });
  }

  render() {
    return (
      <div>
        <Errors errors={this.state.errors}/>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>{I18n.t('test_rules.form.name')}</label>
            </div>
            <div className='col-xs-7'>
              <input type='text'
                placeholder={I18n.t('test_rules.form.placeholder_name')}
                onChange={this.handleChange.bind(this)}
                value={this.state.name}
                className='form-control' name='name' />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>
                {I18n.t('test_rules.form.total_question')}
              </label>
            </div>
            <div className='col-xs-7'>
              <input type='number'
                onChange={this.handleChange.bind(this)}
                value={this.state.total_question}
                className='form-control' name='total_question' />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>{I18n.t('test_rules.form.time_of_test')}
              </label>
            </div>
            <div className='col-xs-7'>
              <input type='number'
                onChange={this.handleChange.bind(this)}
                value={this.state.time_of_test}
                className='form-control' name='time_of_test'/>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>{I18n.t('test_rules.form.min_score_for_pass')}
              </label>
            </div>
            <div className='col-xs-7'>
              <input type='number'
                onChange={this.handleChange.bind(this)}
                value={this.state.min_score_for_pass}
                className='form-control' name='min_score_for_pass'/>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>{I18n.t('test_rules.form.opportunity')}
              </label>
            </div>
            <div className='col-xs-7'>
              <input type='number'
                onChange={this.handleChange.bind(this)}
                value={this.state.opportunity}
                className='form-control' name='opportunity' />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-1 col-xs-3'>
              <label className='name'>{I18n.t('test_rules.form.number_of_test')}
              </label>
            </div>
            <div className='col-xs-7'>
              <input type='number'
                onChange={this.handleChange.bind(this)}
                value={this.state.number_of_test}
                className='form-control' name='number_of_test' />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-9'>
              <button type='button' className='btn btn-primary submit'
                onClick={this.handleNext.bind(this)}>
                {I18n.t('buttons.next')}&nbsp;
                <i className="fa fa-angle-double-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  formValid() {
    return this.state.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.test_rule, {[attribute]: event.target.value});
    this.props.handleUpdateCondition(this.state.test_rule);
  }

  handleNext() {
    $('a[href="#phrase-2"]').trigger('click');
  }
}
