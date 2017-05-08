import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import css from 'assets/sass/react-table.scss';
import ReactTable from 'react-table';
import React from 'react';

export default class StatisticsLanguageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainees_by_languages_table: props.trainees_by_languages_table
    };
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
        header: I18n.t('statistics.languages.headers.organization'),
        accessor: 'organization_name',
      },
      {
        header: I18n.t('statistics.languages.headers.language'),
        accessor: 'language_name',
      },
      {
        header: I18n.t('statistics.languages.headers.number'),
        accessor: 'number',
      },
    ]

    return (
      <div className='box box-success'>
        <div className='box-header with-border'>
          <h3 className='box-title'>{I18n.t('statistics.languages.title')}</h3>

          <div className='box-tools pull-right'>
            <button type='button' className='btn btn-box-tool' data-widget='collapse'>
              <i className='fa fa-minus'></i>
            </button>
            <button type='button' className='btn btn-box-tool' data-widget='remove'>
              <i className='fa fa-times'></i>
            </button>
          </div>
        </div>

        <div className='box-body no-padding'>
          <div>
            <ReactTable
              className='-striped -highlight'
              data={this.state.trainees_by_languages_table}
              columns={columns} showFilters={true}
              defaultPageSize={react_table_ultis.defaultPageSize}
              defaultFilterMethod={react_table_ultis.defaultFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}
