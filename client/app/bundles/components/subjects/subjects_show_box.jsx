import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import UserSubjectList from './user_subject_list';

const APP_URL = app_constants.APP_NAME;

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_detail: {
        training_standard: {},
        user_subjects: {}
      }
    }
  }

  componentDidMount() {
    this.fetchSubject();
  }

  fetchSubject() {
    const url = APP_URL + 'admin/organizations/' +
      this.props.organization.id + '/subjects/' + this.props.subject.id;
    axios.get(url + '.json')
    .then(response => {
      this.setState({
        subject_detail: response.data.subject_detail,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <div id="admin-subject-show">
          <div className="row">
            <div className="col-md-2">
              <img src={this.state.subject_detail.image}
                alt='Subject Image' className="image-subject" />
            </div>
            <div className="col-md-8">
              <h2 className="subject-name">
                {this.state.subject_detail.name}
              </h2>
              <div className="description">
                {this.state.subject_detail.description}
              </div>
              <div className="workings-day">
                {I18n.t('subjects.headers.workings_day')}
                {this.state.subject_detail.during_time}
                {I18n.t('subjects.headers.days')}
              </div>
              <div className="organization">
                {I18n.t('subjects.headers.training_standard')}
                {this.state.subject_detail.training_standard.name}
              </div>
            </div>
          </div>
        </div>
        <div id="user-subject">
          <UserSubjectList
            user_subjects={this.state.subject_detail.user_subjects} />
        </div>
      </div>
    );
  }
}
