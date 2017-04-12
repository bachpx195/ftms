import React from 'react';
import axios from 'react';
import CategoryPolicy from 'policy/category_policy';
import * as app_constants from 'constants/app_constants';
import * as category_constants from './constants/category_constants';
import FormQuestion from '../questions/form_question';

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
              <div className='create-question'>
                <CategoryPolicy permit={[
                  {controller: 'questions', action: ['create'], target: 'children'}]}>
                  <FormQuestion question={this.state.question}
                    category={this.state.category}
                    afterCreateQuestion={this.afterCreateQuestion.bind(this)}/>
                </CategoryPolicy>
              </div>
              <div className='list-question'>
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
      category: this.state.category
    })
  }
}
