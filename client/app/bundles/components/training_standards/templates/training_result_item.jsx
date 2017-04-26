import React from 'react';

export default class TrainingResultItem extends React.Component {
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
          <input type='text' value={this.state.name}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </td>
        <td>
          <input type='number' value={this.state.min_point}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='min_point' min='0'/>
        </td>
        <td>
          <input type='number' value={this.state.max_point}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='max_point' min='0' />
        </td>
        <td>
          <button type='button' className='btn btn-danger'
            onClick={this.removeTrainingResult.bind(this)}>
            <i className='fa fa-remove'></i>
          </button>
        </td>
      </tr>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state, {[attribute]: event.target.value});
    this.props.changeTrainingResult(this.props.index, this.state);
  }

  removeTrainingResult(event) {
    event.preventDefault();
    if (confirm(I18n.t('data.confirm_delete'))) {
      this.props.removeTrainingResult(this.props.index);
    }
  }
}
