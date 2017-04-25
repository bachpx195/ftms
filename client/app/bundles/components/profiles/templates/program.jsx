import React from 'react';
import TrainingStandards from './training_standards';

import * as routes from 'config/routes';

export default class Programs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: props.programs,
    };
  }

  renderListPrograms(programs) {
    return _.map(programs, program => {
      return (
        <div key={program.program.id}
          className="box td-profile-program collapsed-box">
          <div className="box-header with-border">
            <i className="fa fa-envelope"></i>
            <h3 className="box-title">{program.program.name}</h3>
            <div className="box-tools pull-right">
              <button type="button" className="btn btn-box-tool"
                data-widget="collapse"><i className="fa fa-plus"></i>
              </button>
              <button type="button" className="btn btn-box-tool"
                data-widget="remove"><i className="fa fa-times"></i></button>
            </div>
          </div>
          <div className="box-body">
            <TrainingStandards
              training_standards={program.program.training_standards}
            />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='clearfix'>
        {this.renderListPrograms(this.state.programs)}
      </div>
    );
  }
}
