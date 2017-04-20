import React from 'react';

export default class EvaluationStandardItem extends React.Component {
  render() {
    return (
      <p className='list-group-item'>
        <i>{this.props.index + '. '}</i> {this.props.evaluation_standard.name}
      </p>
    );
  }
}
