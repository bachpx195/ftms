import React from 'react';
import axios from 'axios';
import css from '../training_standards/assets/training_standard.scss';

export default class SubjectLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return(
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-body">
            <ul className="list-group custom-subject-list">
              {this.renderItem()}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderItem() {
    return this.state.remain_subjects.map((subject) => {
      let index = this.state.select_subjects.findIndex(
        select_subject => select_subject.id == subject.id);
      let checked = (index > -1) ? true : false;
    });
  }

  chooseSubjectItem(select_subjects) {
    this.props.chooseSubjectItem(this.state.select_subjects);
  }
}
