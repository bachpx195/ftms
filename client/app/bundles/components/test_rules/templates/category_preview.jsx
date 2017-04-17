import React from 'react';
import {FunctionsHelper} from '../helper/functions'
import InputRange from 'react-input-range';

export default class CategoryPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      number_question: 0,
      easy: 0,
      normal: 0,
      hard: 0,
      value: { min: 2, max: 10 }
    }
    this.props.handleRegisterRefresh('category_preview', this);
  }

  render()  {
    if(this.state.category.length <= 0) return null;
    return(
      <div className='category-preview'>
        <div className='form-group'>
          <label htmlFor='number_question'>{I18n.t('test_rules.form.number_question')}</label>
          <input id='number_question' type='number'
            onChange={this.handleChangeNumberQuestion.bind(this)}
            value={this.state.number_question || ''}
            className='form-control' name='number_question'/>
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className="col-md-4 col-xs-4">
              <label htmlFor='easy'>
                {I18n.t('test_rules.form.easy')}
              </label>
              <input id='easy' type='number' value={this.state.easy} name='easy'
                onChange={this.handleChangeInput.bind(this)} className='form-control'/>
            </div>
            <div className="col-md-4 col-xs-4">
              <label htmlFor='normal'>
                {I18n.t('test_rules.form.normal')}
              </label>
              <input id='normal' type='number' value={this.state.normal} name='normal'
                onChange={this.handleChangeInput.bind(this)} className='form-control'/>
            </div>
            <div className="col-md-4 col-xs-4">
              <label htmlFor='hard'>
                {I18n.t('test_rules.form.hard')}
              </label>
              <input id='hard' type='number' value={this.state.hard} name='hard'
                onChange={this.handleChangeInput.bind(this)} className='form-control'/>
            </div>
          </div>
          <div className='range-select'>
            <InputRange maxValue={100} minValue={0} value={this.state.value}
              formatLabel={value => ''}
              onChange={(value) => this.handleOnChange(value) }/>
          </div>
        </div>
      </div>

    );
  }

  handleChangeNumberQuestion(event) {
    let attribute = event.target.name;
    Object.assign(this.state.category, {[attribute]: event.target.value});
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleChangeInput(event) {
    let attribute = event.target.name;
    var value = parseInt(event.target.value) || 0;
    var change = null;
    var temp = null;
    if(attribute == 'easy'){
      change = value - this.state.easy;
      temp = this.state.normal - change;
      if(this.checkSuplly(value, temp, this.state.hard)){
        this.state.easy = value;
        this.state.normal = temp;
      }
    } else if(attribute == 'normal'){
      change = value - this.state.normal;
      temp = this.state.hard - change;
      if(this.checkSuplly(this.state.easy, value, temp)){
       this.state.normal = value;
       this.state.hard = temp;
      }
    } else if(attribute == 'hard'){
      change = value - this.state.hard;
      temp = this.state.normal - change;
      if(this.checkSuplly(this.state.easy, temp, value)){
        this.state.hard = value;
        this.state.normal = temp;
      }
    }
    Object.assign(this.state.category, 
      {easy: this.state.easy, normal: this.state.normal, hard: this.state.hard});
    this.setState({
      value: {min: this.state.easy, max: (this.state.easy + this.state.normal)}
    });
  }

  checkSuplly(easy, normal, hard){
    if(easy <0 || easy > 100) return false;
    if(normal <0 || normal > 100) return false;
    if(hard <0 || hard > 100) return false;
    if((easy + normal + hard) != 100) return false;
    return true;
  }

  handleOnChange(value){
    var data = {easy: value.min, normal: value.max - value.min,
      hard: 100 - value.max};
    Object.assign(this.state.category, data);
    this.setState({
      easy: data.easy,
      normal: data.normal,
      hard: data.hard,
      value: value
    });
  }

  refreshObject(data){
    this.setState({
      category: data.category,
      number_question: data.category.number_question,
      easy: data.category.easy,
      normal: data.category.normal,
      hard: data.category.hard,
      value: {min: data.category.easy,
        max: data.category.normal + data.category.easy}
    });
  }
}
