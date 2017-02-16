import _ from "lodash";
import React from 'react';
import UniversityItem from './university_item';

export default class UniversityLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'universities');

    return _.map(this.props.universities, university => {
      return <UniversityItem key={university.id}
        university={university} {...props} />
    });
  }

  render () {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('universities.headers.name')}</th>
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
