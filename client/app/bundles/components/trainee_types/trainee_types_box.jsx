import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import CreateForm from './create_form';
import TraineeTypeLists from './trainee_type_lists';

import * as app_constants from 'constants/app_constants';
import * as trainee_type_contanst from './trainee_type_constants';

const TRAINEE_TYPE_URL = app_constants.APP_NAME + trainee_type_contanst.ADMIN_TRAINEE_TYPE_PATH;

export default class TraineeTypeBox extends React.Component {
  constructor(props){
    super(props);

    this.state = { trainee_types: [] };
  }

  componentWillMount() {
    this.fetchTraineeTypes();
  }

  fetchTraineeTypes() {
    axios.get(TRAINEE_TYPE_URL + '.json')
      .then(response => {
        this.setState({trainee_types: response.data.trainee_types})
      })
      .catch(response => console.log(response));
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('trainee_type.titles.all')}</h3>

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

              <TraineeTypeLists
                trainee_types = {this.state.trainee_types}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>      
    );
  }

  afterCreate(trainee_type) {
    this.state.trainee_types.push(trainee_type);
    this.setState({trainee_types: this.state.trainee_types});
  }

  afterUpdate(old_trainee_type, new_trainee_type) {
    let found_item = _.findIndex(this.state.trainee_types,
      trainee_type => trainee_type.id === old_trainee_type.id);
    this.state.trainee_types[found_item] = new_trainee_type;
    this.setState({trainee_types: this.state.trainee_types});
  }

  afterDelete(deleted_trainee_type) {
    _.remove(this.state.trainee_types,
      trainee_type => trainee_type.id === deleted_trainee_type.id);
    this.setState({trainee_types: this.state.trainee_types});
  }
}
