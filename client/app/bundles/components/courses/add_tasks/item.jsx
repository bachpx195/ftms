import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import css from '../assets/course.scss';
import * as app_constants from 'constants/app_constants';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remain_item: props.remain_item,
      checked: props.checked,
      select_items: props.select_items,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remain_item: nextProps.remain_item,
      checked: nextProps.checked,
      select_items: nextProps.select_items
    });
  }

  render() {
    let {name} = this.state.remain_item
    return(
      <li className="list-group-item cursor"
        onClick={this.onClickItem.bind(this)}
        title={this.state.remain_item.name}>
        <input type="checkbox" value={this.state.remain_item.id || ''}
          checked={this.state.checked} readOnly
          name={this.state.remain_item.name}>
        </input>
        {name}
        <i className='fa fa-chevron-right pull-right'></i>
      </li>
    );
  }

  onClickItem(event) {
    if(this.state.checked) {
      let index = this.state.select_items.findIndex(
        select_subject => select_subject.id == this.state.remain_item.id)
      this.state.select_items.splice(index, 1);
      this.props.chooseItem(this.state.select_items);
    } else {
      this.state.select_items.push(this.state.remain_item);
      this.props.chooseItem(this.state.select_items);
    }
    this.props.current_item(this.state.remain_item);
    let distance_top = $(event.target).position().top;
    $('.task-preview').css('margin-top', distance_top);
  }
}
