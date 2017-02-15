import _ from "lodash";
import React from 'react';
import SubjectItem from './subject_item';

export default class SubjectLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'subjects')

    return _.map(this.props.subjects, subject => {
      return <SubjectItem key={subject.id}
        subject={subject} {...props} />
    });
  }

  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('subjects.headers.name')}</th>
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
