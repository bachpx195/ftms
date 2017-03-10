import React from 'react';
import { connect } from 'react-redux';

import CheckboxRole from './check_role_box';
import * as table_constants from 'constants/griddle_table_constants';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class RoleFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functions: props.dataRole.functions
    }
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

    const CheckBox = (griddleKey) => {
      var func = this.state.functions[griddleKey.griddleKey];
      var checked = func.role_func_id ? true : false;
      if(checked){
        var role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
        role_checkbox[griddleKey.griddleKey] = true;
        localStorage.setItem('role_checkbox', JSON.stringify(role_checkbox));
      }
      return (
        <CheckboxRole griddleKey={griddleKey} is_checked={checked}/>
      );

    };

    return (
      <div>
        <Griddle data={this.state.functions} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}
          onRowClick={this.onRowClick}>
          <RowDefinition keyColumn="id">
            <ColumnDefinition id="id"
              title={I18n.t("functions.table_position")}/>
            <ColumnDefinition id="controller_name"
              title={I18n.t("functions.controller_name")}/>
            <ColumnDefinition id="action"
              title={I18n.t("functions.action")} />
            <ColumnDefinition id="action"
              title={I18n.t("functions.action")} />
            <ColumnDefinition customComponent={CheckBox.bind(this)}
              title="  " />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      functions: nextProps.dataRole.functions
    })
  }
}
