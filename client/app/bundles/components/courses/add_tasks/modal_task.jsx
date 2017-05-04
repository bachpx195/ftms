import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as routes from 'config/routes';
import Item from './item';
import TaskPreview from '../templates/task_preview';
import ModalCreateSurvey from '../../surveys/templates/modal_create_survey';
const TASKS_URL = routes.assign_tasks_url();

const arr_option = ['choose','survey', 'testing'];
export default class ModalTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetable_type: props.targetable_type,
      selected_items: props.selected_items,
      remain_items: props.remain_items,
      targetable: props.targetable,
      select_items: [],
      ownerable_type: props.ownerable_type,
      current_item: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remain_items: nextProps.remain_items,
      selected_items: nextProps.selected_items,
      targetable_type: nextProps.targetable_type,
      ownerable_type: nextProps.ownerable_type
    })
  }

  render() {
    let title, selected, remain_item, tasks, form, button_create_task = null;
    let task_preview = (
      <TaskPreview current_item={this.state.current_item}
        targetable_type={this.state.targetable_type} />
    );
    if (this.state.targetable_type == 'Survey') {
      title = I18n.t('courses.create_task_title_survey');
      selected = I18n.t('courses.survey_in_course');
      remain_item = I18n.t('courses.survey_remain_course');
      tasks = this.renderTask(selected, remain_item);
      button_create_task = (
        <button className='btn btn-primary'
          onClick={this.handleCreateTask.bind(this)}>
          {I18n.t('courses.add_task')}</button>
      )
      form = (
        <ModalCreateSurvey 
          ownerable_type={this.props.ownerable_type}
          ownerable_id={this.props.ownerable_id}
          meta_types={this.props.meta_types}
          url={routes.subject_tasks_url()}
          handleAfterCreatedSurvey={
            this.handleAfterCreatedSurvey.bind(this)} />
      )
    } else if(this.state.targetable_type == 'TestRule') {
      title = I18n.t('courses.create_task_title_exam');
      selected = I18n.t('courses.testing_in_course');
      remain_item = I18n.t('courses.testing_remain_course');
      tasks = this.renderTask(selected, remain_item);
    } else {
      title = '';
      selected = '';
      remain_item = '';
      task_preview = null;
      tasks = null;
    }

    return (
      <div className='modal-task-course modal fade' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h4 className='modal-title text-center assign-member-label'>
                {title}
              </h4>
              <select onChange={this.onChangeSelect.bind(this)} className='form-control'>
                {this.renderOption()}
              </select>
            </div>

            <div className='modal-body'>
              <div className='row list-tasks col-md-6'>
                {tasks}
                {button_create_task}
                {form}
              </div>
              {task_preview}
            </div>
            <div className='modal-footer'>
              <button onClick={this.onClickAddItem.bind(this)}
                className='btn btn-success center-block'>
                {I18n.t('courses.buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleCreateTask() {
    $('.modal-create-survey').modal();
  }

  handleAfterCreatedSurvey(target) {
    this.state.selected_items.push(target);
    this.setState({
      selected_items: this.state.selected_items,
    })
  }

  renderTask(title_selected_items, title_remain_items) {
    return(
      <div>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{title_selected_items}</strong>
          </div>
          <ul className='list-group'>
            {this.renderSelectedItems()}
          </ul>
        </div>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{title_remain_items}</strong>
          </div>
          <ul className='list-group'>
            {this.renderItemsRemain()}
          </ul>
        </div>
      </div>
    );
  }

  renderOption() {
    return _.map(arr_option, (item, index) => {
      return(
        <option value={item} key={index}>
          {I18n.t('courses.options.' + item)}
        </option>
      );
    });
  }

  onChangeSelect(event) {
    let target = event.target;
    this.setState({
      select_items: [],
      current_item: '',
    })
    this.props.afterChangeSelectBox($(target).val());
    $('.task-preview').css('margin-top', '0');
  }

  renderSelectedItems() {
    return _.map(this.state.selected_items, item => {
      return(
        <li className='list-group-item' key={item.id}
          onClick={this.onClickItem.bind(this, item)}>
          {item.name}
          <i className='glyphicon glyphicon-remove pull-right poiter'
            onClick={this.removeItem.bind(this, item)}></i>
        </li>
      );
    });
  }

  onClickItem(item, event) {
    let target = event.target;
    this.setState({
      current_item: item,
    });
  }

  removeItem(item) {
    _.remove(this.state.selected_items, select_item => {
      return select_item.id === item.id;
    });

    if(this.state.remain_items){
      this.state.remain_items.push(item);
    }

    axios.delete(routes.assign_task_url(item.id) + '.json', {
      params: {
        targetable_type: this.state.targetable_type,
        targetable_id: item.id,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: 'Course',
        authenticity_token: ReactOnRails.authenticityToken()
      },
    })
    .then(response => {
      this.setState({
        selected_items: this.state.selected_items,
        remain_items: this.state.remain_items
      });

    })
    .catch(error => {
      console.log(error)
    })

  }

  renderItemsRemain() {
    return _.map(this.state.remain_items, remain_item => {
      let checked = '';
      _.map(this.state.select_items, item => {
        if(remain_item.id == item.id) {
          checked = 'checked';
        }
      })
      return(
        <Item key={remain_item.id}
          remain_item={remain_item}
          checked={checked}
          select_items={this.state.select_items}
          chooseItem={this.chooseItem.bind(this)}
          current_item={this.current_item.bind(this)}
        />
      );
    });
  }

  current_item(item) {
    this.setState({
      current_item: item,
    })
  }

  chooseItem(select_items) {
    this.setState({
      select_items: select_items
    })
  }

  onClickAddItem() {
    let arr_targetable_id = [];
    _.map(this.state.select_items, select_item => {
      arr_targetable_id.push(select_item.id);
    });
    axios.post(TASKS_URL , {
      task: {
        targetable_ids: arr_targetable_id,
        targetable_type: this.state.targetable_type,
        ownerable_id: this.state.targetable.id,
        ownerable_type: this.state.ownerable_type,
        user_id: null
      },
      authenticity_token: ReactOnRails.authenticityToken()
    })
    .then(response => {
      _.map(this.state.select_items, select_item => {
        this.state.selected_items.push(select_item);
        let index = _.findIndex(this.state.remain_items, remain_item =>
          remain_item.id == select_item.id);
        this.state.remain_items.splice(index, 1);
      });
      this.props.afterSubmitCreateTask(this.state.selected_items,
        this.state.remain_items);
      this.setState({
        select_items: [],
      });
      $('.modal-task-course').modal('hide');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
