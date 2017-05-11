import React from 'react';
import Update from '../actions/update';
import ModalRequirement from '../templates/modal';
import * as table_constants from 'constants/griddle_table_constants';
import ReactTable from 'react-table';
import RequirementPolicy from 'policy/requirement_policy';
import css from 'assets/sass/react-table.scss';
import * as react_table_ultis from 'shared/react-table/ultis';
require('../../../assets/sass/projects.scss');


export default class RequirementGriddle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: props.requirements,
    }
  }


  policyFilterData() {
    let requirements = [];
    let policy = new RequirementPolicy({refresh: false});
    for (let requirement of this.state.requirements) {
      var permit = [
        {action: ['ownerById'], data: {id: this.props.organization.user_id}},
        {action: ['ownerByIds'], data: {ids: this.props.ids_of_course_manager}},
        {action: ['show', 'memberOfTeam'], data: {
          teams_of_project: this.props.project.teams_of_project,
          teams_of_current_user: this.props.project.teams_of_current_user}},
        {action: ['show', 'belongById'], data: {id: this.props.organization.id}}
      ];
      if (policy.checkAllowFunction(permit)) {
        requirements.push(requirement);
      }
    }
    return requirements;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requirements: nextProps.requirements,
    });
  }

  render() {
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('projects.headers.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('projects.priority'),
        accessor: 'priority',
      },
      {
        header: '',
        accessor: 'requirement',
        render: row => {
          return (
            <Update
              ids_of_course_manager={this.props.ids_of_course_manager}
              project={this.props.project}
              organization={this.props.organization}
              requirement={this.state.requirements[row.value]}
              handleOnClickEdit={this.handleOnClickEdit.bind(this)}
              handleAfterDelete={this.handleAfterDelete.bind(this)}
            />
          )
        }
      }
    ]

    return (
      <div>
        <ReactTable
          className='-striped -highlight' data={this.state.requirements}
          columns={columns} showFilters={true}
          defaultPageSize={react_table_ultis.defaultPageSize}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }

  handleOnClickEdit(requirement, url) {
    this.props.handleOnClickEdit(requirement, url);
  }

  handleAfterDelete(deleted_requirement) {
    _.remove(this.state.requirements,
      requirement => requirement.id === deleted_requirement.id);
    this.setState({requirements: this.state.requirements});
  }
}
