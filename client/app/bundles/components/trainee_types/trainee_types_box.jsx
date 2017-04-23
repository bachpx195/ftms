import React from 'react';
import axios from 'axios';

import TraineeTypeLists from './trainee_type_lists';
import Form from './form';

import * as routes from 'config/routes';

export default class TraineeTypeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainee_types: props.trainee_types,
      trainee_type: {}
    };
  }

  render() {
    return (
      <div className='row trainee_types'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('trainee_types.titles.all')}</h3>

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
                    trainee_type={this.state.trainee_type}
                    url={routes.trainee_types_url()}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>
            <div className='box-footer'>
              <TraineeTypeLists trainee_types={this.state.trainee_types}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(trainee_type) {
    this.state.trainee_types.push(trainee_type);
    this.setState({
      trainee_types: this.state.trainee_types,
      trainee_type: {}
    });
  }

  handleAfterUpdated(new_trainee_type) {
    let index = this.state.trainee_types
      .findIndex(trainee_type => trainee_type.id === new_trainee_type.id);
    this.state.trainee_types[index] = new_trainee_type;
    this.setState({
      trainee_types: this.state.trainee_types,
      trainee_type: {}
    });
  }

  handleAfterDeleted(deleted_trainee_type) {
    _.remove(this.state.trainee_types,
      trainee_type => trainee_type.id === deleted_trainee_type.id);
    this.setState({trainee_types: this.state.trainee_types});
  }
}
