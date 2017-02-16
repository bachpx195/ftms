import _ from "lodash";
import React from 'react';
import LanguageItem from './language_item';

export default class LanguageLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'languages')

    return _.map(this.props.languages, language => {
      return <LanguageItem key={language.id}
        language={language} {...props} />
    });
  }

  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('languages.headers.name')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}
