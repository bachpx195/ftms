import CategoryPreview from './category_preview';
import CategoriesObject from './categories_object';
import React from 'react';
import QuestionsObject from './questions_object';
import QuestionPreview from './question_preview';
import _ from 'lodash';

export default class ConditionForm extends React.Component {
  constructor(props) {
    super(props);
    this.objectRefresh = {};
    this.state = {
      categories: [],
      questions: []
    };
    this.props.handleRegisterRefresh('condition_form', this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories,
      questions: nextProps.questions
    })
  }

  render() {
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Categories</div>
          <div className="panel-body">
            <div className="col-md-12 row">
             <div className="col-md-4">
                <CategoriesObject
                  handleRefresh={this.handleRefresh.bind(this)}
                  handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}
                  categories={this.state.categories}/>
                <button className="btn btn-primary" onClick={() =>
                  {this.handleAddForm('category')}}>
                  <i className="fa fa-plus"></i>
                  &nbsp;{I18n.t('buttons.add')}
                </button>
              </div>
              <div className="col-md-8 form-preview">
                <CategoryPreview
                  handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}/>
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Questions</div>
          <div className="panel-body">
            <div className="col-md-12 row">
              <div className="col-md-4">
                <QuestionsObject
                  handleRefresh={this.handleRefresh.bind(this)}
                  handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}
                  questions={this.state.questions}/>
                <button className="btn btn-primary" onClick={() =>
                  {this.handleAddForm('question')}}>
                  <i className="fa fa-plus"></i>
                  {I18n.t('buttons.add')}
                </button>
              </div>
              <div className="col-md-8 form-preview">
                <QuestionPreview
                  handleRegisterRefresh={this.handleRegisterRefresh.bind(this)}/>
              </div>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <div className='row'>
            <div className='col-xs-offset-8'>
              <button type='button' className='btn btn-primary submit'
                onClick={this.handleBack.bind(this)}>
                <i className="fa fa-angle-double-left"></i>
                &nbsp;{I18n.t('buttons.back')}
              </button>
              <button type='button' className='btn btn-primary submit'
                onClick={this.handleSubmit.bind(this)}>
                <i className="fa fa-floppy-o"></i>
                &nbsp;{I18n.t('buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleBack() {
    $('a[href="#phrase-1"]').trigger('click');
  }

  handleAddForm(type) {
    if(type == 'category'){
      this.props.handleRefresh(['addition_category'],
        {current_categories: this.state.categories});
    }
    else if(type == 'question'){
      this.props.handleRefresh(['addition_question'],
        {current_questions: this.state.questions});
    }
    this.props.handleAddForm(type);
  };

  handleRefresh(keys, data = {}){
    var object = null;
    if(!Array.isArray(keys)){
      this.objectRefresh[keys].refreshObject(data);
      return;
    }
    for(var key of keys){
      object = object ? object.objectRefresh[key] : this.objectRefresh[key];
    }
    object ? object.refreshObject(data) : {};
  }

  handleRegisterRefresh(key, object){
    this.objectRefresh[key] = object
  }

  handleSubmit() {
    this.props.handleAfterUpdated({
      categories: this.state.categories,
      questions: this.state.questions,
    });
    this.props.handleSubmit();
  }

  refreshObject(data){
    this.setState(data);
  }
}
