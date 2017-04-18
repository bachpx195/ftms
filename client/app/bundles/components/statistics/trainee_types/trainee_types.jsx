import ColumnChart from "./column_chart";
import TraineeTypeTable from "./table";
import PieChart from "./pie_chart";
import React from 'react';

export default class StatisticsLanguageBox extends React.Component {
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

    return (
      <div className='row'>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('statistics.trainee_types.title')}
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
