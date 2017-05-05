import * as routes from 'config/routes';
import axios from 'axios';
import Categories from './categories'
import CategoryPolicy from 'policy/category_policy';
import Form from './templates/form'
import React from 'react';
import Row from './griddle/row';

const CATEGORIES_URL = routes.categories_url();

export default class CategoriesBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: props.categories,
      category: {},
    }
    Row.prototype.categories = this.state.categories;
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('categories.titles.all')}</h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>
            <div className='box-body no-padding'>
              <div className='form-create clearfix'>
                <div className='col-md-8 col-md-offset-2'>
                  <CategoryPolicy permit={[
                    {action: ['create'], target: 'children'}]}>
                    <Form url={CATEGORIES_URL} category
                      handleAfterCreated={this.handleAfterCreated.bind(this)} />
                  </CategoryPolicy>
                </div>
                <div className='clearfix'></div>
                <Categories category={this.state.category}
                  categories={this.state.categories}
                  handleAfterDeleted={this.handleAfterDeleted.bind(this)}
                  handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                  afterClickEdit={this.afterClickEdit.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterClickEdit(category) {
    this.setState({
      category: category
    });
  }

  handleAfterDeleted(category){
    _.remove(this.state.categories, _category => {
      return _category == category;
    });
    this.setState({
      categories: this.state.categories,
      category: {}
    });
  }

  handleAfterUpdated(category) {
    let index = this.state.categories.findIndex(_category => _category.id === category.id);
    this.state.categories[index] = category;
    this.setState({
      categories: this.state.categories,
      category: {}
    });
  }

  handleAfterCreated(category){
    this.state.categories.push(category)
    this.setState({
      categories: this.state.categories,
      category: {}
    })
  }
}
