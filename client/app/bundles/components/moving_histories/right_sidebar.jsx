import React from 'react';
import axios from 'axios';

import MovingHistoryLists from './moving_history_lists';
import * as app_constants from 'constants/app_constants';
import * as moving_history_constants from './moving_history_constants';

const MOVING_HISTORIES_URL = app_constants.APP_NAME
  + moving_history_constants.MOVING_HISTORIES_PATH

export default class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_moving_histories: props.organization_moving_histories,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization_moving_histories: nextProps.organization_moving_histories
    });
  }

  render() {
    let organization_moving_histories = this.state.organization_moving_histories;
    let count_moving_histories = organization_moving_histories.length;
    let organization_name = '';

    if(count_moving_histories > 0) {
      organization_name = organization_moving_histories[0].organization_name;
    }

    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              <strong>{I18n.t('moving_histories.info_box.title')}</strong>
            </h3>
          </div>
          <div className='box-body'>
            <div className='member-title'>
              <i className='fa fa-building-o' aria-hidden='true'></i>
              <strong>
                {I18n.t('moving_histories.organization_name')}:
              </strong>
              {organization_name}
            </div>
            <br />
            <div className='member-title'>
              <i className='fa fa-users' aria-hidden='true'></i>
              <strong>
                {I18n.t('moving_histories.info_box.count_transfer')}:
              </strong>
              <span className='badge label-primary'>
                {count_moving_histories}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
