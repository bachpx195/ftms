import React from 'react';

import SelectSell from '../shareds/select_cell';
import Checkbox from '../shareds/checkbox';
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

    const CheckboxFunction = ({griddleKey}) => {
      var checked = false;
      if (this.state.check_all == 'yes') {
        checked = true;
        this.updateStateFunctions(griddleKey, checked);
      } else if (this.state.check_all == 'no') {
        checked = false;
        this.updateStateFunctions(griddleKey, checked);
      } else if (this.state.check_all == 'none') {
        var func = this.state.functions[griddleKey];
        checked = func.checked
      }

      return (
        <Checkbox handleClick={this.handleCheckbox.bind(this)}
          index={griddleKey} is_checked={checked} />
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
            <ColumnDefinition customComponent={CheckboxFunction.bind(this)}
              customHeadingComponent={SelectSellBox}/>
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      check_all: 'none',
      functions: nextProps.functions
    });
  }

  handleSelectCell(event){
    var checked = $(event.target).is(':checked');
    this.setState({
      check_all: checked ? 'yes' : 'no',
    });
  }

  updateStateFunctions(griddleKey, checked){
    this.state.functions[griddleKey].checked = checked;
    var default_checked = this.state.functions[griddleKey].default_checked;
    if(checked != default_checked)
      this.state.functions[griddleKey].is_changed = true;
    else
      this.state.functions[griddleKey].is_changed = false;
  }

  handleCheckbox(griddleKey, checked){

    this.updateStateFunctions(griddleKey, checked);
    this.setState({
      functions: this.state.functions,
      check_all: 'none'
    });
  }

  handlePage(){
    this.setState({
      check_all: 'none',
    });
  }
}
