import 'assets/sass/react-table.scss';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'axios';
import css from './css/test_rule.scss';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import ReactTable from 'react-table';
import { NewLayout } from 'shared/griddles/new_layout';

export default class TestRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test_rules: props.test_rules,
      test_rule: props.test_rule,
    }
  }

  render(){
    const ButtonEdit = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleClickEdit.bind(this)}>
        <i className='fa fa-pencil-square-o'></i>
        &nbsp;{I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        data-type='delete' onClick={this.handleClickDelete.bind(this)}>
        <i className='fa fa-trash'></i>
        &nbsp;{I18n.t('buttons.delete')}
      </button>
    );

    let a = (
        <Griddle data={this.state.test_rules}
          plugins={[plugins.LocalPlugin]}
        components={{Layout: NewLayout}}
        styleConfig={table_constants.styleConfig}>
        <RowDefinition>
          <ColumnDefinition id='name' title={I18n.t('programs.name')}/>
          <ColumnDefinition id='total_question'
            title={I18n.t('test_rules.form.total_question')} />
          <ColumnDefinition id='time_of_test'
            title={I18n.t('test_rules.form.time_of_test')} />
          <ColumnDefinition id='min_score_for_pass'
            title={I18n.t('test_rules.form.min_score_for_pass')} />
          <ColumnDefinition id='opportunity'
            title={I18n.t('test_rules.form.opportunity')} />
          <ColumnDefinition id='number_of_test'
            title={I18n.t('test_rules.form.number_of_test')} />
          <ColumnDefinition id='edit' title={I18n.t('buttons.edit')}
            customComponent={ButtonEdit}/>
          <ColumnDefinition id='delete'
            title={I18n.t('buttons.delete')}
            customComponent={ButtonDelete}/>
        </RowDefinition>
      </Griddle>
    )
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('programs.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('test_rules.form.total_question'),
        accessor: 'total_question',
        style: {'text-align': 'right'},
        filterMethod: react_table_ultis.defaultNumberFilter,
      },
      {
        header: I18n.t('test_rules.form.time_of_test'),
        accessor: 'time_of_test',
        style: {'text-align': 'right'},
        filterMethod: react_table_ultis.defaultNumberFilter,
        width: 105,
      },
      {
        header: I18n.t('test_rules.form.min_score_for_pass'),
        accessor: 'min_score_for_pass',
        style: {'text-align': 'right'},
        filterMethod: react_table_ultis.defaultNumberFilter,
      },
      {
        header: I18n.t('test_rules.form.opportunity'),
        accessor: 'opportunity',
        style: {'text-align': 'right'},
        filterMethod: react_table_ultis.defaultNumberFilter,
        width: 150
      },
      {
        header: I18n.t('test_rules.form.number_of_test'),
        accessor: 'number_of_test',
        style: {'text-align': 'right'},
        filterMethod: react_table_ultis.defaultNumberFilter,
        width: 150
      },
      {
        header: '',
        accessor: 'actions',
        render: row => (
          <div className='text-center'>
            <button className='btn btn-info' data-index={row.index}
              onClick={this.handleClickEdit.bind(this)}
              title={I18n.t('buttons.edit')}>
              <i className='fa fa-pencil-square-o' data-index={row.index}></i>
            </button>
            <button className='btn btn-danger' data-index={row.index}
              onClick={this.handleClickDelete.bind(this)}
              title={I18n.t('buttons.delete')}>
              <i className='fa fa-trash' data-index={row.index}></i>
            </button>
          </div>
        ),
        sortable: false,
        hideFilter: true,
        width: 150
      }
    ];

    return (
      <div>
        <ReactTable className='-striped -highlight' showFilters={true}
          data={this.state.test_rules} columns={columns}
          defaultPageSize={react_table_ultis.defaultPageSize}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }

  handleClickEdit(event) {
    let $target = $(event.target);
    $target.blur();
    var data = {test_rule: this.state.test_rules[$target.data('index')]}
    this.props.handleRefresh(data);
    $('.modalForm').modal();
  }

  handleClickDelete(event) {
    if (confirm(I18n.t('data.confirm_delete'))) {
      let $target = $(event.target);
      $target.blur();
      let test_rule = this.state.test_rules[$target.data('index')];
      if (confirm(I18n.t('data.confirm_delete'))) {
        axios.delete(routes.test_rule_url(test_rule.id) + '.json', {
          params: {
            authenticity_token: ReactOnRails.authenticityToken()
          }
        })
        .then(response => {
          _.remove(this.state.test_rules, _test_rule => {
            return _test_rule.id == response.data.test_rule.id;
          });
          this.setState({
            test_rules: this.state.test_rules,
            test_rule: {}
          });
        })
        .catch(error => console.log(error));
      }
    }
  }
}
