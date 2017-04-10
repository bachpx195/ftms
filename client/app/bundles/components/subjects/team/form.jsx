import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../../shareds/errors';
import ListUnassignedUserSubject from './list_unassigned_user_subject';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_id: props.course_subject.id,
      name: props.team ? props.team.name : '',
      user_subjects: props.user_subjects,
      selected_user_subjects: [],
      errors: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.team ? nextProps.team.name : '',
      user_subjects: nextProps.user_subjects,
      selected_user_subjects: [],
      errors: null
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('teams.headers.name')}
            value={this.state.name} onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <fieldset>
        <legend>{I18n.t('teams.select_members')}</legend>
          <ListUnassignedUserSubject
            user_subjects={this.state.user_subjects}
            selected_user_subjects={this.state.selected_user_subjects}
            setSelectedUserSubjects={this.setSelectedUserSubjects.bind(this)}
          />
        </fieldset>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  setSelectedUserSubjects(user_subjects) {
    this.setState({
      selected_user_subjects: user_subjects
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid() {
    return this.state.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let team = _.omit(this.state, 'errors');
    let formData = new FormData();
    for(let key of Object.keys(team)) {
      formData.append('team[' + key + ']', team[key]);
    }
    for(let user_subject of this.state.selected_user_subjects) {
      formData.append('user_subject_ids[]', user_subject.id);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let method = this.props.team ? 'PATCH' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('#modalTeam').modal('hide');
      this.props.handleAfterSaved(response.data.team);
    })
    .catch(error => {
      console.log(error);
      this.setState({errors: error.response.data.errors})
    });
  }
}
