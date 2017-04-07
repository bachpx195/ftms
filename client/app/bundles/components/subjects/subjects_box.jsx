import React from 'react';
import axios from 'axios';
import ModalCreatSubject from './subject_form/modal_creat_subject'
import SubjectLists from './subject_lists';
import Form from './subject_form/form';
import SubjectPolicy from 'policy/subject_policy';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class SubjectBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: props.subjects,
      subject: {}
    };
  }

  render() {
    return (
      <div className='row subjects admin-subjects'>
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
                <div className='col-md-8'>
                  <SubjectPolicy
                    permit={[{action: ['create'], target: 'children'}]} >
                    <button type="button" className="btn btn-info create-subject"
                      onClick={this.handleCreateSubject.bind(this)}>
                      <i className="fa fa-upload"></i> {I18n.t('subjects.buttons.create')}
                    </button>
                  </SubjectPolicy>
                </div>
                <ModalCreatSubject subject={this.state.subject}
                  handleAfterCreated={this.handleAfterCreated.bind(this)} />
              </div>
            </div>

            <div className='box-footer'>
              <SubjectLists subjects={this.state.subjects}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(subject) {
    this.state.subjects.push(subject);
    this.setState({
      subjects: this.state.subjects,
      subject: {}
    });
  }

  handleAfterUpdated(new_subject) {
    let index = this.state.subjects
      .findIndex(subject => subject.id === new_subject.id);
    this.state.subjects[index] = new_subject;
    this.setState({
      subjects: this.state.subjects,
      subject: {}
    });
  }

  handleAfterDeleted(deleted_subject) {
    _.remove(this.state.subjects,
      subject => subject.id === deleted_subject.id);
    this.setState({subjects: this.state.subjects});
  }

  handleCreateSubject() {
    $('#modalCreatSubject').modal();
  }
}
