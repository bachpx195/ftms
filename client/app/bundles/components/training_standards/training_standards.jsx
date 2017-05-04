import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import ReactTable from 'react-table';

export default class TrainingStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
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
        header: I18n.t('training_standards.name'),
        accessor: 'name',
        filterMethod: (filter, row) => {
          return row.name.toLowerCase()
            .includes(filter.value.toLowerCase());
        },
        render: row => {
          return <a title={row.value}
            href={routes.training_standard_url(row.row.id)}>{row.value}</a>
        }
      },
      {
        header: I18n.t('training_standards.description'),
        accessor: 'description',
        render: row => <span title={row.value}>{row.value}</span>,
        filterMethod: (filter, row) => {
          return row.description.toLowerCase()
            .includes(filter.value.toLowerCase());
        }
      }
    ]

    return (
      <div>
        <ReactTable
          className='-striped -highlight' data={this.state.training_standards}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      training_standard: this.state.training_standards[$target.data('index')]
    }, () => {
      $('.modal-edit').modal();
    });
  }

  handleAfterUpdated(new_training_standard) {
    this.props.handleAfterUpdated(new_training_standard);
  }
}
