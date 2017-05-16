import Errors from 'shared/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class TrainingStandardStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard || {
        name: '', description: '', policy: POLICIES[0].id
      },
      errors: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      training_standard: nextProps.training_standard,
      errors: '',
    });
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
              value={this.state.training_standard.name || ''} ref='nameField'
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
              value={this.state.training_standard.description || ''} ref='nameField'
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
              value={this.state.training_standard.policy || POLICIES[0].id}
              name='policy' onChange={this.handleTrainingStandardInfo.bind(this)}>
              {this.renderOptions(POLICIES)}
            </select>
          </div>
        </div>
        <div className='col-md-12'>
          <input type='button' name='cancel' className='cancel cancel-button pull-left'
            value='Cancel' onClick={this.handleCancelForm.bind(this)}/>
          <input type='button' name='next' className='next action-button pull-right'
            value='Next' onClick={this.handleNext.bind(this)}/>
        </div>
      </fieldset>
    );
  }

  handleTrainingStandardInfo(event) {
    let attribute = event.target.name;
    Object.assign(this.state.training_standard, {[attribute]: event.target.value});
    this.setState({
      training_standard: this.state.training_standard,
    });
    this.props.handleInfoChanged(this.state.training_standard);
  }

  handleCancelForm(event) {
    this.props.handleResetForm();
    this.props.onCancelForm(event);
  }

  handleNext(event) {
    let name = this.state.training_standard.name;
    if (name == undefined || name == '') {
      this.setState({
        errors: I18n.t('training_standards.errors.blank_name'),
      });
    } else {
      this.props.onClickNext(event);
    }
  }
}
