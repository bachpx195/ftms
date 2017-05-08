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
          <input type='text' value={this.state.name || ''}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </td>
        <td>
          <input type='number' value={this.state.min_point || 0}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='min_point' min='0'/>
        </td>
        <td>
          <input type='number' value={this.state.max_point || 0}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='max_point' min='0' />
        </td>
        <td>
          <div className='checkbox require'>
            <input type='checkbox' name='obligatory' value={!this.state.obligatory}
              checked={this.state.obligatory}
              onChange={this.handleChangeObligatory.bind(this)}/>
          </div>
        </td>
        <td>
          <button type='button' className='btn btn-danger'
            onClick={this.removeEvaluationStandard.bind(this)}>
            <i className='fa fa-remove'></i>
          </button>
        </td>
      </tr>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state, {[attribute]: event.target.value});
    this.setState({...this.state});
    this.props.changeEvaluationStandard(this.props.index, this.state);
  }

  handleChangeObligatory(event) {
    let obligatory = event.target.name;
    let is_obligatory = event.target.value == 'true'
    Object.assign(this.state, {obligatory: is_obligatory});
    this.setState({...this.state});
    this.props.changeEvaluationStandard(this.props.index, this.state);
  }

  removeEvaluationStandard(event) {
    event.preventDefault();
    if (confirm(I18n.t('data.confirm_delete'))) {
      this.props.removeEvaluationStandard(this.props.index);
    }
  }
}
