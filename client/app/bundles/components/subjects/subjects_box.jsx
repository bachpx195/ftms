import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import SubjectLists from './subject_lists';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.ADMIN_SUBJECT_PATH;

export default class subjectBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: []
    };
  }

  componentWillMount() {
    this.fetchSubjects();
  }

  render() {
    return (
      <div className='row subjects'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('subjects.titles.all')}</h3>

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
              <SubjectLists subjects={this.state.subjects}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(subject) {
    this.state.subjects.push(subject);
    this.setState({subjects: this.state.subjects});
  }

  afterUpdate(old_subject, new_subject) {
    let found_item = _.findIndex(this.state.subjects, subject => subject.id === old_subject.id);
    this.state.subjects[found_item] = new_subject;
    this.setState({subjects: this.state.subjects});
  }

  afterDelete(deleted_subject) {
    _.remove(this.state.subjects, subject => subject.id === deleted_subject.id);
    this.setState({ subjects: this.state.subjects });
  }

  fetchSubjects() {
    axios.get(SUBJECT_URL + '.json')
      .then(response => this.setState({ subjects: response.data.subjects }))
      .catch(response => console.log(response));
  }
}
