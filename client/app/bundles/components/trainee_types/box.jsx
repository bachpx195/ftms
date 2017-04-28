import axios from 'axios';
import Form from './templates/form';
import React from 'react';
import TraineeTypeLists from './trainee_types';
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
                    url={routes.trainee_types_url()}
                    handleAfterCreated={this.handleAfterCreated.bind(this)} />
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

  handleAfterCreated(response) {
    let trainee_type = response.data.trainee_type;
    this.state.trainee_types.push(trainee_type);
    this.setState({
      trainee_types: this.state.trainee_types,
      trainee_type: {}
    });
  }

  handleAfterUpdated(response) {
    let new_trainee_type = response.data.trainee_type
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
