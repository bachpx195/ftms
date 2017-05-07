import * as react_table_ultis from 'shared/react-table/ultis';
import Checkbox from '../shareds/checkbox';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';
import SelectSell from '../shareds/select_cell';

export default class RoleFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_all: 'none',
      functions: props.functions
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      check_all: 'none',
      functions: nextProps.functions
    });
  }

  render() {
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
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
            checked = row.row.checked
          }
          return (
            <Checkbox handleClick={this.handleCheckbox.bind(this)}
              index={row.index} is_checked={checked} />
          );
        },
        hideFilter: true,
        sortable: false,
        width: 50
      }
    ];

    return (
      <ReactTable className='-striped -highlight'
        data={this.state.functions} page={this.props.page}
        columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
        showFilters={true} onPageChange={this.onPageChange.bind(this)}
        defaultFilterMethod={react_table_ultis.defaultFilter}
      />
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
    this.setState({
      functions: this.state.functions,
      check_all: 'none'
    });
  }

  onPageChange(page_index) {
    this.setState({
      check_all: 'none'
    });
    this.props.updatePage(page_index);
  }
}
