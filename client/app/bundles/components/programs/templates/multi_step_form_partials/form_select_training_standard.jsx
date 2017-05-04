import React from 'react';
import ReactOnRails from 'react-on-rails';
import TrainingStandardPreview from './training_standard_preview';

require('../../../../assets/sass/program_show.scss');

export default class SelectTraningStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: {},
      owners: props.owners,
      training_standards: props.training_standards,
      current_item: []
    };
  }

  render() {
    let training_standard_preview = (
      <TrainingStandardPreview current_item={this.state.current_item} />
    );
    return (
        <div className='row'>
          <div className='col-md-6'>
            <div className='panel panel-default'>
              <div className='panel-heading text-center'>
                {I18n.t('training_standards.list_training_standards')}
              </div>
              <div className='panel-body'>
                <input className="form-control search_form"
                  placeholder={I18n.t('training_standards.search_standards')}
                  onChange={this.filterTrainingStandard.bind(this)} />
                <div className='list-group list-user clearfix'>
                  {this.renderTrainingStandard()}
                </div>
              </div>
            </div>
          </div>
          {training_standard_preview}
        </div>
    );
  }

  isIncludeTrainingStandards(training_standard, value) {
    return training_standard.name.toLowerCase().includes(value.toLowerCase());
  }

  filterTrainingStandard(event) {
    let value = event.target.value;
    let training_standards = '';
    training_standards = this.state.training_standards
      .filter(training_standard => {
      return this.isIncludeTrainingStandards(training_standard, value);
    });
    if (value == "") {
      this.setState({
        training_standards: this.props.training_standards
      });
    } else {
      this.setState({
        training_standards: training_standards
      });
    }
  }

  renderTrainingStandard() {
    return this.state.training_standards.map(training_standard => {
      return (
        <label key={training_standard.id} className='list-group-item cursor'
          value={training_standard.id} >
          <input type='radio' name='radio' key={training_standard.id}
            onChange={this.handleOptionChange.bind(this)}
            value={training_standard.id} />
          {training_standard.name}
        </label>
      )
    })
  }

  handleOptionChange(event) {
    let value = event.target.value
    let training_standard = this.props.training_standards
      .find(result => result.id == value);
    this.setState({ current_item: training_standard });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program_detail: nextProps.program_detail,
      errors: null,
      all_roles: nextProps.all_roles,
      owners: nextProps.owners
    });
  }
}
