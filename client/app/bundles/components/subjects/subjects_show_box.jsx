import React from 'react';
import axios from 'axios';
import UserSubjectList from './user_subject_list';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';
import ModalBody from './subject_form/modalBody';

const ORGANIZATION_URL = app_constants.APP_NAME + subject_constants +
  subject_constants.ORGANIZATION_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_detail: {
        training_standard: {},
        user_subjects: {},
        statuses:[],
        task: {
          surveys: [],
          test_rules: [],
          assignments: []
        }
      },
    }
  }

  componentDidMount() {
    this.fetchSubject();
  }

  fetchSubject() {
    let url;
    if(this.props.organization){
      url = ORGANIZATION_URL + '/' + this.props.organization.id + '/subjects/' + this.props.subject.id;
    }else{
      url = SUBJECT_URL + '/' + this.props.subject.id;
    }
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
              <div className='subject-info col-md-9'>
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
              <div className='add-task col-md-3'>
                <button type="button" className="btn btn-primary"
                  onClick={this.afterClickAddTask.bind(this)}>
                  Add Task
                </button>
                {this.renderModal()}
              </div>
            </div>
          </div>
        </div>
        <div id="user-subject" className="clearfix">
          <UserSubjectList
            user_subjects={this.state.subject_detail.user_subjects}
            statuses={this.state.subject_detail.statuses} />
        </div>
      </div>
    );
  }

  renderModal(){
    return(
      <div id='modalAddTask' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>Add Task</h4>
            </div>
            <ModalBody task={this.state.subject_detail.task}
              subject_id={this.state.subject_detail.id}
              handleAfterAddTask={this.handleAfterAddTask.bind(this)} />
          </div>
        </div>
      </div>
    )
  }

  afterClickAddTask(){
    $('#modalAddTask').modal();
  }

  handleAfterAddTask(type, targetable_ids) {
    _.remove(this.state.subject_detail.task[type], targetable => {
      return targetable_ids.indexOf(targetable.id) >= 0;
    });
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }
}
