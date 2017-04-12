import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';
import * as university_constants from '../constants/university_constants';

import UniversityPolicy from 'policy/university_policy';

import Modal from '../templates/modal';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.UNIVERSITY_PATH;

export default class Update extends React.Component {
  render() {
    let modalEdit = null;
    if (this.props.renderModal) {
      modalEdit = (
        <Modal url={UNIVERSITY_URL + '/' + this.props.university.id}
          university={this.props.university}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    return (
      <div>
        <UniversityPolicy
          permit={[{action: ['update', 'creator'], target: 'children',
              data: {creator_id: this.props.university.creator_id}}]}>
          <button className='btn btn-info' onClick={this.handleEdit.bind(this)}>
            {I18n.t('buttons.edit')}
          </button>
        </UniversityPolicy>
        {modalEdit}
      </div>
    );
  }

  componentDidUpdate() {
    $('.modal-edit').modal();
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.props.setUniversity(this.props.university);
  }

  handleAfterUpdated(new_university) {
    this.props.handleAfterUpdated(new_university);
    this.props.setUniversity({});
  }
}
