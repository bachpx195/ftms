import React from 'react'
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormEdit from './form_edit'
import * as app_constants from 'constants/app_constants';

const COURSE_URL = app_constants.APP_NAME;

export default class MenuCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      url: props.url,
    };
  }
  render(){
    return(
      <div className="td-course-edit-delete">
        <a onClick={this.handleEdit.bind(this)}>
          <span className="glyphicon glyphicon-edit pull-right"
            aria-hidden="true">
          </span>
        </a>
        <a onClick={this.handleDelete.bind(this)}>
          <span className="glyphicon glyphicon-trash pull-right"
            aria-hidden="true">
          </span>
        </a>
        <FormEdit course={this.state.course}
          url={this.state.url}
          handleAfterUpdate={this.handleAfterEdit.bind(this)} />
      </div>
    );
  }

  handleAfterEdit(course) {
    this.props.handleAfterEdit(course);
  }

  handleDelete(event) {
    let course = event;
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.state.url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        window.location.href = COURSE_URL + 'organizations/' +
          response.data.program.organization_id +
          '/programs/' + response.data.program.id;
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course,
      url: nextProps.url
    });
  }

  handleEdit(event){
    $('#modalEdit').modal();
  }
}
