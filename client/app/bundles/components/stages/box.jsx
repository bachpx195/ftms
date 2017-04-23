import React from 'react';
import axios from 'axios';

import Stages from './stages';
import Form from './templates/form';
import Breadcrumb from '../shareds/bread_crumb/bread_crumb';

import * as app_constants from 'constants/app_constants';

const STAGES_URL = app_constants.APP_NAME + app_constants.STAGES_PATH;

export default class StageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: props.stages,
      stage: {}
    };
  }

  render() {
    return (
      <div className='row stages'>
        <Breadcrumb
          path={
            [
              {
                path: app_constants.APP_NAME,
                label: I18n.t('breadcrumbs.home'),
              },
              {
                path: STAGES_URL,
                label: I18n.t('breadcrumbs.stages'),
              }
            ]
          }
        />
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('stages.titles.all')}</h3>

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
                    stage={this.state.stage}
                    url={STAGES_URL}
                    handleAfterCreated={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <Stages stages={this.state.stages}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(stage) {
    this.state.stages.push(stage);
    this.setState({
      stages: this.state.stages,
      stage: {}
    });
  }

  handleAfterUpdated(new_stage) {
    let index = this.state.stages
      .findIndex(stage => stage.id === new_stage.id);
    this.state.stages[index] = new_stage;
    this.setState({
      stages: this.state.stages,
      stage: {}
    });
  }

  handleAfterDeleted(deleted_stage) {
    _.remove(this.state.stages,
      stage => stage.id === deleted_stage.id);
    this.setState({stages: this.state.stages});
  }
}
