import React from 'react';
import _ from 'lodash';
import {FunctionsHelper} from '../helper/functions';

export default class CategoriesObject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: props.categories || [],
    }
    this.props.handleRegisterRefresh('categories_object', this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories
    })
    var category_preview = null;
    if(nextProps.categories[0]){
      nextProps.categories[0].active = true;
      category_preview = nextProps.categories[0]
    } else
      category_preview = [];
    this.props.handleRefresh(['category_preview'], 
      {category: category_preview});
  }

  render(){
    if(this.state.categories.length <= 0 ) return null;
    const categories = _.map(this.state.categories,
      (item, index) => {
        if(item._destroy == 1 || item.isHidden) return '';
        var className = item.active ?
          'list-group-item node-item active' : 'list-group-item node-item';
        return (
          <li key={index} className={className}>
            <div data-index={index} onClick={this.handleShowCategory.bind(this)}
              className='list-node'>
              {item.info.name}
            </div>
            <i data-index={index} onClick={this.handleRemoveCategory.bind(this)}
              className='icon-remove glyphicon glyphicon-remove'></i>
          </li>
        );
      }
    );
    return(
      <div>
        <input type='text' className='form-control' onChange={this.filterCategories.bind(this)}/>
        <ul className="list-group list-category scroll-bar">
          {categories}
        </ul>
      </div>
      );
  }

  filterCategories(event) {
    let value = event.target.value;
    for(var category of this.state.categories){
      if(category.info.name.toLowerCase().includes(value.toLowerCase()))
        category['isHidden'] = false;
      else
        category['isHidden'] = true;
    }
    this.setState({refresh: true});
  }

  handleShowCategory(event) {
    var $target = $(event.target);
    var categories = FunctionsHelper.resetActive(this.state.categories);
    var category = categories[$target.data('index')];
    category['active'] = true;
    this.props.handleRefresh(['category_preview'],
      {category: category});
    this.setState({
      refresh: true,
    })
  }

  handleRemoveCategory(event) {
    var $target = $(event.target);
    $($target).parent().fadeOut();
    var categories = this.state.categories;
    var category = categories[$target.data('index')];
    category['_destroy'] = 1;
    if(category.active) {
      category['active'] = false;
      this.props.handleRefresh(['category_preview'],
        {category: FunctionsHelper.findNodeActive(categories)});
    }
    this.setState({
      categories: categories
    })
  }

  refreshObject(data){
    this.setState(data);
    this.props.handleRefresh(['category_preview'], 
      {category: FunctionsHelper.findNodeActive(data.categories)});
  }
}
