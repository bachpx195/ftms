import ColumnChart from './column_chart';
import TraineeTypeTable from './table';
import PieChart from './pie_chart';
import React from 'react';

import * as routes from 'config/routes';

export default class StatisticsTraineeTypeBox extends React.Component {
  render() {
    const Chart = () => {
      if (this.props.organization) {
        return (
          <PieChart trainee_types={this.props.trainee_types}
            trainees_by_trainee_types={this.props.trainees_by_trainee_types} />
        );
      } else {
        return (
          <ColumnChart trainee_types={this.props.trainee_types}
            trainees_by_trainee_types={this.props.trainees_by_trainee_types} />
        );
      }
    }

    const Statistics = () => {
      if (this.props.organization) {
        return (
          <div className='btn-group'>
            <button className='btn btn-box-tool dropdown-toggle'
              type='button' data-toggle='dropdown' aria-expanded='false'>
              <i className='fa fa-bars' aria-hidden='true'></i>
            </button>
            <ul className='dropdown-menu' role='menu'>
              <li>
                <a href={routes.organization_statistics_in_outs_url(
                  this.props.organization.id)}>
                  {I18n.t('sidebar.statistics.in_outs')}
                </a>
              </li>
              <li className='divider'></li>
              <li>
                <a href={routes.organization_statistics_languages_url(
                  this.props.organization.id)}>
                  {I18n.t('sidebar.trainee_types')}
                </a>
              </li>
            </ul>
          </div>
        );
      }

      return null;
    }

    return (
      <div className='row'>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('statistics.trainee_types.title')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <Statistics />
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>

          <div className='box-body no-padding'>
            <div className='trainee_types'>
              <Chart />
            </div>
          </div>
        </div>

        <TraineeTypeTable
          trainees_by_trainee_types_table={this.props.trainees_by_trainee_types_table}/>
      </div>
    );
  }
}
