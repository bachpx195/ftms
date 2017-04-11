import React from 'react';

export default class QuestionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: []
    }
    this.props.handleRegisterRefresh('question_preview', this);
  }

  render() {
    if(this.state.question.length <= 0) return null;
    return(
      <div className='question-preview'>
        <div className="list-group">
          <a className="list-group-item">
            <label>{I18n.t('test_rules.form.level')}: </label>
            <label className='show-value'>
              {this.state.question.info.level}
            </label>
          </a>
          <a className="list-group-item">
            <label>{I18n.t('test_rules.form.category')}: </label>
            <label className='show-value'>
              {this.state.question.info.category.name}
            </label>
            </a>
        </div>
      </div>
    );
  }

  refreshObject(data){
    this.setState({
      question: data.question,
    });
  }
}
