import React from 'react';
import { connect } from 'react-redux';

import CheckboxRole from './check_role_box';
import SelectSell from './select_cell';
import * as table_constants from 'constants/griddle_table_constants';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class RoleFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.check_all = 'none';
    this.current_row = 0;
    this.select_sell_click = false;
    this.page_size = 10;
    this.state = {
      functions: props.functions,
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
              <Pagination onClick={this.onClick}/>
            </div>
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    );

    const changeLocalData = (key, value) => {
      var role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
      role_checkbox[key] = value;
      localStorage.setItem('role_checkbox', JSON.stringify(role_checkbox));
    };

    const CheckBox = (griddleKey) => {
      this.current_row++;
      if(!this.select_sell_click) {
        this.check_all = 'none';
      }

      if(!this.select_sell_click)
        this.check_all = 'none';

      var checked = false;
      if (this.check_all == 'yes') {
        checked = true;
        changeLocalData(griddleKey.griddleKey, checked);
      } else if (this.check_all == 'no') {
        checked = false;
        changeLocalData(griddleKey.griddleKey, checked);
      } else if (this.check_all == 'none') {
        var func = this.state.functions[griddleKey.griddleKey];
          checked = func.role_func_id ? true : false;
          if (checked) {
            changeLocalData(griddleKey.griddleKey, checked);
          }
      }

      if(this.current_row == this.page_size || griddleKey.griddleKey == (this.state.functions.length - 1)){
        this.current_row = 0;
        this.select_sell_click = false;
      }

      return (
        <CheckboxRole griddleKey={griddleKey} is_checked={checked}/>
      );
    };

    const SelectSellBox = () => {
      return (
        <SelectSell handleSelectCell={this.handleSelectCell.bind(this)}/>
      );
    };



    return (
      <div>
        <Griddle data={this.state.functions} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          resultsPerPage={this.pageSize}
          styleConfig={table_constants.styleConfig}>
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
              customHeadingComponent={SelectSellBox}/>
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.check_all = 'none';
    this.current_row = 0;
    this.select_sell_click = false;
    this.setState({
      functions: nextProps.functions
    })
  }

  handleSelectCell(){
    if(this.check_all == 'none'){
      this.check_all = 'yes';
    } else if(this.check_all == 'yes'){
      this.check_all = 'no';
    } else{
      this.check_all = 'yes';
    }
    this.select_sell_click = true;
  }
}
