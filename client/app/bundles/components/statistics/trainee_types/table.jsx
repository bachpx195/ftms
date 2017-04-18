import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from '../../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';

export default class StatisticsTraineeTypeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainees_by_trainee_types_table: props.trainees_by_trainee_types_table
    };
  }

  render() {
    {NewLayout}

    return (
      <div className='box box-success'>
        <div className='box-header with-border'>
          <h3 className='box-title'>{I18n.t('statistics.trainee_types.title')}</h3>

          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" data-widget="collapse">
              <i className="fa fa-minus"></i>
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="remove">
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>

        <div className='box-body no-padding'>
          <div>
            <Griddle data={this.state.trainees_by_trainee_types_table}
              plugins={[plugins.LocalPlugin]}
              components={{Layout: NewLayout}}
              styleConfig={table_constants.styleConfig}>
              <RowDefinition>
                <ColumnDefinition id="organization_name"
                  title={I18n.t("statistics.trainee_types.headers.organization")} />
                <ColumnDefinition id="trainee_type_name"
                  title={I18n.t("statistics.trainee_types.headers.trainee_type")}/>
                <ColumnDefinition id="number"
                  title={I18n.t("statistics.trainee_types.headers.number")} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }
}
