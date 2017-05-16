import _ from 'lodash';
import * as react_table_ultis from 'shared/react-table/ultis';
import CategoryPreview from './category_preview';
import Checkbox from 'shared/checkbox';
import css from 'assets/sass/react-table.scss';
import {FunctionsHelper} from '../helper/functions';
import QuestionPreview from './question_preview';
import React from 'react';
import ReactTable from 'react-table';
import SelectSell from 'shared/select_cell';

export default class AdditionFormCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      current_categories: props.current_categories,
      temp_categories: [],
      check_all: 'none',
      page_index: 0
    };
    this.props.handleRegisterRefresh('addition_category', this);
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
        header: I18n.t('test_rules.form.name'),
        accessor: 'name'
      },
      {
        header: I18n.t('test_rules.form.description'),
        accessor: 'description',
        render: row => <span title={row.value}>{row.value}</span>,
        minWidth: 400
      },
      {
        header: props => {
          return <SelectSell checked={this.state.check_all}
            handleSelectCell={this.handleSelectCell.bind(this)} />;
        },
        accessor: 'checkbox',
        render: row => {
          var checked = false;
          if (this.state.check_all == 'yes') {
            checked = true;
            row.row.checked = checked;
          } else if (this.state.check_all == 'no') {
            checked = false;
            row.row.checked = checked;
          } else if (this.state.check_all == 'none') {
            checked = row.row.checked
          }
          return (
            <Checkbox handleClick={this.handleCheckbox.bind(this)}
              index={row.index} is_checked={checked} />
          );
        },
        hideFilter: true,
        sortable: false,
        style: {textAlign: 'center'},
        width: 50
      }
    ];

    return(
      <div>
        <ReactTable className='-striped -highlight'
          data={this.state.temp_categories} page={this.state.page_index}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true} onPageChange={this.onPageChange.bind(this)}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        <div className='col-xs-offset-9'>
          <button className='btn btn-primary' onClick={this.handleBack.bind(this)}>
            {I18n.t('buttons.back')}
          </button>
          <button className='btn btn-primary' onClick={this.handleSave.bind(this)}>
            {I18n.t('buttons.add')}
          </button>
        </div>
      </div>
    );
  }

  handleBack() {
    $('a[href="#phrase-2"]').trigger('click');
  }

  handleSave() {
    var categories = this.state.temp_categories.filter(
      (object) => {return object.checked}
    );
    $('a[href="#phrase-2"]').trigger('click');
    var rule_categories = _.map(categories, (item) => {
      delete item['checked'];
      return {
      category_id: item.id,
      number_question: 0,
      easy: 40,
      normal: 40,
      hard: 20,
      info: item
    }});
    this.setState({
      check_all: 'none',
    });
    for(var category of rule_categories)
      this.state.current_categories.push(category);
    this.props.handleRefresh(['condition_form', 'categories_object'],
      {categories: this.state.current_categories})
  }

  handleCheckbox(index, checked) {
    this.state.temp_categories[index].checked = checked;
    this.setState({
      check_all: 'none',
      temp_categories: this.state.temp_categories
    })
  }

  removeAlreadySelected(all, current) {
    var ids = _.map(current,
      (item) => {if(item._destroy != 1) return item.info.id});
    var data = all.filter(item => {
      return ids.findIndex(id => id === item.id) < 0;
    });
    return FunctionsHelper.deepClone(data);
  }

  handleSelectCell(event) {
    var checked = $(event.target).is(':checked');
    this.setState({
      check_all: checked ? 'yes' : 'no',
      temp_categories: this.state.temp_categories
    });
  }

  onPageChange(page_index) {
    this.setState({
      check_all: 'none',
      page: page_index
    });
  }

  refreshObject(data){
    this.setState({
      current_categories: data.current_categories,
      temp_categories:
        this.removeAlreadySelected(this.props.categories, data.current_categories)
    });
  }
}
