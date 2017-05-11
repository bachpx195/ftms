import React from 'react';
import RequirementGriddle from './griddle/requirement_griddle'
import RequirementPolicy from 'policy/requirement_policy';
import * as table_constants from 'constants/griddle_table_constants';
require('../../assets/sass/projects.scss');

export default class Requirements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requirements: props.requirements,
      showRequirement: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requirements: nextProps.requirements,
    });
  }

  render() {
    return (
      <div>
        <div className="list-requirements">
          <div className='panel panel-info noneselected-list-standards'>
            <div className='panel-heading'>
              {I18n.t('projects.showRiquirement')}
              <a className='new-evaluation-standard'
                onClick={this.showRequirement.bind(this)}>
                {this.renderIcon()}
              </a>
            </div>
            <div className='panel-body list-group
              noneselected-evaluation-standards'>
              {this.renderRequirementLists()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  showRequirement() {
    let show = this.state.showRequirement ? '' : {};
    this.setState({
      showRequirement: show,
    });
  }

  renderIcon() {
    if (this.state.showRequirement) {
      return (
        <i className='fa fa-minus pull-right'
          aria-hidden='true'></i>)
    } else {
      return (
        <i className='fa fa-plus pull-right'
          aria-hidden='true'></i>)
    }
  }

  renderRequirementLists() {
    if (this.state.showRequirement) {
      return (
        <RequirementGriddle 
          ids_of_course_manager={this.props.ids_of_course_manager}
          project={this.props.project}
          organization={this.props.organization}
          requirements={this.state.requirements}
          handleOnClickEdit={this.handleOnClickEdit.bind(this)} />
      );
    } else {
      return null;
    }
  }

  handleOnClickEdit(requirement, url) {
    this.props.handleOnClickEdit(requirement, url);
  }
}
