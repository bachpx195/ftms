import React from 'react';
import axios from 'axios';

export default class TrainingStandardItem extends React.Component {
  constructor(props) {
    super(props);
    selected_subjects: []
  }

  render() {
    let {name} = this.props.training_standard
    return (
      <li className={`list-group-item ${this.props.select}`}
        onClick={this.onClickStandardItem.bind(this)}>
        {name}
      </li>
    );
  }

  onClickStandardItem() {
    this.props.handleClickTrainingStandardItem(this.props.training_standard);
  }
}
