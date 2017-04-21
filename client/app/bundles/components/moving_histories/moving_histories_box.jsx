import React from 'react';
import axios from 'axios';

import MovingHistoryLists from './moving_history_lists';
import RightSidebar from './right_sidebar';

require('./moving_histories.scss');

export default class MovingHistoryBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_moving_histories:
      this.props.organization_moving_histories || [],
    };
  }

  render() {
    return (
      <div className='row'>
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
