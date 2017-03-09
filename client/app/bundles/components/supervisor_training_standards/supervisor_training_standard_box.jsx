import React from 'react';
import axios from 'axios';

import Form from './form';
import TrainingStandardLists from './training_standard_lists';

import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './training_standard_constants';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + training_standard_constants.TRAINING_STANDARD_PATH;

export default class TrainingStandardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standard_organizations: props.standard_organizations,
      standard_organization: {},
    };
  }

  render() {
    return (
      <div className='row training_standards'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('training_standards.titles.all')}</h3>

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
                  <Form
                    url={TRAINING_STANDARD_URL}
                    standard_organization={this.state.standard_organization}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <TrainingStandardLists
                standard_organization={this.state.standard_organization}
                standard_organizations={this.state.standard_organizations}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(standard_organization) {
    this.state.standard_organizations.push(standard_organization);
    this.setState({
      standard_organizations: this.state.standard_organizations,
      standard_organization: {}
    });
  }

  handleAfterUpdated(new_standard_organization) {
    let index = this.state.standard_organizations
      .findIndex(standard_organization => standard_organization.id === new_standard_organization.id);
    this.state.standard_organizations[index] = new_standard_organization;
    this.setState({
      standard_organizations: this.state.standard_organizations,
      standard_organization: {}
    });
  }

  handleAfterDeleted(deleted_standard_organization) {
    _.remove(this.state.standard_organizations,
      standard_organization => standard_organization.id === deleted_standard_organization.id);
    this.setState({standard_organizations: this.state.standard_organizations});
  }
}
