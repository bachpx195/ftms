import React from 'react';
import axios from 'axios';
import Errors from '../shareds/errors';

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: null,
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
      name: nextProps.test_rule.name || '',
      total_question: nextProps.test_rule.total_question || '',
      time_of_test: nextProps.test_rule.time_of_test || '',
      min_score_for_pass: nextProps.test_rule.min_score_for_pass || '',
      opportunity: nextProps.test_rule.opportunity || '',
      number_of_test: nextProps.number_of_test || ''
    });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
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
              <button type='submit' className='btn btn-primary submit'
                disabled={!this.formValid()}> {I18n.t('buttons.save')}</button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  formValid() {
    return this.state.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let test_rule = _.omit(this.state, 'errors');
    let formData = new FormData();
    for(let key of Object.keys(test_rule)) {
      formData.append('test_rule[' + key + ']', test_rule[key]);
    }

    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let method = this.props.test_rule.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if (this.props.test_rule.id) {
        this.props.handleAfterUpdated(response.data.test_rule)
      } else {
        this.props.afterCreateTestRule(response.data.test_rule)
      }
      $('.modalForm').modal('hide');
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors})});
  }
}
