import Checkbox from '../../shareds/checkbox';
import {FunctionsHelper} from '../helper/functions';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from 'shared/griddles/new_layout';
import React from 'react';
import SelectSell from '../../shareds/select_cell';
import _ from 'lodash';
import * as table_constants from 'constants/griddle_table_constants';

export default class AdditionFormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
      current_questions: props.current_questions,
      temp_questions: [],
      check_all: 'none'
    };
    this.props.handleRegisterRefresh('addition_question', this);
  }

  render() {
    const CheckboxFunction = ({griddleKey}) => {
      var checked = false;
      if (this.state.check_all == 'yes') {
        checked = true;
        this.state.temp_questions[griddleKey].checked = checked;
      } else if (this.state.check_all == 'no') {
        checked = false;
        this.state.temp_questions[griddleKey].checked = checked;
      } else if (this.state.check_all == 'none') {
        var cate = this.state.temp_questions[griddleKey];
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
        <Griddle data={this.state.temp_questions} plugins={[plugins.LocalPlugin]}
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
            <ColumnDefinition id="content"
              title={I18n.t("test_rules.form.content")}/>
            <ColumnDefinition id="level"
              title={I18n.t("test_rules.form.level")} />
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
    var questions = this.state.temp_questions.filter(
      (object) => {return object.checked}
    );
    $('a[href="#phrase-2"]').trigger('click');
    var rule_questions = _.map(questions, (item) => {
      delete item['checked'];
      return {
        question_id: item.id,
        info: item
      }});
    this.setState({
      check_all: 'none',
    });
    for(var question of rule_questions)
      this.state.current_questions.push(question);
    this.props.handleRefresh(['condition_form', 'questions_object'],
      {questions: this.state.current_questions})
  }

  handleCheckbox(griddleKey, checked) {
    this.state.temp_questions[griddleKey].checked = checked;
    this.setState({
      check_all: 'none',
      temp_questions: this.state.temp_questions
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
      temp_questions: this.state.temp_questions
    });
  }

  handlePage(){
    this.setState({
      check_all: 'none',
    });
  }

  refreshObject(data){
    this.setState({
      current_questions: data.current_questions,
      temp_questions:
        this.removeAlreadySelected(this.props.questions, data.current_questions)
    });
  }
}
