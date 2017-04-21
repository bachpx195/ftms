import Highcharts from 'highcharts';
import React from 'react';
import ReactHighcharts from 'react-highcharts';

import * as routes from 'config/routes';

export default class InOutOrganization extends React.Component {
  render() {
    let config = {
      chart: {
        type: 'line'
      },
      title: {
        text: false
      },
      xAxis: {
        categories: this.props.months,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: I18n.t('statistics.languages.y_axis.title')
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: this.props.trainees_in_outs
    };

    return (
      <div>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('statistics.in_outs.titles.all')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <div className='btn-group'>
                <button className='btn btn-box-tool dropdown-toggle'
                  type='button' data-toggle='dropdown' aria-expanded='false'>
                  <i className='fa fa-bars' aria-hidden='true'></i>
                </button>
                <ul className='dropdown-menu' role='menu'>
                  <li>
                    <a href={routes.organization_statistics_languages_url(
                      this.props.organization.id)}>
                      {I18n.t('sidebar.languages')}
                    </a>
                  </li>
                  <li className='divider'></li>
                  <li>
                    <a href={routes.organization_statistics_trainee_types_url(
                      this.props.organization.id)}>
                      {I18n.t('sidebar.trainee_types')}
                    </a>
                  </li>
                </ul>
              </div>
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>

          <div className='box-body no-padding'>
            <ReactHighcharts config={config} />
          </div>
        </div>
      </div>
    );
  }
}
