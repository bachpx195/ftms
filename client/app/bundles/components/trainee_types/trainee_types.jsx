import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'react-table/react-table.css';
import Modal from './templates/modal';
import React from 'react';
import ReactTable from 'react-table';

export default class TraineeTypeLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainee_types: props.trainee_types,
      trainee_type: {}
    }
  }

  render() {
    let modalEdit = null;
    if (this.state.trainee_type.id) {
      modalEdit = (
        <Modal
          url={routes.trainee_type_url(this.state.trainee_type.id)}
          trainee_type={this.state.trainee_type}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    const columns = [
      {
        header: I18n.t("trainee_types.name"),
        accessor: 'name',
        width: 800,
      },
      {
        header: '',
        accessor: 'creator_id',
        render: row => (
          <button className='btn btn-info' data-index={row.index}
            onClick={this.handleEdit.bind(this)}>
            <i className='fa fa-pencil-square-o' data-index={row.index}></i>
            &nbsp;{I18n.t('buttons.edit')}
          </button>
        ),
        sortable: false,
        filterRender: () => null,
        style: {textAlign: 'center'},
      },
      {
        header: '',
        accessor: 'creator_id',
        render: row => (
          <button className='btn btn-danger' data-index={row.index}
            onClick={this.handleDelete.bind(this)}>
            <i className="fa fa-trash" data-index={row.index}></i>
            &nbsp;{I18n.t('buttons.delete')}
          </button>
        ),
        sortable: false,
        filterRender: () => null,
        style: {textAlign: 'center'},
      }
    ];

    return (
      <div>
        <ReactTable className='-striped -highlight' data={this.state.trainee_types}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        {modalEdit}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      trainee_type: {}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.trainee_type.id) {
      $('.modalEdit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      trainee_type: this.props.trainee_types[$target.data('index')]
    });
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let trainee_type = this.props.trainee_types[$target.data('index')];
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.trainee_type_url(trainee_type.id), {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          trainee_type: {}
        });
        this.props.handleAfterDeleted(trainee_type);
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(response) {
    this.setState({
      trainee_type: {}
    });
    this.props.handleAfterUpdated(response);
  }
}
