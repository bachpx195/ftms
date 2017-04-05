import React from 'react';
import axios from 'axios';

import MovingHistoryLists from './moving_history_lists';
import RightSidebar from './right_sidebar';
import * as app_constants from 'constants/app_constants';
import * as moving_history_constants from './moving_history_constants';

require('./moving_histories.scss');

const MOVING_HISTORIES_URL = app_constants.APP_NAME
  + moving_history_constants.MOVING_HISTORIES_PATH

export default class MovingHistoryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_moving_histories: [],
    };
  }

  componentDidMount() {
    this.fetchOrganizationMovingHistories();
  }

  fetchOrganizationMovingHistories() {
    axios.get(MOVING_HISTORIES_URL + '.json')
      .then(response => {
        this.setState({
          organization_moving_histories: response.data.organization_moving_histories,
        });
      }).catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <div className='col-md-9'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {I18n.t('moving_histories.moving_history_box.title')}
              </h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>
            <div className='box-body no-padding'>
              <MovingHistoryLists
                organization_moving_histories={this.state.organization_moving_histories}
              />
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel'>
          <RightSidebar
            organization_moving_histories={this.state.organization_moving_histories}
          />
        </div>
      </div>
    );
  }
}
