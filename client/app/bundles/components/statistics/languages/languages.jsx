import ColumnChart from './column_chart';
import LanguagesTable from './table';
import PieChart from './pie_chart';
import React from 'react';

import * as app_constants from 'constants/app_constants';

export default class StatisticsLanguageBox extends React.Component {
  render() {
    const Chart = () => {
      if (this.props.organization) {
        return (
          <PieChart languages={this.props.languages}
            trainees_by_languages={this.props.trainees_by_languages} />
        );
      } else {
        return (
          <ColumnChart languages={this.props.languages}
            trainees_by_languages={this.props.trainees_by_languages} />
        );
      }
    }

    const Statistics = () => {
      if (this.props.organization) {
        let ORGANIZATION_URL = app_constants.APP_NAME + 'organizations' + '/' +
          this.props.organization.id + '/' + app_constants.STATISTICS_PATH;

        let STATISTIC_IN_OUTS_PATH = ORGANIZATION_URL +
          app_constants.IN_OUT_STATISTIC_PATH;

        let STATISTIC_TRAINEE_TYPE_PATH = ORGANIZATION_URL +
          app_constants.TRAINEE_TYPES_PATH;

        return (
          <div className='btn-group'>
            <button className='btn btn-box-tool dropdown-toggle'
              type='button' data-toggle='dropdown' aria-expanded='false'>
              <i className='fa fa-bars' aria-hidden='true'></i>
            </button>
            <ul className='dropdown-menu' role='menu'>
              <li>
                <a href={STATISTIC_IN_OUTS_PATH}>
                  {I18n.t('sidebar.statistics.in_outs')}
                </a>
              </li>
              <li className='divider'></li>
              <li>
                <a href={STATISTIC_TRAINEE_TYPE_PATH}>
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
              {I18n.t('statistics.languages.title')}
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
            <div className='languages'>
              <Chart />
            </div>
          </div>
        </div>

        <LanguagesTable
          trainees_by_languages_table={this.props.trainees_by_languages_table}/>
      </div>
    );
  }
}
