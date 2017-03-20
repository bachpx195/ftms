import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../course_constants';
import Item from './item';

const TASK_URL = app_constants.APP_NAME + course_constants.TASK_PATH;

const arr_option = ["choose","survey", "testing"];
export default class ModalTaskSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetable_type: props.targetable_type,
      selected_items: props.selected_items,
      remain_items: props.remain_items,
      targetable: props.targetable,
      select_items: [],
      ownerable_type: props.ownerable_type
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
    let title,seleted,remain_item = null;
    if (this.state.targetable_type == "Survey") {
      title = I18n.t("courses.create_task_title");
      seleted = I18n.t("courses.survey_in_course");
      remain_item = I18n.t("courses.survey_remain_course");
    }else {
      title = "";
      seleted = "";
      remain_item = "";
    }

    return (<div id="modalTaskSurvey" className="modal fade" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title text-center" id="assign-member-label">
              {title}
            </h4>
            <select onChange={this.onChangeSelect.bind(this)} className="form-control">
              {this.renderOption()}
            </select>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h5 className="text-center">
                  <strong>{seleted}</strong>
                </h5>
                <ul className="list-group">
                  {this.renderSelectedItems()}
                </ul>
              </div>
              <div className="col-md-6">
                <h5 className="text-center"><strong>{remain_item}</strong></h5>
                <ul className="list-group">
                  {this.renderItemsRemain()}
                </ul>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.onClickAddItem.bind(this)} className="btn btn-success center-block">Save</button>
          </div>
        </div>
      </div>
    </div>);
  }

  renderOption() {
    return _.map(arr_option, (item, index) => {
      return(
        <option value={item} key={index}>
          {I18n.t("courses.options." + item)}
        </option>
      );
    });
  }

  onChangeSelect(event) {
    let target = event.target;
    this.props.afterChangeSelectBox($(target).val());
  }

  renderSelectedItems() {
    return _.map(this.state.selected_items, item => {
      return(
        <li className="list-group-item" key={item.id}>
          {item.name}
        </li>
      );
    });
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
        <Item
          key={remain_item.id}
          remain_item={remain_item}
          checked={checked}
          select_items={this.state.select_items}
          chooseItem={this.chooseItem.bind(this)}
        />
      );
    });
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

    axios.post(TASK_URL + '.json', {
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
      this.props.afterSubmitCreateTask(this.state.selected_items, this.state.remain_items);
      this.setState({
        select_items: []
      });
    })
    .catch(error => {
      console.log(error);
    })
  }
}
