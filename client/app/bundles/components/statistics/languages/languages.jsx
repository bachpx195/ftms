import ColumnChart from "./column_chart";
import LanguagesTable from "./table";
import PieChart from "./pie_chart";
import React from 'react';

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

    return (
      <div className='row'>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('statistics.languages.title')}
            </h3>

            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool"
                data-widget="collapse">
                <i className="fa fa-minus"></i>
              </button>
              <button type="button" className="btn btn-box-tool"
                data-widget="remove">
                <i className="fa fa-times"></i>
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
