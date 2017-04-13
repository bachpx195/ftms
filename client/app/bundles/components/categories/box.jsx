import React from 'react';
import axios from 'axios';
import Form from './templates/form'
import Modal from './templates/modal'
import Row from './griddle/row';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as category_constants from './constants/category_constants'
import css from './categories.scss';
import Destroy from './actions/destroy';
import Update from './actions/update';
import Header from './templates/header';
import CategoryPolicy from 'policy/category_policy';

const CATEGORY_URL = app_constants.APP_NAME + category_constants.CATEGORY_PATH

export default class CategoryBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: props.categories,
      category: {},
    }
    Row.prototype.categories = this.state.categories;
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <Header Table={Table} Pagination={Pagination} Filter={Filter} />
    );
    const ButtonEdit = ({griddleKey}) => (
      <div>
        <CategoryPolicy permit={[
          {action: ['update', 'creator'], target: 'children',
            data: {creator_id: this.state.categories[griddleKey].creator_id}}]}>
          <div>
            <button className='btn btn-info' onClick={this.handleEdit.bind(this)}
              data-index={griddleKey}>
              {I18n.t('buttons.edit')}
            </button>
          </div>
        </CategoryPolicy>
      </div>
    );

    const ButtonDelete = ({griddleKey}) => (
      <Destroy category={this.state.categories[griddleKey]}
        categories={this.state.categories}
        handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
    )

    const LinkToCategory = ({griddleKey}) => {
      let {id, name} = this.state.categories[griddleKey] ;
      return(
        <a href={CATEGORY_URL + id}>{name}</a>
      )
    }
    let modal_edit = null;
    if(this.state.category.id){
      modal_edit = (
        <Modal url={CATEGORY_URL + '/' + this.state.category.id}
          category={this.state.category}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

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
                    <Form url={CATEGORY_URL} category
                      handleAfterCreated={this.handleAfterCreated.bind(this)} />
                  </CategoryPolicy>
                </div>
                <div className='clearfix'></div>
              </div>
              <div className='list-categories'>
                <Griddle data={this.state.categories} plugins={[plugins.LocalPlugin]}
                  components={{Layout: NewLayout, Row: Row}}
                  styleConfig={table_constants.styleConfig}>
                  <RowDefinition>
                    <ColumnDefinition id='name' title={I18n.t('programs.name')}
                      customComponent={LinkToCategory}/>
                    <ColumnDefinition id='description'
                      title={I18n.t('courses.description')} />
                    <ColumnDefinition id='edit' title=' '
                      customComponent={ButtonEdit}/>
                    <ColumnDefinition id='delete'
                      title='  '
                      customComponent={ButtonDelete}/>
                  </RowDefinition>
                </Griddle>
                {modal_edit}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.category.id){
      $('.modal-edit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    let index = $target.data('index');
    this.setState({
      category: this.state.categories[index]
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
