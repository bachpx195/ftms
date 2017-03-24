import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import AssignmentItem from './assignment_item';
import * as app_constants from 'constants/app_constants';

export default class SubjectShowBoxTrainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigments_of_user_subjects: props.assigments_of_user_subjects,
      current_user: props.current_user
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
                  <div className="assignment-box">
                    <h1>{I18n.t("subjects.trainee.title_assignment")}</h1>
                    {this.renderAssignment()}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="member_user_course">

                  </div>
                </div>
              </div>
            </div>

            <div className='box-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAssignment() {
    return _.map(this.state.assigments_of_user_subjects, assignment => {
      return <AssignmentItem
        key={assignment.id}
        current_user={this.state.current_user}
        assignment={assignment}
      />
    })
  }
}
