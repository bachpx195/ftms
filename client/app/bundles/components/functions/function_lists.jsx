import React from 'react';
import axios from 'axios';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';

export default class FunctionLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      functions: props.functions
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      functions: nextProps.functions
    });
  }

  
  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className="col-md-12">
        <div className="row">
          <div className="griddle-head clearfix">
            <div className="col-md-6">
              <Filter />
            </div>
            <div className="col-md-6 text-right">
              <Pagination />
            </div>
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <Griddle data={this.state.functions} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="id" 
              title={I18n.t("functions.table_position")}/>
            <ColumnDefinition id="humanize_name" 
              title={I18n.t("functions.humanize_name")} />
            <ColumnDefinition id="controller_name" 
              title={I18n.t("functions.controller_name")}/>
            <ColumnDefinition id="action" 
              title={I18n.t("functions.action")} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
