import React from 'react';
import _ from 'lodash';
import {FunctionsHelper} from '../helper/functions';

export default class QuestionsObject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: props.questions || []
    }
    this.props.handleRegisterRefresh('questions_object', this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions
    });
    var question_preview = null;
    if(nextProps.questions[0]){
      nextProps.questions[0].active = true
      question_preview = nextProps.questions[0]
    } else
      question_preview = [];
      this.props.handleRefresh(['question_preview'],
        {question: question_preview})
  }

  render(){
    if(this.state.questions.length <= 0 ) return null;
    var quesions = _.map(this.state.questions,
      (item, index) => {
        var className = item.active ?
          'list-group-item node-item active' : 'list-group-item node-item';
        if(item._destroy == 1 || item.isHidden) return '';
        return (
          <li key={index} className={className}>
            <div className='row'>
              <div data-index={index} onClick={this.handleShowQuestion.bind(this)}
                className='col-md-10 list-node'>
                {item.info.content}
              </div>
              <div className='col-md-2'>
                <i data-index={index} onClick={this.handleRemoveQuestion.bind(this)}
                   className='icon-remove glyphicon glyphicon-remove'></i>
              </div>
            </div>
          </li>
        );
      });
    return (
      <div>
        <input type='text' className='form-control' onChange={this.filterQuestions.bind(this)}/>
        <ul className="list-group list-question scroll-bar">
          {quesions}
        </ul>
      </div>
      );
  }

  filterQuestions(event) {
    let value = event.target.value;
    for(var question of this.state.questions){
      if(question.info.content.toLowerCase().includes(value.toLowerCase()))
        question['isHidden'] = false;
      else
        question['isHidden'] = true;
    }
    this.setState({refresh: true});
  }

  handleRemoveQuestion(event) {
    var $target = $(event.target);
    $($target).parent().fadeOut();
    var questions = this.state.questions;
    var question = questions[$target.data('index')];
    question['_destroy'] = 1;
    if(question.active) {
      question['active'] = false;
      this.props.handleRefresh(['question_preview'],
        {question: FunctionsHelper.findNodeActive(questions)});
    }
    this.setState({
      questions: questions
    })
  }

  handleShowQuestion(event) {
    var $target = $(event.target);
    var questions = FunctionsHelper.resetActive(this.state.questions);
    var question = questions[$target.data('index')];
    question['active'] = true;
    this.props.handleRefresh(['question_preview'],
      {question: question});
    this.setState({
      questions: questions,
      question_preview: question
    })
  }

  refreshObject(data){
    this.setState(data);
    this.props.handleRefresh(['question_preview'],
      {question: FunctionsHelper.findNodeActive(data.questions)});
  }
}
