import React from 'react';
import axios from 'axios';
import Form from './form'
import Modal from './modal'
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as category_constands from './category_constants'
import css from './categories.scss';

const CATEGORY_URL = app_constants.APP_NAME + category_constands.CATEGORY_PATH

export default class CategoryBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: this.props.categories,
      category: {},
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='griddle-head clearfix'>
          <div className='col-md-6'>
            <Filter />
          </div>
          <div className='col-md-6 text-right'>
            <Pagination />
          </div>
        </div>
        <Table />
      </div>
    );

    const ButtonEdit = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleClickEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        data-type='delete' onClick={this.handleClickDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    )

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
                  <Form url={CATEGORY_URL} category
                    afterCreateCategory={this.afterCreateCategory.bind(this)}/>
                </div>
                <div className='clearfix'></div>
              </div>
              <div className='list-categories'>
                <Griddle data={this.state.categories} plugins={[plugins.LocalPlugin]}
                  components={{Layout: NewLayout}}
                  styleConfig={table_constants.styleConfig}>
                  <RowDefinition>
                    <ColumnDefinition id='name' title={I18n.t('programs.name')}/>
                    <ColumnDefinition id='description'
                      title={I18n.t('courses.description')} />
                    <ColumnDefinition id='edit' title={I18n.t('buttons.edit')}
                      customComponent={ButtonEdit}/>
                    <ColumnDefinition id='delete'
                      title={I18n.t('buttons.delete')}
                      customComponent={ButtonDelete}/>
                  </RowDefinition>
                </Griddle>
                <Modal url={CATEGORY_URL + '/' + this.state.category.id}
                  category={this.state.category}
                  handleAfterUpdated={this.handleAfterUpdated.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClickEdit(event){
    let $target = $(event.target);
    $target.blur();
    this.setState({
      category: this.state.categories[$target.data('index')]
    });
    $('.modalEdit').modal();
  }

  handleClickDelete(event){
    let $target = $(event.target);
    $target.blur();
    let category = this.state.categories[$target.data('index')];
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(CATEGORY_URL + '/' + category.id + '.json', {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        }
      })
      .then(response => {
        _.remove(this.state.categories, _category => {
          return _category.id == response.data.category.id;
        });
        this.setState({
          categories: this.state.categories,
          category: {}
        });
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(category) {
    let index = this.state.categories
      .findIndex(category => category.id === category.id);
    this.state.categories[index] = category;
    this.setState({
      category: this.state.categories,
      category: {}
    });
  }

  afterCreateCategory(category){
    this.state.categories.push(category)
    this.setState({
      categories: this.state.categories,
      category: {}
    })
  }
}
