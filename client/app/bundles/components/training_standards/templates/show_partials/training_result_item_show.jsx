import React from 'react';

export default class TrainingResultItemShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.training_result.id,
      name: props.training_result.name || '',
      min_point: props.training_result.min_point || 0,
      max_point: props.training_result.max_point || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.training_result.id,
      name: nextProps.training_result.name || '',
      min_point: nextProps.training_result.min_point || 0,
      max_point: nextProps.training_result.max_point || 0,
    });
  }

  render() {
    return (
      <tr>
        <td><span>{this.props.index + 1}</span></td>
        <td>
          <span className='form-control'>
            {this.state.name || ''}
          </span>
        </td>
        <td>
          <span className='form-control'>
            {this.state.min_point || 0}
          </span>
        </td>
        <td>
          <span className='form-control'>
            {this.state.max_point || 0}
          </span>
        </td>
      </tr>
    );
  }
}
