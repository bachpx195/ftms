import * as app_constants from 'constants/app_constants';
import * as table_constants from 'constants/griddle_table_constants';
import axios from 'react';
import CategoryPolicy from 'policy/category_policy';
import Destroy from './actions/destroy';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Header from './templates/header';
import Modal from './templates/modal'
import Row from './griddle/row';
import React from 'react';
import Update from './actions/update';

const CATEGORIES_URL = app_constants.APP_NAME + app_constants.CATEGORIES_PATH;

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      category: props.category
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories,
      category: nextProps.category
    })
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
              <i className="fa fa-pencil-square-o"></i>
              &nbsp;{I18n.t('buttons.edit')}
            </button>
          </div>
        </CategoryPolicy>
      </div>
    );

    const ButtonDelete = ({griddleKey}) => (
      <Destroy category={this.state.categories[griddleKey]}
        categories={this.state.categories}
        handleAfterDeleted={this.props.handleAfterDeleted} />
    )

    const LinkToCategory = ({griddleKey}) => {
      let {id, name} = this.state.categories[griddleKey] ;
      return(
        <a href={CATEGORIES_URL + '/' + id}>{name}</a>
      )
    }
    let modal_edit = null;
    if(this.state.category.id){
      modal_edit = (
        <Modal url={CATEGORIES_URL + '/' + this.state.category.id}
          category={this.state.category}
          handleAfterUpdated={this.props.handleAfterUpdated.bind(this)} />
      );
    }
    return(
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
    this.props.afterClickEdit(this.state.categories[index])
  }
}
