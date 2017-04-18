import Highcharts from 'highcharts';
import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class PieChart extends React.Component {
  render() {
    let config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: false,
      tooltip: {
        formatter: function () {
          return I18n.t('statistics.trainee_types.headers.trainee_type') + ': '
            + '<strong>' + this.key + '</strong>' + ' <br/>'
            + I18n.t('statistics.trainee_types.series_name') + ': '
            + '<strong>' + this.y + '</strong>';
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.extraValue}'
          },
          showInLegend: true
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
