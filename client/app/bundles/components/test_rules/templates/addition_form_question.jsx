import _ from 'lodash';
import * as react_table_ultis from 'shared/react-table/ultis';
import Checkbox from '../../shareds/checkbox';
import css from 'assets/sass/react-table.scss';
import {FunctionsHelper} from '../helper/functions';
import React from 'react';
import ReactTable from 'react-table';
import SelectSell from '../../shareds/select_cell';

export default class AdditionFormQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
      current_questions: props.current_questions,
      temp_questions: [],
      check_all: 'none',
      page_index: 0
    };
    this.props.handleRegisterRefresh('addition_question', this);
  }

  render() {
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => row.index + 1,
        hideFilter: true,
        style: {textAlign: 'right'},
        width: 50
      },
      {
        header: I18n.t('test_rules.form.content'),
        accessor: 'content',
        render: row => <span title={row.value}>{row.value}</span>
      },
      {
        header: I18n.t('test_rules.form.level'),
        accessor: 'level'
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
          data={this.state.temp_questions} page={this.state.page_index}
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

  handleCheckbox(index, checked) {
    this.state.temp_questions[index].checked = checked;
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

  onPageChange(page_index) {
    this.setState({
      check_all: 'none',
      page_index: page_index
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
