import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import LanguagePolicy from 'policy/language_policy';
import Modal from './templates/modal';
import React from 'react';
import ReactTable from 'react-table';
import Row from './griddle/row';

export default class LanguageLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: props.languages,
      language: {}
    };
    Row.prototype.languages = this.state.languages;
  }

  render() {
    let modalEdit = (
      <Modal url={routes.language_url(this.state.language.id)}
        language={this.state.language}
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
        header: I18n.t('languages.headers.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('languages.headers.image'),
        id: 'url',
        accessor: d => d.image.url,
        render: row => <img src={row.value} className='thumbnail-image'/>,
        sortable: false,
        hideFilter: true,
      },
      {
        header: I18n.t('languages.headers.description'),
        accessor: 'description',
        render: row => <span title={row.value}>{row.value}</span>,
        minWidth: 450
      },
      {
        header: '',
        accessor: 'creator_id',
        render: row => (
          <div className='text-center'>
            <LanguagePolicy permit={[{action: ['update', 'creator'],
              target: 'children', data: {creator_id: row.value}}]}>
              <button title={I18n.t('buttons.edit')}
                className='btn btn-info' data-index={row.index}
                  onClick={this.handleEdit.bind(this)}>
                <i className='fa fa-pencil-square-o'></i>
              </button>
            </LanguagePolicy>
            <LanguagePolicy
              permit={[{action: ['destroy', 'creator'], target: 'children',
                data: {creator_id: row.value}}]}>
              <button title={I18n.t('buttons.delete')}
                className='btn btn-danger' data-index={row.index}
                onClick={this.handleDelete.bind(this)}>
                <i className='fa fa-trash'></i>
              </button>
            </LanguagePolicy>
          </div>
        ),
        sortable: false,
        hideFilter: true,
        width: 150
      }
    ];
    return (
      <div>
        <ReactTable className='-striped -highlight' data={this.state.languages}
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
      language: this.state.languages[$target.data('index')]
    });
    $('.modal-edit').modal();
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let language = this.props.languages[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.language_url(language.id), {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          language: {}
        });
        this.props.handleAfterDeleted(language);
      })

    }
  }

  handleAfterUpdated(new_language) {
    this.setState({
      language: {}
    });
    this.props.handleAfterUpdated(new_language);
  }
}
