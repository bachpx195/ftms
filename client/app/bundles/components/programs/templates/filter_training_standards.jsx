import CoursePolicy from 'policy/course_policy'
import React from  'react';
import TrainingStandardPolicy from 'policy/training_standard_policy'

export default class FilterTrainingStandards extends React.Component {
  render() {
    let btn_create_course = '';
    if (this.props.training_standards) {
      btn_create_course = <CoursePolicy permit={[
        {action: ['ownerById'], data: {id: this.props.organization.user_id}},
        {action: ['create']}
      ]}>
        <button className='btn btn-info' onClick={this.handleCreateCourse.bind(this)}>
          <i className='fa fa-plus'></i>
          &nbsp;{I18n.t('courses.create_course')}
        </button>
      </CoursePolicy>;
    }

    return (
      <div className='col-md-6 program-control training-standard-program'>
        <div className='box box-primary box-float clearfix'>
          <div className='col-md-12 program-control'>
            <fieldset>
              <div className='box-header with-border box-header-gray'>
                <h4 className='box-title'>
                  <strong>{I18n.t('programs.sort')}</strong>
                </h4>
              </div>
              <select className='form-control'
                onChange={this.handleSelectChange.bind(this)}>
                <option key='0' value='0'>
                  {I18n.t('training_standards.titles.all')}
                </option>
                {this.renderOptionTrainingStandard()}
              </select>
            </fieldset>
            {btn_create_course}
            <TrainingStandardPolicy permit={[
              {action: ['ownerById'], data: {id: this.props.organization.user_id}},
              {action: ['create']}
            ]}>
              <button className='btn btn-info' onClick={this.handleCreateStandard.bind(this)}>
                <i className='fa fa-plus'></i>
                &nbsp;{I18n.t('training_standards.create')}
              </button>
            </TrainingStandardPolicy>
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
    $('.modal-edit').modal();
  }

  handleCreateStandard() {
    $('.modal-create-standards').modal({
      backdrop: 'static',
    });
  }
}
