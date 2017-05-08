import Errors from '../../../shareds/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class TrainingStandardStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      policy: POLICIES[0].id,
      errors: '',
    }
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return (
          <option key={object.id} value={object.id}>
            {object.name}
          </option>);
      });
    }
    return null;
  }

  render() {
    return (
      <fieldset>
        <Errors errors={this.state.errors} />
        <div className='form-group row'>
          <label className='col-md-2'>
            {I18n.t('training_standards.headers.name')}
          </label>
          <div className='col-md-10'>
            <input type='text'
              value={this.state.name} ref='nameField'
              onChange={this.handleTrainingStandardInfo.bind(this)}
              className='form-control' name='name' />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-md-2'>
            {I18n.t('training_standards.headers.description')}
          </label>
          <div className='col-md-10'>
            <input type='text'
              value={this.state.description} ref='nameField'
              onChange={this.handleTrainingStandardInfo.bind(this)}
              className='form-control' name='description' />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-md-2'>
            {I18n.t('training_standards.headers.policy')}
          </label>
          <div className='col-md-10'>
            <select className='form-control'
              value={this.state.policy} name='policy'
              onChange={this.handleTrainingStandardInfo.bind(this)}>
              {this.renderOptions(POLICIES)}
            </select>
          </div>
        </div>
        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button' value='Cancel'
            onClick={this.props.onCancelForm}/>
          <input type='button' name='next' className='next action-button' value='Next'
            onClick={this.handleNext.bind(this)}/>
        </div>
      </fieldset>
    );
  }

  handleTrainingStandardInfo(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
    this.props.handleInfoChanged(_.omit(this.state, 'errors'));
  }

  handleNext(event) {
    if (this.state.name == '') {
      this.setState({
        errors: I18n.t('training_standards.errors.blank_name'),
      });
    } else {
      this.props.handleInfoChanged(_.omit(this.state, 'errors'));
      this.props.onClickNext(event);
    }
  }
}
