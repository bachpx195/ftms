import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'react-table/react-table.css';
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
        header: I18n.t('languages.headers.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('languages.headers.image'),
        id: 'url',
        accessor: d => d.image.url,
        render: row => <img src={row.value} className='thumbnail-image'/>,
        sortable: false,
        filterRender: () => null,
      },
      {
        header: I18n.t('languages.headers.description'),
        accessor: 'description',
        render: row => {
          return <span title={row.value}>{row.value}</span>;
        },
        width: 700,
      },
      {
        header: '',
        accessor: 'creator_id',
        render: row => (
          <LanguagePolicy permit={[{action: ['update', 'creator'],
            target: 'children', data: {creator_id: row.value}}]}>
            <button className='btn btn-info' data-index={row.index}
              onClick={this.handleEdit.bind(this)}>
              <i className='fa fa-pencil-square-o' data-index={row.index}></i>
              &nbsp;{I18n.t('buttons.edit')}
            </button>
          </LanguagePolicy>
        ),
        sortable: false,
        filterRender: () => null,
      },
      {
        header: '',
        accessor: 'creator_id',
        render: row => (
          <LanguagePolicy
            permit={[{action: ['destroy', 'creator'], target: 'children',
              data: {creator_id: row.value}}]}>
            <button className='btn btn-danger' data-index={row.index}
              onClick={this.handleDelete.bind(this)}>
              <i className='fa fa-trash' data-index={row.index}></i>
              &nbsp;{I18n.t('buttons.delete')}
            </button>
          </LanguagePolicy>
        ),
        sortable: false,
        filterRender: () => null,
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
