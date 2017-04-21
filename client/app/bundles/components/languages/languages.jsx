import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './templates/modal';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import Row from './griddle/row';
import LanguagePolicy from 'policy/language_policy';

const LANGUAGES_URL = app_constants.APP_NAME + app_constants.LANGUAGES_PATH;

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
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

    const ButtonEdit = ({griddleKey}) => {
      var creator_id = this.state.languages[griddleKey].creator_id;
        return(
          <LanguagePolicy
            permit={[{action: ['update', 'creator'], target: 'children', data: {creator_id: creator_id}}]}
          >
            <button className='btn btn-info' data-index={griddleKey}
              onClick={this.handleEdit.bind(this)}>
              <i className="fa fa-pencil-square-o"></i>
              &nbsp;{I18n.t('buttons.edit')}
            </button>
          </LanguagePolicy>
        );
    };

    const ButtonDelete = ({griddleKey}) => {
      var creator_id = this.state.languages[griddleKey].creator_id;
      return(
        <LanguagePolicy
          permit={[{action: ['destroy', 'creator'], target: 'children', data: {creator_id: creator_id}}]}
        >
          <button className='btn btn-danger' data-index={griddleKey}
            onClick={this.handleDelete.bind(this)}>
            <i className="fa fa-trash"></i>
            &nbsp;{I18n.t('buttons.delete')}
          </button>
        </LanguagePolicy>
      );
    };

    const Image = ({griddleKey}) => (
      <img src={this.props.languages[griddleKey].image.url}
        className='thumbnail-image'/>
    );

    let modalEdit = (
      <Modal url={LANGUAGES_URL + '/' + this.state.language.id}
        language={this.state.language}
        handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
    );

    return (
      <div>
        <Griddle data={this.state.languages} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout, Row: Row}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name'
              title={I18n.t('languages.headers.name')} />
            <ColumnDefinition id='image' customComponent={Image}
              title={I18n.t('languages.headers.image')} />
            <ColumnDefinition id='description'
              title={I18n.t('languages.headers.description')}  />
            <ColumnDefinition id='edit' title=' '
              customComponent={ButtonEdit} />
            <ColumnDefinition id='delete' title='  '
              customComponent={ButtonDelete} />
          </RowDefinition>
        </Griddle>
        {modalEdit}
      </div>
    );
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      language: this.props.languages[$target.data('index')]
    });
    $('.modal-edit').modal();
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let language = this.props.languages[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(LANGUAGES_URL + '/' + language.id, {
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
