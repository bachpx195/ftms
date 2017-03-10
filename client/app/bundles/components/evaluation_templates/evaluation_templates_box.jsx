import React from 'react';
import axios from 'axios';
import Form from './form';

import * as app_constants from 'constants/app_constants';
import * as evaluation_template_constants from './evaluation_template_constants';

export default class EvaluationTemplatesBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluation_template: props.evaluation_template || {},
      showForm: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
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
                {this.props.training_standard.name} -
                  {I18n.t('evaluation_templates.title')}
              </h3>
              <div className="box-tools pull-right">
                {button} {buttonDelete}
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className="col-md-12">
                <p>{this.state.evaluation_template.name}</p>
              </div>
              <div className='col-md-8 col-md-offset-2'>
                {form}
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
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
          showForm: false
        });
      })
      .catch(error => console.log(error));
    }
  }
}
