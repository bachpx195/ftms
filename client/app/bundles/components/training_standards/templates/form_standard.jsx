import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import _ from 'lodash';

export default class FormStandard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.evaluation_standard.name || '',
      min_point: props.evaluation_standard.min_point || 0,
      max_point: props.evaluation_standard.max_point || 0,
      average_point: props.evaluation_standard.average_point || 0,
      errors: null
    };
  }

  render() {
    return (
      <div className='modal-body'>
        <div className='row'>
          <div className='col-sm-12 form-group'>
            <label>{I18n.t('evaluation_standards.headers.name')}</label>
            <input type='text' value={this.state.name}
              onChange={this.handleChange.bind(this)}
              className='form-control' name='name' />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4 form-group'>
            <label>{I18n.t('evaluation_standards.headers.min_point')}</label>
            <input type='number' value={this.state.min_point}
              onChange={this.handleChange.bind(this)}
              className='form-control' name='min_point' min='0'/>
          </div>
          <div className='col-sm-4 form-group'>
            <label>{I18n.t('evaluation_standards.headers.max_point')}</label>
            <input type='number' value={this.state.max_point}
              onChange={this.handleChange.bind(this)}
              className='form-control' name='max_point' min='0' />
          </div>
          <div className='col-sm-4 form-group'>
            <label>{I18n.t('evaluation_standards.headers.average_point')}</label>
            <input type='number' value={this.state.average_point}
              onChange={this.handleChange.bind(this)}
              className='form-control' name='average_point' min='0' />
          </div>
        </div>
        <div className='row'>
          <div className='form-group'>
            <div className='text-right'>
              <button type='submit' className='btn btn-primary'
                disabled={!this.formValidEvaluationStandard()}
                onClick={this.handleCreateEvaluationStandard.bind(this)}>
                {I18n.t('buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.evaluation_standard.name || '',
      min_point: nextProps.evaluation_standard.min_point || 0,
      max_point: nextProps.evaluation_standard.max_point || 0,
      average_point: nextProps.evaluation_standard.average_point || 0,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value,
    });
  }

  formValidEvaluationStandard(){
    return this.state.name != '' && parseInt(this.state.min_point) > 0 &&
      parseInt(this.state.max_point) > 0 &&
      parseInt(this.state.max_point) > parseInt(this.state.min_point) &&
      parseInt(this.state.average_point) > 0 &&
      parseInt(this.state.average_point) > parseInt(this.state.min_point);
  }

  handleCreateEvaluationStandard(event) {
    event.preventDefault();
    let evaluation_standard = _.omit(this.state, 'errors');
    this.props.handleAfterSaved(evaluation_standard);
  }
}
