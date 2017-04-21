import axios from 'axios';
import React from 'react';

export default class Create extends React.Component {
  render() {
    return (
      <button type='submit' onClick={this.afterClickAddProject.bind(this)}
        className='btn btn-primary'>
        {I18n.t('buttons.add_project')}
      </button>
    );
  }

  afterClickAddProject() {
    $('.modal-create').modal();
  }
}
