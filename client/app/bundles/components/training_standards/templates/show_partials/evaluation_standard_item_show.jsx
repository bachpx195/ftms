import React from 'react';

export default class EvaluationStandardItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.evaluation_standard.id,
      name: props.evaluation_standard.name || '',
      min_point: props.evaluation_standard.min_point || 0,
      max_point: props.evaluation_standard.max_point || 0,
      obligatory: props.evaluation_standard.obligatory || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.evaluation_standard.id,
      name: nextProps.evaluation_standard.name || '',
      min_point: nextProps.evaluation_standard.min_point || 0,
      max_point: nextProps.evaluation_standard.max_point || 0,
      obligatory: nextProps.evaluation_standard.obligatory || false,
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
        <td>
          <div className='checkbox require'>
            <input type='checkbox' name='obligatory' value={!this.state.obligatory}
              checked={this.state.obligatory} disabled='true'/>
          </div>
        </td>
      </tr>
    );
  }
}
