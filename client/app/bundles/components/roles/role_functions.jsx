import React from 'react';

import CheckboxRole from './check_role_box';
import SelectSell from './select_cell';
import * as table_constants from 'constants/griddle_table_constants';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class RoleFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_all: 'none',
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
              <Pagination />
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
      var checked = false;
      if (this.state.check_all == 'yes') {
        checked = true;
        changeLocalData(griddleKey.griddleKey, checked);
      } else if (this.state.check_all == 'no') {
        checked = false;
        changeLocalData(griddleKey.griddleKey, checked);
      } else if (this.state.check_all == 'none') {
        var func = this.state.functions[griddleKey.griddleKey];
          checked = func.role_func_id ? true : false;
          if (checked) {
            changeLocalData(griddleKey.griddleKey, checked);
          }
      }

      return (
        <CheckboxRole griddleKey={griddleKey} is_checked={checked}/>
      );
    };

    const SelectSellBox = () => {
      return (
        <SelectSell checked={this.state.check_all} handleSelectCell={this.handleSelectCell.bind(this)}/>
      );
    };

    return (
      <div>
        <Griddle data={this.state.functions} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}
          events={{
           onNext: this.handlePage.bind(this),
           onPrevious: this.handlePage.bind(this),
           onGetPage: this.handlePage.bind(this),
          }}>
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
    this.setState({
      functions: nextProps.functions
    })
  }

  handleSelectCell(event){
    var checked = $(event.target).is(':checked');
    this.setState({
      check_all: checked ? 'yes' : 'no',
    });
  }

  handlePage(){
    this.setState({
      check_all: 'none',
    });
  }
}
