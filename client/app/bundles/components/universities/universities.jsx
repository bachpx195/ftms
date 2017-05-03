import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'axios';
import css from 'react-table/react-table.css';
import Destroy from "./actions/destroy";
import ModalEdit from './templates/modal';
import React from 'react';
import Row from './griddle/row';
import ReactTable from 'react-table';
import Update from "./actions/update";
import UniversityPolicy from 'policy/university_policy';

export default class Universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: props.universities,
      university: {}
    };
    Row.prototype.universities = this.state.universities;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected_university: {}
    });
  }

  render() {
    const columns = [
      {
        header: I18n.t("universities.name"),
        accessor: 'name',
        filterMethod: (filter, row) => {
          return row.name.toLowerCase()
            .includes(filter.value.toLowerCase());
        }
      },
      {
        header: '',
        id: 'edit',
        accessor: 'creator_id',
        render: row => (
          <UniversityPolicy
            permit={[{action: ['update', 'creator'],
              target: 'children', data: {creator_id: row.value}}]}>
            <button className='btn btn-info' data-index={row.index}
              onClick={this.handleEdit.bind(this)}>
              <i className="fa fa-pencil-square-o"></i>
              &nbsp;{I18n.t('buttons.edit')}
            </button>
          </UniversityPolicy>
        ),
        sortable: false,
        filterRender: () => null,
      },
      {
        header: '',
        id: 'delete',
        accessor: d => {
          return <Destroy university={d}
            handleAfterDeleted={this.props.handleAfterDeleted} />
        },
        sortable: false,
        filterRender: () => null,
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
          className='-striped -highlight' data={this.state.universities}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        {modalEdit}
      </div>
    );
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
