import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import Destroy from './actions/destroy';
import Form from './templates/form';
import ModalEdit from './templates/modal_edit';
import React from 'react';
import ReactTable from 'react-table';
import StagePolicy from 'policy/stage_policy';

export default class StageLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: props.stages,
      stage: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stage: {}
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
        header: I18n.t('stages.name'),
        accessor: 'name',
        filterMethod: (filter, row) => {
          return row.name.toLowerCase().includes(filter.value.toLowerCase());
        }
      },
      {
        header: '',
        id: 'edit',
        accessor: 'creator_id',
        render: row => (
          <div className='text-center'>
            <StagePolicy
              permit={[{action: ['update', 'creator'], target: 'children',
                data: {creator_id: row.value}}]}>
              <button title={I18n.t('buttons.edit')}
                className='btn btn-info' data-index={row.index}
                onClick={this.handleEdit.bind(this)}>
                <i className='fa fa-pencil-square-o'></i>
              </button>
            </StagePolicy>
            <StagePolicy
              permit={[{action: ['destroy', 'creator'], target: 'children',
                data: {creator_id: row.value}}]}>
              <Destroy url={routes.stages_url()} stage={row.row}
                handleAfterDeleted={this.props.handleAfterDeleted}
              />
            </StagePolicy>
          </div>
        ),
        sortable: false,
        hideFilter: true,
        width: 150
      },
    ]

    let modalEdit = null;
    if(this.state.stage.id){
      modalEdit = (
        <ModalEdit url={routes.stage_url(this.state.stage.id)}
          stage={this.state.stage}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    return (
      <div>
        <ReactTable
          className='-striped -highlight' data={this.state.stages}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        {modalEdit}
      </div>
    );
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      stage: this.props.stages[$target.data('index')]
    }, () => {
      $('.modal-edit').modal();
    });
  }

  handleAfterUpdated(new_stage) {
    this.setState({
      stage: {}
    });
    this.props.handleAfterUpdated(new_stage);
  }
}
