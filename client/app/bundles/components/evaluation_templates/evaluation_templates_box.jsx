import React from 'react';
import axios from 'axios';
import Form from './form';
import EvaluationStandardsList from './evaluation_standards_list';
import * as app_constants from 'constants/app_constants';
import * as evaluation_template_constants from './evaluation_template_constants';

export default class EvaluationTemplatesBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluation_standards: props.evaluation_standards || [],
      evaluation_template: props.evaluation_template || {},
      showForm: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      evaluation_standards: props.evaluation_standards || [],
      evaluation_template: nextProps.evaluation_template || {},
      showForm: false
    });
  }

  render() {
    let form = null;
    if(this.state.showForm) {
      const url = app_constants.APP_NAME +
        evaluation_template_constants.TRAINING_STANDARD_PATH +
        this.props.training_standard.id + '/' +
        evaluation_template_constants.EVALUATION_TEMPLATE_PATH;
      form = <Form evaluation_template={this.state.evaluation_template}
        url={url} handleAfterSaved={this.handleAfterSaved.bind(this)}
        handleCancel={this.handleCancel.bind(this)} />;
    }

    let button = null;
    let buttonDelete = null;
    if(!this.state.evaluation_template.id){
      button = <button type="button" className="btn btn-info"
        onClick={this.handleClickButton.bind(this)}>
        <i className="fa fa-plus"></i> {I18n.t('buttons.new')}
      </button>;
    } else {
      button = <button type="button" className="btn btn-info"
        onClick={this.handleClickButton.bind(this)}>
        <i className="fa fa-pencil"></i> {I18n.t('buttons.edit')}
      </button>;
      buttonDelete = <button className="btn btn-danger"
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>;
    }

    return (
      <div className='row evaluation_templates' id='admin-evaluation_templates'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {I18n.t('evaluation_templates.title')} : {this.state.evaluation_template.name}
              </h3>
              <div className="box-tools pull-right">
                {button} {buttonDelete}
              </div>
            </div>

            <div className='box-body'>
              <div className='col-md-8 col-md-offset-2'>
                {form}
              </div>
              <div className="clearfix"></div>
              <EvaluationStandardsList
                evaluation_template={this.state.evaluation_template}
                evaluation_standards={this.state.evaluation_standards}
                handleAfterCreated={this.handleAfterCreatedStandard.bind(this)}
                handleAfterUpdated={this.handleAfterUpdatedStandard.bind(this)}
                handleAfterDeleted={this.handleAfterDeletedStandard.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreatedStandard(new_standard) {
    this.state.evaluation_standards.push(new_standard);
    this.setState({
      evaluation_standards: this.state.evaluation_standards
    })
  }

  handleAfterUpdatedStandard(new_standard) {
    let index = this.state.evaluation_standards
      .findIndex(standard => standard.id === new_standard.id);
    this.state.evaluation_standards[index] = new_standard;
    this.setState({
      evaluation_standards: this.state.evaluation_standards
    });
  }

  handleAfterDeletedStandard(deleted_standard) {
    _.remove(this.state.evaluation_standards,
      standard => standard.id === deleted_standard.id);
    this.setState({evaluation_standards: this.state.evaluation_standards});
  }

  handleClickButton() {
    this.setState({showForm: true});
  }

  handleCancel() {
    this.setState({showForm: false});
  }

  handleAfterSaved(evaluation_template) {
    this.setState({
      evaluation_template: evaluation_template,
      showForm: false
    });
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const url = app_constants.APP_NAME +
        evaluation_template_constants.TRAINING_STANDARD_PATH +
        this.props.training_standard.id + '/' +
        evaluation_template_constants.EVALUATION_TEMPLATE_PATH;
      axios.delete(url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          evaluation_template: {},
          evaluation_standards: [],
          showForm: false
        });
      })
      .catch(error => console.log(error));
    }
  }
}
