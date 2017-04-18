import React from 'react';
import InOutOrganization from "./in_out_organization";
import TraineeInChart from "./in_chart";
import TraineeOutChart from "./out_chart";

export default class StatisticsInOutBox extends React.Component {
  render() {
    const Chart = () => {
      if (this.props.organization) {
        return (
          <InOutOrganization months={this.props.months}
            trainees_in_outs={this.props.trainees_in_outs} />
        );
      } else {
        return (
          <div>
            <TraineeInChart months={this.props.months}
              trainees_in={this.props.trainees_in_outs.trainees_in} />
            <TraineeOutChart months={this.props.months}
              trainees_out={this.props.trainees_in_outs.trainees_out} />
          </div>
        );
      }
    }

    return (
      <div className='row'>
        <Chart />
      </div>
    );
  }
}
