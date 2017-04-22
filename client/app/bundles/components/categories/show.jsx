import * as app_constants from 'constants/app_constants';
import axios from 'react';
import FormQuestion from '../questions/templates/form_question';
import QuestionPolicy from 'policy/question_policy';
import Questions from '../questions/questions';
import React from 'react';

export default class CategoryBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: props.category,
      question: {
        content: '',
        answers: []
      }
    }
  }

  render() {
    const QUESTIONS_URL = app_constants.APP_NAME + app_constants.CATEGORIES_PATH
      + '/' + this.state.category.id + '/' + app_constants.QUESTIONS_PATH;
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{this.state.category.name}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='category-show'>
                <div className='create-question'>
                  <QuestionPolicy permit={[
                    {action: ['create'], target: 'children'}]} >
                    <FormQuestion question={this.state.question}
                      url={QUESTIONS_URL}
                      category={this.state.category}
                      afterCreateQuestion={this.afterCreateQuestion.bind(this)}/>
                  </QuestionPolicy>
                </div>
                <div className='list-question'>
                  <Questions questions={this.state.category.questions}
                    afterDeleteQuestion={this.afterDeleteQuestion.bind(this)}
                    afterUpdateQuestion={this.afterUpdateQuestion.bind(this)}
                    url={QUESTIONS_URL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterCreateQuestion(question) {
    this.state.category.questions.push(question)
    this.setState({
      category: this.state.category,
      question: {
        content: '',
        answers: [
          {content: '', is_correct: false}
        ]
      }
    })
  }

  afterDeleteQuestion(question) {
    _.remove(this.state.category.questions, _question => {
      return _question == question;
    });
    this.setState({
      category: this.state.category
    });
  }

  afterUpdateQuestion(question) {
    let index = this.state.category.questions
      .findIndex(_question => _question.id === question.id);
    this.state.category.questions[index] = question;
    this.setState({
      category: this.state.category
    });
  }
}
