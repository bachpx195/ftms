import axios from 'axios';
import Create from './actions/create';
import FilterShared from './templates/filter_shared';
import React from 'react';
import TrainingStandards from './training_standards';

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
                subjects={this.props.subjects}
                handleAfterCreated={this.handleAfterCreated.bind(this)} />
              <TrainingStandards
                training_standard={this.state.training_standard}
                training_standards={this.state.training_standards}
                organization={this.state.organization}
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
}
