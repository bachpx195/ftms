import React from 'react';
import axios from 'axios';

import StageLists from './stage_lists';
import Form from './form';

import * as app_constants from 'constants/app_constants';
import * as stage_constants from './stage_constants';

const STAGE_URL = app_constants.APP_NAME + stage_constants.ADMIN_STAGE_PATH;

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
                    url={STAGE_URL}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <StageLists stages={this.state.stages}
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
