import axios from 'axios';
import Create from '../actions/create';
import Errors from '../../shareds/errors';
import React from 'react';
import Update from '../actions/update';

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
    let actions;
    if (this.props.category.id) {
      actions = (
        <Update category={this.props.category}
          url={this.props.url}
          state={this.state}
          handleAfterUpdated={this.props.handleAfterUpdated} />
      )
    } else {
      actions = (
        <Create category={this.props.category}
          url={this.props.url}
          state={this.state}
          handleAfterCreated={this.props.handleAfterCreated}/>
      )
    }
    return (
      <form>
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
          {actions}
        </div>
      </form>
    )
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }
}
