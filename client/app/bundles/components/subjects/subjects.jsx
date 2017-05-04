import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import Modal from './subject_form/modal';
import React from 'react';
import ReactTable from 'react-table';
import SubjectPolicy from 'policy/subject_policy';
import * as app_constants from 'constants/app_constants';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';

const DEFAULT_IMAGE_SUBJECT = app_constants.DEFAULT_IMAGE_SUBJECT_URL;

export default class Subjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: props.subjects,
      subject: {}
    }
  }

  render() {
    let modalEdit = (
      <Modal subject={this.state.subject}
        url={routes.organization_subject_url(this.props.organization.id,
          this.state.subject.id)}
        handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
    );

    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('subjects.headers.name'),
        accessor: 'name',
        render: row => {
          return <a title={row.value}
            href={routes.subject_url(row.row.id)}>{row.value}</a>
        },
      },
      {
        header: I18n.t('subjects.headers.image'),
        id: 'url',
        accessor: d => d.image.url,
        render: row => <img src={row.value ? row.value : DEFAULT_IMAGE_SUBJECT}
          className='thumbnail-image'/>,
        sortable: false,
        hideFilter: true,
        width: 105,
      },
      {
        header: I18n.t('subjects.headers.description'),
        accessor: 'description',
        render: row => {
          return <span title={row.value}>{row.value}</span>;
        },
      },
      {
        header: I18n.t('subjects.headers.during_time'),
        accessor: 'during_time',
        render: row => <div className='text-right'>{row.value}</div>,
        filterMethod: react_table_ultis.defaultNumberFilter,
        width: 150
      },
      {
        header: '',
        accessor: 'actions',
        render: row => (
          <div className='text-center'>
            <button className='btn btn-info' data-index={row.index}
              onClick={this.handleEdit.bind(this)}
              title={I18n.t('buttons.edit')}>
              <i className='fa fa-pencil-square-o'></i>
            </button>
            <button className='btn btn-danger' data-index={row.index}
              onClick={this.handleDelete.bind(this)}
              title={I18n.t('buttons.delete')}>
              <i className='fa fa-trash'></i>
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
        <ReactTable className='-striped -highlight' data={this.state.subjects}
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
      subject: {}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.subject.id){
      $('.modal-edit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      subject: this.props.subjects[$target.data('index')]
    });
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let subject = this.props.subjects[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.organization_subject_url(this.props.organization.id,
        subject.id),{
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          subject: {}
        });
        this.props.handleAfterDeleted(subject);
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(new_subject) {
    this.setState({
      subject: {}
    });
    this.props.handleAfterUpdated(new_subject);
  }
}
