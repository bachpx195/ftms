import React from 'react';
import axios from 'axios';

import LanguageLists from './languages';
import Form from './templates/form';
import LanguagePolicy from 'policy/language_policy';
import Breadcrumb from 'react-breadcrumb';

import * as app_constants from 'constants/app_constants';
import * as language_constants from './constants/language_constants';

const LANGUAGE_URL = app_constants.APP_NAME + language_constants.LANGUAGE_PATH;

export default class LanguageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: props.languages,
      language: {}
    };
  }

  render() {
    return (
      <div className='row languages admin-languages'>
        <Breadcrumb
          path={
            [
              {
                path: app_constants.APP_NAME,
                label: I18n.t('breadcrumbs.home'),
              },
              {
                path: LANGUAGE_URL,
                label: I18n.t('breadcrumbs.languages'),
              }
            ]
          }
        />
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
                  <LanguagePolicy permit={[
                    {action: ['create'], target: 'children'}
                    ]}>
                    <Form language={this.state.language} url={LANGUAGE_URL}
                      handleAfterCreated={this.handleAfterCreated.bind(this)} />
                  </LanguagePolicy>
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <LanguagePolicy
                permit={[
                  {action: ['create'], target: 'children'},
                  {action: ['index'], target: 'children'},
                ]}>
                <LanguageLists languages={this.state.languages}
                  handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                  handleAfterDeleted={this.handleAfterDeleted.bind(this)}/>
              </LanguagePolicy>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(language) {
    this.state.languages.push(language);
    this.setState({
      languages: this.state.languages,
      language: {}
    });
  }

  handleAfterUpdated(new_language) {
    let index = this.state.languages
      .findIndex(language => language.id === new_language.id);
    this.state.languages[index] = new_language;
    this.setState({
      languages: this.state.languages,
      language: {}
    });
  }

  handleAfterDeleted(deleted_language) {
    _.remove(this.state.languages,
      language => language.id === deleted_language.id);
    this.setState({languages: this.state.languages});
  }
}
