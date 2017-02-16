import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import LanguageLists from './language_lists';

import * as app_constants from 'constants/app_constants';
import * as language_constants from './language_constants';

const LANGUAGE_URL = app_constants.APP_NAME + language_constants.ADMIN_LANGUAGE_PATH;

export default class LanguageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: []
    };
  }

  componentWillMount() {
    this.fetchLanguages();
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('languages.titles.all')}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                  <CreateForm afterCreate={this.afterCreate.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <LanguageLists languages={this.state.languages}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(language) {
    this.state.languages.push(language);
    this.setState({languages: this.state.languages});
  }

  afterUpdate(old_language, new_language) {
    let found_item = _.findIndex(this.state.languages, language => language.id === old_language.id);
    this.state.languages[found_item] = new_language;
    this.setState({languages: this.state.languages});
  }

  afterDelete(deleted_language) {
    _.remove(this.state.languages, language => language.id === deleted_language.id);
    this.setState({ languages: this.state.languages });
  }

  fetchLanguages() {
    axios.get(LANGUAGE_URL + '.json')
      .then(response => this.setState({ languages: response.data.languages }))
      .catch(response => console.log(response));
  }
}
