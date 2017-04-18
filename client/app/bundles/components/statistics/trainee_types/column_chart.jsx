import Highcharts from 'highcharts';
import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ColumnChart extends React.Component {
  render() {
    let config = {
      chart: {
        type: 'column'
      },
      title: {
        text: false
      },
      xAxis: {
        categories: this.props.trainee_types,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: I18n.t('statistics.trainee_types.y_axis.title')
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none'
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
      series: this.props.trainees_by_trainee_types
    };

    return (
      <div>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}
