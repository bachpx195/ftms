import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Form from './form';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as language_constants from './language_constants';

const LANGUAGE_URL = app_constants.APP_NAME + language_constants.ADMIN_LANGUAGE_PATH;

export default class LanguageLists extends React.Component {
  constructor(props) {
    console.log('LanguageLists constructor()');
    super(props);

    this.state = {
      languages: props.languages,
      language: {}
    }
  }

  render() {
    console.log('LanguageLists render()');
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

    const ButtonEdit = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    );

    const Image = ({griddleKey}) => (
      <img src={this.props.languages[griddleKey].image.url}
        className='thumbnail-image'/>
    );

    let modalEdit = null;
    if(this.state.language){
      modalEdit = (
        <div id='modalEdit' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>{I18n.t('languages.modals.header_edit')}</h4>
              </div>
              <div className='modal-body'>
                <Form language={this.state.language}
                  url={LANGUAGE_URL + '/' + this.state.language.id}
                  handleAfterSaved={this.handleAfterUpdated.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Griddle data={this.state.languages} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="id" />
            <ColumnDefinition id="name" />
            <ColumnDefinition id="image" customComponent={Image} />
            <ColumnDefinition id="description" />
            <ColumnDefinition id="edit" customComponent={ButtonEdit} />
            <ColumnDefinition id="delete" customComponent={ButtonDelete} />
          </RowDefinition>
        </Griddle>
        {modalEdit}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('LanguageLists componentDidUpdate()');
    if(this.state.language.id) {
      $('#modalEdit').modal();
    }
  }

  handleEdit(event) {
    console.log('LanguageLists handleEdit()');
    let $target = $(event.target);
    $target.blur();
    this.setState({
      language: this.props.languages[$target.data('index')]
    });
  }

  handleDelete(event){
    console.log('LanguageLists handleDelete()');
    let $target = $(event.target);
    $target.blur();
    let language = this.props.languages[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(LANGUAGE_URL + '/' + language.id, {
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
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(new_language){
    console.log('LanguageLists handleAfterUpdated()');
    this.setState({
      language: {}
    });
    this.props.handleAfterUpdated(new_language);
  }
}
