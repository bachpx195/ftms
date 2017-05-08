import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import ModalEvaluateMember from '../courses/modal_evaluate_member/modal';
import React from 'react';
import ReactTable from 'react-table';
import subject_css from './assets/subject.scss';

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

    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => row.index + 1,
        hideFilter: true,
        style: {textAlign: 'right'},
        width: 50
      },
      {
        header: I18n.t('subjects.headers.user_name'),
        accessor: 'user_name',
        render: ({row}) => {
          return <a href={routes.user_url(row.user_id)}>{row.user_name}</a>;
        },
        minWidth: 150
      },
      {
        header: I18n.t('subjects.headers.start_date'),
        id: 'start_date',
        accessor: d => this.formatDate(d.start_date),
        style: {textAlign: 'right'},
        width: 100
      },
      {
        header: I18n.t('subjects.headers.end_date'),
        id: 'end_date',
        accessor: d => this.formatDate(d.end_date),
        style: {textAlign: 'right'},
        width: 100
      },
      {
        header: I18n.t('subjects.headers.user_end_date'),
        id: 'user_end_date',
        accessor: d => this.formatDate(d.user_end_date),
        style: {textAlign: 'right'},
        width: 100
      },
      {
        header: I18n.t('subjects.headers.status'),
        id: 'status',
        accessor: d => I18n.t('user_subjects.statuses.' + d.status),
        render: ({row}) => {
          if (row.status == 'in_progress') {
            return <button className='btn btn-danger select-status'
              onClick={this.handleFinishUserSubject.bind(this, row)}>
              {I18n.t('subjects.finish')}
            </button>;
          } else {
            return <span
              className={I18n.t('user_subjects.class_statuses.' + row.status)}>
              {I18n.t('user_subjects.statuses.' + row.status)}
            </span>;
          }
        },
        width: 100
      },
      {
        header: I18n.t('subjects.headers.current_progress'),
        accessor: 'current_progress',
        style: {textAlign: 'right'}
      },
      {
        header: I18n.t('subjects.headers.evaluate'),
        accessor: 'evaluate_button',
        render: ({row}) => {
          let user = {
            name: row.user_name,
            id: row.user_id,
          }
          if (row.status != 'init') {
            return <button className='btn btn-success'
              onClick={this.handleEvaluateModal.bind(this, user)}>
              {I18n.t('courses.evaluation.evaluate')}
            </button>;
          }
          return null;
        },
        style: {textAlign: 'center'},
        hideFilter: true,
        sortable: false
      },
      {
        header: I18n.t('subjects.headers.all_task'),
        accessor: 'all_task_button',
        render: row => {
          return (
            <button className='btn btn-primary'
              onClick={this.handleAddTaskForUser.bind(this)}
              data-index={row.index}
              data-user_id={row.row.user_id}>
              {I18n.t('subjects.headers.all_task')}
            </button>
          );
        },
        style: {textAlign: 'center'},
        hideFilter: true,
        sortable: false
      }
    ];

    return (
      <div>
        <ReactTable className='-striped -highlight'
          data={this.state.user_subjects}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />

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

  formatDate(date) {
    if (date) return I18n.l('date.formats.default', date);
    return null;
  }

  handleAddTaskForUser(event) {
    let target = event.target
    $(target).blur()
    let index = $(target).data('index')
    let user = this.state.user_subjects[index]
    this.props.afterAddTaskForUser(user, index)
  }

  handleFinishUserSubject(user_subject, event) {
    axios.patch(routes.user_subject_url(user_subject.id) + '.json', {
      status: 'finished',
      authenticity_token: ReactOnRails.authenticityToken()
    })
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
}
