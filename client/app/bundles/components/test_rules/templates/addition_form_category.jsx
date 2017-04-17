import CategoryPreview from './category_preview';
import Checkbox from '../../shareds/checkbox';
import {FunctionsHelper} from '../helper/functions';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from 'shared/griddles/new_layout';
import SelectSell from '../../shareds/select_cell';
import React from 'react';
import QuestionPreview from './question_preview';
import _ from 'lodash';
import * as table_constants from 'constants/griddle_table_constants';

export default class AdditionFormCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      current_categories: props.current_categories,
      temp_categories: [],
      check_all: 'none'
    };
    this.props.handleRegisterRefresh('addition_category', this);
  }

  render() {
    const CheckboxFunction = ({griddleKey}) => {
      var checked = false;
      if (this.state.check_all == 'yes') {
        checked = true;
        this.state.temp_categories[griddleKey].checked = checked;
      } else if (this.state.check_all == 'no') {
        checked = false;
        this.state.temp_categories[griddleKey].checked = checked;
      } else if (this.state.check_all == 'none') {
        var cate = this.state.temp_categories[griddleKey];
        checked = cate.checked
      }
      return (
        <Checkbox handleClick={this.handleCheckbox.bind(this)} griddleKey={griddleKey}
          is_checked={checked}/>
      );
    };

    const SelectSellBox = () => {
      return (
        <SelectSell checked={this.state.check_all} handleSelectCell={this.handleSelectCell.bind(this)}/>
      );
    };

    return(
      <div>
        <Griddle data={this.state.temp_categories} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}
          events={{
            onNext: this.handlePage.bind(this),
            onPrevious: this.handlePage.bind(this),
            onGetPage: this.handlePage.bind(this),
          }}>
          <RowDefinition>
            <ColumnDefinition id="id"
              title={I18n.t("test_rules.form.id")}/>
            <ColumnDefinition id="name"
             title={I18n.t("test_rules.form.name")}/>
            <ColumnDefinition id="description"
             title={I18n.t("test_rules.form.description")} />
            <ColumnDefinition customComponent={CheckboxFunction.bind(this)}
              customHeadingComponent={SelectSellBox} />
          </RowDefinition>
        </Griddle>
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

  handleCheckbox(griddleKey, checked) {
    this.state.temp_categories[griddleKey].checked = checked;
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

  handlePage(){
    this.setState({
      check_all: 'none',
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
