import React from 'react';
import axios from 'axios';
import Errors from '../shareds/errors';

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: null,
      name: props.category.name || '',
      description: props.category.description || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.category.name || '',
      description: nextProps.category.description || ''
    });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors}/>
        <div className='form-group'>
          <label className='name'>{I18n.t('categories.form.name')}</label>
          <input type='text'
            placeholder={I18n.t('categories.form.placeholder_name')}
            onChange={this.handleChange.bind(this)}
            value={this.state.name}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <label className='name'>{I18n.t('categories.form.description')}
          </label>
          <input type='text'
            placeholder={I18n.t('categories.form.placeholder_description')}
            onChange={this.handleChange.bind(this)}
            value={this.state.description}
            className='form-control' name='description' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}> {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    )
  }

  formValid() {
    return this.state.name != '';
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let category = _.omit(this.state, 'errors');
    let formData = new FormData();
    for(let key of Object.keys(category)) {
      formData.append('category[' + key + ']', category[key]);
    }

    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let method = this.props.category.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if (this.props.category.id) {
        $('.modalEdit').modal('hide');
        this.props.handleAfterUpdated(response.data.category)
      } else {
        this.setState({
          name: '',
          description: '',
          errors: null,
        });
        this.props.afterCreateCategory(response.data.category)
      }
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
