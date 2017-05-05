import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import CategoryPolicy from 'policy/category_policy';
import css from 'assets/sass/react-table.scss';
import Destroy from './actions/destroy';
import Header from './templates/header';
import Modal from './templates/modal'
import React from 'react';
import ReactTable from 'react-table';
import Update from './actions/update';

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
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('categories.headers.name'),
        accessor: 'name',
        render: ({row}) => <a href={routes.category_url(row.id)}>{row.name}</a>
      },
      {
        header: I18n.t('categories.headers.description'),
        accessor: 'description',
        render: (row) => <span title={row.value}>{row.value}</span>,
        minWidth: 450
      },
      {
        header: '',
        accessor: 'actions',
        render: row => (
          <div className='text-center'>
            <CategoryPolicy
              permit={[{
                action: ['update', 'creator'], target: 'children',
                data: {creator_id: row.row.creator_id}
              }]}>
              <button className='btn btn-info' data-index={row.index}
                onClick={this.handleEdit.bind(this)}
                title={I18n.t('buttons.edit')}>
                <i className='fa fa-pencil-square-o'></i>
              </button>
            </CategoryPolicy>
            <Destroy category={row.row}
              handleAfterDeleted={this.props.handleAfterDeleted} />
          </div>
        ),
        sortable: false,
        hideFilter: true,
        width: 150
      }
    ];

    let modal_edit = null;
    if(this.state.category.id){
      modal_edit = (
        <Modal url={routes.category_url(this.state.category.id)}
          category={this.state.category}
          handleAfterUpdated={this.props.handleAfterUpdated.bind(this)} />
      );
    }

    return(
      <div className='list-categories'>
        <ReactTable className='-striped -highlight'
          data={this.policyFilterData()}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        {modal_edit}
      </div>
    )
  }

  policyFilterData() {
    let categories = [];
    let policy = new CategoryPolicy({refresh: false});
    for (let category of this.state.categories) {
      var permit = [
        {action: ['show', 'creator'], data: {creator_id: category.creator_id}}
      ];
      if (policy.checkAllowFunction(permit)) {
        categories.push(category);
      }
    }
    return categories;
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
