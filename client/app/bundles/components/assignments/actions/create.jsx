import axios from 'axios';
import AssignmentMetaType from '../../subjects/templates/assignment_meta_type';
import css from '../../subjects/assets/subject.scss';
import React from 'react';
import * as app_constants from 'constants/app_constants';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: ''
      },
      type: props.type || '',
      meta_types_checked: props.meta_types_checked || [],
      meta_types: props.meta_types || [],
      subject: props.subject
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type || '',
      meta_types: nextProps.meta_types || [],
      meta_types_checked: nextProps.meta_types_checked || [],
      subject: nextProps.subject
    })
  }

  render() {
    return(
      <div>
        <form className='form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='email'>
              {I18n.t('assignments.name')}
            </label>
            <div className='col-md-10'>
              <input type='text' placeholder={I18n.t('subjects.headers.name')}
                className='form-control' name='name' ref='nameField'
                onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='email'>
              {I18n.t('assignments.content')}
            </label>
            <div className='col-md-10'>
              <input type='text' placeholder={I18n.t('subjects.headers.content')}
                className='form-control' name='content' ref='contentField'
                onChange={this.handleChange.bind(this)} />
            </div>
          </div>
        </form>

        <div className='form-group'>
          <label className='control-label col-sm-2' htmlFor='email'>
            {I18n.t('assignments.meta_type')}
          </label>
          <div className='col-md-10'>
            <AssignmentMetaType
              permit_create_meta_type={this.props.permit_create_meta_type}
              subject={this.props.subject}
              meta_types={this.state.meta_types}
              meta_types_checked={this.state.meta_types_checked}
              handleAfterCreated={this.handleAfterCreated.bind(this)}
              handleAfterChecked={this.handleAfterChecked.bind(this)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='col-md-12 text-center'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}
              onClick={this.handleSubmit.bind(this)}>
              {I18n.t('buttons.create_task')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  formValid() {
    return this.state.task.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      task: {
        [attribute]: event.target.value
      }
    });
  }

  handleAfterCreated(meta_type) {
    this.state.meta_types.push(meta_type);
    this.state.meta_types_checked.push(meta_type);
    this.setState({
      meta_types: this.state.meta_types,
      meta_types_checked: this.state.meta_types_checked
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url, {
      meta_types_checked: this.state.meta_types_checked,
      targetable: {
        name: this.refs.nameField.value,
        content: this.refs.contentField.value
      },
      ownerable_id: this.props.ownerable_id,
      ownerable_type: this.props.ownerable_type,
      type: this.props.type,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        this.refs.contentField.value = '';
        this.props.handleAfterCreatedAssignment(response.data.target);
      })
      .catch(error => console.log(error));
  }

  handleAfterChecked(meta_types_checked) {
    this.setState({
      meta_types_checked: meta_types_checked
    })
  }
}
