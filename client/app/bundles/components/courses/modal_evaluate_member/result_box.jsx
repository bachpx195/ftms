import React from 'react';
import axios from 'axios';

import * as routes from 'config/routes';

export default class ResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_result: props.training_result,
      total_point: props.total_point,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      training_result: nextProps.training_result,
      total_point: nextProps.total_point,
    });
  }

  render() {
    let rank = this.state.training_result.name || '';

    return (
      <li className='list-group-item result-box'>
        <div className='row'>
          <div className='col-md-3'>
            <label>{I18n.t('courses.evaluation.total_point')}</label>
          </div>
          <div className='col-md-2'>
            <label className='total-min-point text-warning'>
              <strong>{this.totalMinPoint()}</strong>
            </label>
          </div>
          <div className='col-md-2'>
            <label className='total-max-point text-warning'>
              <strong>{this.totalMaxPoint()}</strong>
            </label>
          </div>
          <div className='col-md-3 text-right'>
            <input className='text-danger text-right'
              type='number' step='1' min='0'
              disabled='true' value={this.state.total_point} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <strong className='pull-right'>
              <span className={'training-result ' + rank.toLowerCase()}>
                {rank}
              </span>
            </strong>
          </div>
        </div>
      </li>
    );
  }

  totalMinPoint() {
    let total = 0;
    $('.min-point').map(function(key, value) {
      total += $(value).data('point');
    });
    return total;
  }

  totalMaxPoint() {
    let total = 0;
    $('.max-point').map(function(key, value) {
      total += $(value).data('point');
    });
    return total;
  }

  totalAveragePoint() {
    let total = 0;
    $('.average-point').map(function(key, value) {
      total += $(value).data('point');
    });
    return total;
  }
}
