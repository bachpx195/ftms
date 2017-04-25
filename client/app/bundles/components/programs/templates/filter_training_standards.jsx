import React from  'react';

export default class FilterTrainingStandards extends React.Component {
  render() {
    return (
      <div className='col-md-6 program-control'>
        <div className='box box-primary box-float clearfix'>
          <div className='col-md-12 program-control'>
            <fieldset>
              <div className='box-header with-border box-header-gray'>
                <h4 className='box-title'>
                  <strong>{I18n.t('programs.sort')}</strong>
                </h4>
              </div>
              <select className="form-control"
                onChange={this.handleSelectChange.bind(this)}>
                <option key="0" value="0">
                  {I18n.t('training_standards.titles.all')}
                </option>
                {this.renderOptionTrainingStandard()}
              </select>
            </fieldset>
            <button className='btn btn-info' onClick={this.handleCreateCourse.bind(this)}>
              <i className="fa fa-plus"></i>
              &nbsp;{I18n.t('courses.create_course')}
            </button>
            <button className='btn btn-info' onClick={this.handleCreateStandard.bind(this)}>
              <i className="fa fa-plus"></i>
              &nbsp;{I18n.t("training_standards.create")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleSelectChange(event) {
    this.props.handleAfterSelectTrainingStandard(parseInt(event.target.value))
  }

  renderOptionTrainingStandard() {
    return _.map(this.props.training_standards, standard => {
      return (
        <option key={standard.id} value={standard.id.toString()}>
          {standard.name}
        </option>
      );
    });
  }

  handleCreateCourse(event) {
    $('.modalEdit').find('select, input').val('');
    $('.modalEdit').modal();
    this.props.handleAfterClickCreateCourse();
  }

  handleCreateStandard() {
    $('.modalCreateStandards').find('input').val('');
    $('.modalCreateStandards').modal();
  }
}
