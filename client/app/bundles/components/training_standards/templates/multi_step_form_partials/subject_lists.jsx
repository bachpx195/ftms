import axios from 'axios';
import React from 'react';
import SubjectItem from './subject_item';

require ('../../assets/training_standard.scss');

export default class SubjectLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return (
      <div className='subject-container'>
          <ul className='list-group custom-subject-list'>
            {this.renderItem()}
          </ul>
      </div>
    );
  }

  renderItem() {
    let list_subject = '';

    if (this.state.remain_subjects) {
      list_subject = this.state.remain_subjects;
    } else {
      list_subject = this.state.subjects;
    }
    
    return list_subject.map(subject => {
      let index = this.state.select_subjects.findIndex(
        select_subject => select_subject.id == subject.id);
      let checked = (index > -1) ? true : false;
      return (
        <SubjectItem
          key={subject.id}
          subject={subject}
          checked={checked}
          standard_subjects={this.state.standard_subjects}
          selected_subjects={this.state.selected_subjects}
          training_standard={this.state.training_standard}
          select_subjects={this.state.select_subjects}
          chooseSubjectItem={this.chooseSubjectItem.bind(this)}
        />
      );
    });
  }

  chooseSubjectItem(select_subjects) {
    this.props.chooseSubjectItem(this.state.select_subjects);
  }
}
