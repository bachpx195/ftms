import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import TrainingStandardList from './training_standard_list';

import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './training_standard_constants';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + training_standard_constants.ADMIN_TRAINING_STANDARD_PATH;

export default class TrainingStandardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {training_standards: []};
  }

  componentWillMount() {
    this.fetchTrainingStandards();
  }

  fetchTrainingStandards() {
    axios.get(TRAINING_STANDARD_URL + '.json')
      .then(response => {
        this.setState({training_standards: response.data.training_standards});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('training_statndard.titles.all')}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                  <CreateForm afterCreate={this.afterCreate.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <TrainingStandardList training_standards={this.state.training_standards}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(training_standard) {
    this.state.training_standards.push(training_standard);
    this.setState({training_standards: this.state.training_standards});
  }

  afterUpdate(old_training_standard, new_training_standard) {
    let found_item = _.findIndex(this.state.training_standards,
      training_standard => training_standard.id === old_training_standard.id);
    this.state.training_standards[found_item] = new_training_standard;
    this.setState({training_standards: this.state.training_standards});
  }

  afterDelete(deleted_training_standard) {
    _.remove(this.state.training_standards, training_standard => training_standard.id === deleted_training_standard.id);
    this.setState({ training_standards: this.state.training_standards });
  }
}
