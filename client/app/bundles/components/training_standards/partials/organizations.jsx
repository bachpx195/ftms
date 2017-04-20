import axios from 'axios';
import css from '../assets/training_standard.scss';
import Organization from './organization';
import React from 'react';

export default class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return(
      <div className='panel-group'>
        <div className='panel panel-primary'>
          <div className='panel-body'>
            <ul className='list-group custom-subject-list'>
              {this.renderItem()}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderItem() {
    return this.state.standard_organizations.map((organization, index) => {
      return(
        <Organization
          key={index}
          organization={organization}
          standard_organizations={this.state.standard_organizations}
          select_organizations={this.state.select_organizations}
          training_standard={this.state.training_standard}
          chooseOrganization={this.props.chooseOrganization}
        />
      );
    });
  }
}
