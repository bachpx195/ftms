import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './constants/training_standard_constants';
import axios from 'axios';
import Create from './actions/create';
import FilterShared from './templates/filter_shared';
import Form from './templates/form';
import TrainingStandards from './training_standards';
import React from 'react';

const TRAINING_STANDARD_URL = app_constants.APP_NAME +
  training_standard_constants.TRAINING_STANDARD_PATH;
const STANDARD_SUBJECTS_URL = app_constants.APP_NAME +
  training_standard_constants.STANDARD_SUBECTS_PATH;

export default class TrainingStandardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standards: props.training_standards,
      organization: props.organization,
      training_standard: {}
    }
  }

  render() {
    return (
      <div className='row training_standards'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('training_standards.titles.all')}</h3>
              <div className='box-tools pull-right'>
                <button type="button" className='btn btn-box-tool' data-widget="collapse">
                  <i className='fa fa-minus'></i>
                </button>
                <button type="button" className='btn btn-box-tool' data-widget="remove">
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <FilterShared organization={this.state.organization}
                handleAfterFilterShared={this.handleAfterFilterShared.bind(this)} />
              <Create
                training_standard={this.state.training_standard}
                organization={this.state.organization}
                handleAfterCreated={this.handleAfterCreated.bind(this)} />
              <TrainingStandards
                training_standard={this.state.training_standard}
                training_standards={this.state.training_standards}
                organization={this.state.organization}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

    handleAfterFilterShared(new_training_standards) {
      this.setState({
        training_standards: new_training_standards
      });
    }

    handleAfterCreated(training_standard) {
      this.state.training_standards.push(training_standard);
      this.setState({
        training_standards: this.state.training_standards,
        training_standard: {}
      });
    }

    handleAfterUpdated(new_training_standard) {
      let index = this.state.training_standards
        .findIndex(training_standard => training_standard.id === new_training_standard.id);
      this.state.training_standards[index] = new_training_standard;
      this.setState({
        training_standards: this.state.training_standards,
        training_standard: {}
      });
    }

    handleAfterDeleted(deleted_training_standard) {
      _.remove(this.state.training_standards,
        training_standard => training_standard.id === deleted_training_standard.id);
      this.setState({training_standards: this.state.training_standards});
    }
}
