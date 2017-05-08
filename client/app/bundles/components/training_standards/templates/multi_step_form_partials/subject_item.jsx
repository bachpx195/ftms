import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class SubjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    let name = this.props.subject.name;
    let time = parseInt(this.props.subject.during_time);
    let day = I18n.t('training_standards.subject_preview.day');
    if (time > 1 || time == 0) {
      day = I18n.t('training_standards.subject_preview.days');
    }
    return (
      <li className='list-group-item'
        onClick={this.onClickSubjectItem.bind(this)}
        title={this.props.subject.name}>
        <input type='checkbox' value={this.props.subject.id}
          checked={this.state.checked} readOnly
          name={this.props.subject.name}>
        </input>
        {name} - {time + day}
      </li>
    );
  }

  onClickSubjectItem(event) {
    if (this.state.checked) {
      let index = this.state.select_subjects.findIndex(
        select_subject => select_subject.id == this.props.subject.id)
      this.state.select_subjects.splice(index, 1);
      this.props.chooseSubjectItem(this.state.select_subjects);
    } else {
      this.state.select_subjects.push(this.props.subject);
      this.props.chooseSubjectItem(this.state.select_subjects);
    }
  }
}
