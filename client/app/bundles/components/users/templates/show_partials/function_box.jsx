import * as react_table_ultis from 'shared/react-table/ultis';
import Checkbox from 'shared/checkbox';
import css from 'assets/sass/react-table.scss';
import React from 'react'
import ReactTable from 'react-table';
import SelectSell from 'shared/select_cell';

export default class FunctionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_all: props.check_all,
      functions: props.data,
      user_id: props.user_id,
      page_index: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      functions: nextProps.data,
      user_id: nextProps.user_id,
      check_all: nextProps.check_all,
      page_index: 0
    });
  }

  render(){
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => row.index + 1,
        hideFilter: true,
        style: {textAlign: 'right'},
        width: 50
      },
      {
        header: I18n.t('functions.controller_name'),
        accessor: 'controller_name'
      },
      {
        header: I18n.t('functions.action'),
        accessor: 'action'
      },
      {
        header: props => {
          return <SelectSell checked={this.state.check_all}
            handleSelectCell={this.handleSelectCell.bind(this)} />;
        },
        accessor: 'checkbox',
        render: row => {
          var checked = false;
          if (this.state.check_all == 'yes') {
            checked = true;
            this.updateStateFunctions(row.index, checked);
          } else if (this.state.check_all == 'no') {
            checked = false;
            this.updateStateFunctions(row.index, checked);
          } else if (this.state.check_all == 'none') {
            checked = row.row.checked;
          }
          return (
            <Checkbox handleClick={this.handleCheckbox.bind(this)}
              index={row.index} is_checked={checked} />
          );
        },
        hideFilter: true,
        sortable: false,
        style: {textAlign: 'center'},
        width: 50
      }
    ];

    return(
      <ReactTable
        className='-striped -highlight' data={this.state.functions}
        columns={columns} showFilters={true} page={this.state.page_index}
        onPageChange={this.onPageChange.bind(this)}
        defaultPageSize={react_table_ultis.defaultPageSize}
        defaultFilterMethod={react_table_ultis.defaultFilter}
      />
    );
  }

  handleSelectCell(event){
    var checked = $(event.target).is(':checked');
    this.setState({
      check_all: checked ? 'yes' : 'no',
    });
  }

  updateStateFunctions(index, checked){
    this.state.functions[index].checked = checked;
    var default_checked = this.state.functions[index].default_checked;
    if (checked != default_checked) {
      this.state.functions[index].is_changed = true;
    } else {
      this.state.functions[index].is_changed = false;
    }
  }

  handleCheckbox(index, checked){
    this.updateStateFunctions(index, checked);
    this.props.dataChange(this.state.functions, 'none');
  }

  onPageChange(page_index) {
    this.setState({
      check_all: 'none',
      page_index: page_index
    });
  }
}
