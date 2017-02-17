import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import StageLists from './stage_lists';

import * as app_constants from 'constants/app_constants';
import * as stage_constants from './stage_constants';

const STAGE_URL = app_constants.APP_NAME + stage_constants.ADMIN_STAGE_PATH;

export default class StageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: []
    };
  }

  componentWillMount() {
    this.fetchStages();
  }

  render () {
    return (
      <div className='row'>
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
                  <CreateForm afterCreate={this.afterCreate.bind(this)}/>
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <StageLists stages={this.state.stages}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(stage) {
    this.state.stages.push(stage);
    this.setState({stages: this.state.stages});
  }

  afterUpdate(old_stage, new_stage) {
    let found_item = _.findIndex(this.state.stages,
      stage => stage.id === old_stage.id);
    this.state.stages[found_item] = new_stage;
    this.setState({stages: this.state.stages});
  }

  afterDelete(deleted_stage) {
    _.remove(this.state.stages,
      stage => stage.id === deleted_stage.id);
    this.setState({stages: this.state.stages});
  }

  fetchStages() {
    axios.get(STAGE_URL + '.json')
      .then(response => this.setState({stages: response.data.stages}))
      .catch(response => console.log(response));
  }
}
