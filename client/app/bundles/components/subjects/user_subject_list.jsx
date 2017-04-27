import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalEvaluateMember from '../courses/modal_evaluate_member/modal';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

export default class UserSubjectList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_subjects: props.user_subjects,
      statuses: props.statuses,
      course_subjects: [],
      user: {},
      member_evaluations: props.member_evaluations || [],
      owner_id: props.owner_id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user_subjects: nextProps.user_subjects,
      statuses: nextProps.statuses,
      member_evaluations: nextProps.member_evaluations,
      owner_id: nextProps.owner_id
    });
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );
    const SelectBoxStatus = ({griddleKey}) => {
      return <select className='select-status'
        onChange={this.handleChange.bind(this, griddleKey)}
        name='status' value={this.state.user_subjects[griddleKey].status}>
        {this.renderOptions()}
      </select>;
    }

    const addTask = ({griddleKey}) => (
      <button className='btn btn-primary'
        onClick={this.handleAddTaskForUser.bind(this)}
        data-index={griddleKey}
        data-user_id={this.state.user_subjects[griddleKey].user_id}>
        {I18n.t('subjects.headers.all_task')}
      </button>
    )

    const evaluate = ({griddleKey}) => {
      let user = {
        name: this.state.user_subjects[griddleKey].user_name,
        id: this.state.user_subjects[griddleKey].user_id,
      }
      let user_subject = this.state.user_subjects[griddleKey];
      if (user_subject.status != 'init') {
        return <button className='btn btn-success'
          onClick={this.handleEvaluateModal.bind(this, user)}>
          {I18n.t('courses.evaluation.evaluate')}
        </button>
      }
      return null;
    }

    return (
      <div>
        <Griddle data={this.state.user_subjects}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='user_name'
              title={I18n.t('subjects.headers.user_name')} />
            <ColumnDefinition id='start_date'
              title={I18n.t('subjects.headers.start_date')} />
            <ColumnDefinition id='end_date'
              title={I18n.t('subjects.headers.end_date')} />
            <ColumnDefinition id='user_end_date'
              title={I18n.t('subjects.headers.user_end_date')} />
            <ColumnDefinition id='status'
              title={I18n.t('subjects.headers.status')}
              customComponent={SelectBoxStatus} />
            <ColumnDefinition id='current_progress'
              title={I18n.t('subjects.headers.current_progress')} />
            <ColumnDefinition id='evaluate'
              title={I18n.t('subjects.headers.evaluate')}
              customComponent={evaluate} />
            <ColumnDefinition id='add_task_for_user'
              title={I18n.t('subjects.headers.all_task')}
              customComponent={addTask} />
          </RowDefinition>
        </Griddle>

        <ModalEvaluateMember
          subject={this.props.subject}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations}
          user={this.state.user} course={this.props.course}
          evaluation_template={this.props.evaluation_template}
          afterEvaluateMember={this.afterEvaluateMember.bind(this)}
        />
      </div>
    );
  }

  handleAddTaskForUser(event) {
    let target = event.target
    $(target).blur()
    let index = $(target).data('index')
    let user = this.state.user_subjects[index]
    this.props.afterAddTaskForUser(user, index)
  }

  handleChange(griddleKey, event) {
    let user_subject = this.state.user_subjects[griddleKey];
    axios.patch(routes.user_subject_url(user_subject.id), {
      status: event.target.value,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      Object.assign(user_subject, response.data.user_subject);
      let index = this.state.user_subjects.findIndex(user_subject_item => {
        return user_subject_item.id === user_subject.id;
      });
      this.state.user_subjects[index] = user_subject;
      this.setState({
        user_subjects: this.state.user_subjects,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleEvaluateModal(user, event){
    event.preventDefault();
    this.setState({
      user: user
    });
    $('.modal-evaluate-member').modal();
  }

  afterEvaluateMember(member_evaluation, member_evaluation_items){
    Object.assign(member_evaluation, {member_evaluation_items});
    let index = this.state.member_evaluations.findIndex(_evaluation => {
      return _evaluation.id == member_evaluation.id;
    });
    if (index >= 0) {
      this.state.member_evaluations[index] = member_evaluation;
    } else {
      this.state.member_evaluations.push(member_evaluation);
    }
    this.setState({member_evaluations: this.state.member_evaluations});
  }

  renderOptions() {
    let statuses=[];
    for(var key in this.state.statuses){
      statuses.push(
        <option key={this.state.statuses[key]} value={key}>
          {I18n.t('subjects.status.'+ key)}
        </option>
      )
    }
    return statuses;
  }
}
