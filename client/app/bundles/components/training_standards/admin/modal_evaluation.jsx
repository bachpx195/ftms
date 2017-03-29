import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import _ from 'lodash';
import FormStandard from './form_standard';
import * as app_constants from 'constants/app_constants';
import CSS from '../../sass/training_standard_show.scss';

export default class ModalEvaluation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.evaluation_template.name || '',
      evaluation_standards: props.evaluation_standards,
      evaluation_standard: {},
      showForm: props.showForm,
      errors: null,
    };
  }

  renderEvaluationStandards(){
    return this.state.evaluation_standards.map((evaluation_standard, index) =>
     {
      return (
        <div key={index} className='one-item'>
          <div className='index-nonselect col-md-1'>
            {index+1}.
          </div>
          <div className='content-item col-md-11' data-name=''>
            {evaluation_standard.name}
          </div>
        </div>
      );
    });
  }
  renderCount(){
    let array = this.state.evaluation_standards;
    return array.length + ' ';
  }

  renderFormStandard(){
    if(this.state.showForm){
      return (
        <FormStandard evaluation_standard={this.state.evaluation_standard}
          handleAfterSaved={this.handleAfterSaved.bind(this)} />);
    }else{
      return null;
    }
  }
  renderIcon(){
    if(this.state.showForm){
      return (
        <i className='fa fa-minus pull-right'
          aria-hidden='true'></i>)
    }else{
      return (
        <i className='fa fa-plus pull-right'
          aria-hidden='true'></i>)
    }
  }

  render(){
    return(
      <div>
        <div id='modalEvaluation' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>
                  {I18n.t('training_standards.create_evaluation')}
                </h4>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <input type='text' name='name' ref="nameField"
                      onChange={this.handleChange.bind(this)}
                      className='form-control'
                      value={this.state.name}
                      placeholder={I18n.t('evaluation_templates.headers.name')} />
                  </div>
                  <div>
                    <div className='panel panel-info noneselected-list-standards'>
                      <div className='panel-heading text-center'>
                        {I18n.t('training_standards.create_standard')}
                        <a className='new-evaluation-standard'
                          onClick={this.createEvaluationStandard.bind(this)}>
                          {this.renderIcon()}
                        </a>
                      </div>
                      <div className='panel-body list-group
                        noneselected-evaluation-standards'>
                        {this.renderFormStandard()}
                        {this.renderEvaluationStandards()}
                      </div>
                      <div className='panel-footer text-right size-nonselect'>
                        {this.renderCount()}
                        {I18n.t('training_standards.records')}
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='text-right'>
                      <button type='submit' className='btn btn-primary'
                        disabled={!this.formValid()}>
                        {I18n.t('buttons.save')}</button>
                    </div>
                  </div>
                </form>
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      evaluation_standards: nextProps.evaluation_standards,
      name: nextProps.evaluation_template.name || '',
      showForm: nextProps.showForm,
    })
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid(){
    return this.state.name != '';
  }

  createEvaluationStandard(){
    let show = this.state.showForm ? '' : {};
    this.setState({
      evaluation_standard: {},
      showForm: show,
    });
  }

  handleAfterSaved(new_evaluation_standard){
    this.state.evaluation_standards.push(new_evaluation_standard);
    this.setState({
      evaluation_standards: this.state.evaluation_standards,
      showForm: '',
    });
    $('#modalStandard').modal('hide');
  }

  handleSubmit(event) {
    event.preventDefault();
    let evaluation_standards = this.state.evaluation_standards;
    axios.post(this.props.url, {
      evaluation_template: {name: this.refs.nameField.value,
      evaluation_standards_attributes: evaluation_standards},
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        $('#modalEvaluation').modal('hide');
        this.refs.nameField.value = '';
        this.setState({
          evaluation_standard: {},
          evaluation_template: {},
          errors: null
        });
        window.location.href = this.props.url;
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
