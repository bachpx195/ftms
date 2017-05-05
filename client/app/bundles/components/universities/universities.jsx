import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import Destroy from './actions/destroy';
import ModalEdit from './templates/modal';
import React from 'react';
import ReactTable from 'react-table';
import Update from './actions/update';
import UniversityPolicy from 'policy/university_policy';

export default class Universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: props.universities,
      university: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected_university: {}
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
        header: I18n.t('universities.name'),
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
            <UniversityPolicy
              permit={[{action: ['update', 'creator'],
                target: 'children', data: {creator_id: row.value}}]}>
              <button title={I18n.t('buttons.edit')}
                className='btn btn-info' data-index={row.index}
                onClick={this.handleEdit.bind(this)}>
                <i className='fa fa-pencil-square-o'></i>
              </button>
            </UniversityPolicy>
            <Destroy university={row.row}
              handleAfterDeleted={this.props.handleAfterDeleted} />
          </div>
        ),
        sortable: false,
        hideFilter: true,
        width: 150
      }
    ]

    let modalEdit = null;
    if(this.state.university.id){
      modalEdit = (
        <ModalEdit
          url={routes.university_url(this.state.university.id)}
          university={this.state.university}
          handleAfterUpdated={this.props.handleAfterUpdated} />
      );
    }

    return (
      <div>
        <ReactTable
          className='-striped -highlight' data={this.policyFilterData()}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        {modalEdit}
      </div>
    );
  }

  policyFilterData() {
    let universities = [];
    let policy = new UniversityPolicy({refresh: false});
    for (let university of this.state.universities) {
      var permit = [
        {action: ['show', 'creator'], data: {creator_id: university.creator_id}}
      ];
      if (policy.checkAllowFunction(permit)) {
        universities.push(university);
      }
    }
    return universities;
  }

  setUniversity(selected_university) {
    this.setState({
      selected_university: selected_university
    });
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      university: this.state.universities[$target.data('index')]
    }, () => {
      $('.modal-edit').modal();
    });
  }
}
