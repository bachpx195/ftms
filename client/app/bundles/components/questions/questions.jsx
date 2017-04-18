import axios from 'axios';
import ModalQuestion from './templates/modal_question';
import React from 'react';
import Question from './templates/question';

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
      question: {
        id: '',
        content: '',
        answers: []
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions
    })
  }

  render() {
    let list_questions = [] ;
    this.state.questions.map((question, index) => {
      if (this.props.exam) {
        list_questions.push(
          <Question question={question} exam={this.props.exam} index={index}
          key={index}
          afterChooseAnswer={this.afterChooseAnswer.bind(this)}
          user_show={this.props.user_show}
        />
        )
      } else {
        list_questions.push(
          <Question question={question} key={index} index={index}
            url={this.props.url + '/' + question.id}
            afterDeleteQuestion={this.props.afterDeleteQuestion}
            afterClickEditQuestion={this.afterClickEditQuestion.bind(this)}
            user_show={true}
          />
        )
      }
    });
    let modal_question = '';
    if (this.state.question.id != '' && !this.props.exam) {
      modal_question = (
        <ModalQuestion
          question={this.state.question}
          afterUpdateQuestion={this.props.afterUpdateQuestion}
          url={this.props.url + '/' + this.state.question.id} />
      )
    }
    return (
      <div>
        {list_questions}
        {modal_question}
      </div>
    )
  }

  afterClickEditQuestion(question) {
    $('.modal-edit').modal();
    this.setState({
      question: question
    })
  }

  afterChooseAnswer(question) {
    let index = this.state.questions
      .findIndex(_question => _question.id === question.id);
    this.state.questions[index] = question;
    this.props.afterChooseAnswer(this.state.questions)
  }
}
