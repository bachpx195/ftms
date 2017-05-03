import axios from 'axios';
import React from 'react';
import SubjectLists from './subject_lists';

export default class AssignSubjectStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      select_subjects: [],
    }
  }

  render() {
    return (
      <fieldset>
        <input className='form-control search_form' id='filter-list-courses'
          autoComplete='off' placeholder={I18n.t('courses.search')}
          onChange={this.filterCourses.bind(this)}/>
        <div className='panel panel-primary'>
          <div className='panel-body'>
            <SubjectLists
              subjects={this.props.subjects}
              selected_subjects={this.state.selected_subjects}
              standard_subjects={this.state.standard_subjects}
              training_standard={this.state.training_standard}
              select_subjects={this.state.select_subjects}
              chooseSubjectItem={this.chooseSubjectItem.bind(this)} />
          </div>
        </div>
        <div className='text-center col-md-12'>
          <input type='button' name='previous' className='previous action-button'
            value='Previous' onClick={this.props.onClickPrevious}/>
          <input type='button' name='next' className='next action-button'
            value='Next' onClick={this.props.onClickNext}/>
        </div>
      </fieldset>
    );
  }

  filterCourses(event) {
    let value = event.target.value;
    this.state.courses = this.state.courses_search.filter(course => {
      return course.name.toLowerCase().includes(value.toLowerCase()) ||
        course.training_standard.name.toLowerCase().includes(value.toLowerCase()) ||
        course.description.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({courses: this.state.courses});
  }

  chooseSubjectItem(select_subjects) {
    this.setState({
      select_subjects: select_subjects
    });
  }
}
