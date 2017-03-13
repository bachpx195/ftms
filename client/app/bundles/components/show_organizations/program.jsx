import React from 'react';
import axios from 'axios';

import CourseLists from '../programs/course_lists';
import * as app_constants from 'constants/app_constants';

const PROGRAM_URL = app_constants.APP_NAME + 'programs/';

export default class Program extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      organization: props.organization,
      program: props.program
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      organization: nextProps.organization,
      program: nextProps.program
    })
  }

  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={'heading'+this.state.program.id}>
          <div className="name-program col-xs-6">
            <h4 className="panel-title">
              <span id="collapse-panel" role="button" data-toggle="collapse" data-parent="#accordion"
                href={'#program'+this.state.program.id} aria-controls={'#program'+this.state.program.id}>
                <div className="icon">
                  <i className="fa fa-minus" onClick={this.checkShowProgram.bind(this)}></i>
                </div>
              </span>
              <div className="name">
                <a href={this.props.url + '/programs/' + this.state.program.id}>{this.state.program.name}</a>
              </div>
            </h4>
          </div>
          <div className="function col-xs-6">
            <div className="list-function hidden">
              <i className="fa fa-pencil"
                data-index={this.state.program.id}
                data-name={this.state.program.name}
                onClick={this.afterClickEdit.bind(this)}
                >
              </i>
              <i className="fa fa-trash-o" data-index={this.state.program.id}
              onClick={this.afterClickDelete.bind(this)}>
              </i>
            </div>
            <i className="fa fa-list list" onClick={this.showListFunction.bind(this)}></i>
          </div>
          <div className="clearfix"></div>
        </div>
        <div id={'program'+this.state.program.id} className="panel-collapse collapse in"
          role="tabpanel" aria-labelledby={'heading'+this.state.program.id}>
          <div className="panel-body">
            <CourseLists program_name={this.state.program.name}
              courses={this.state.program.courses}
              url={PROGRAM_URL + this.state.program.id} />
          </div>
        </div>
      </div>
    )
  }

  showListFunction(event){
    let target = event.target
    $(target).blur();
    if($(target).siblings().hasClass('hidden')){
      $(target).siblings().removeClass('hidden');
    }else{
      $(target).siblings().addClass('hidden');
    }
  }

  checkShowProgram(event){
    let target = event.target
    $(target).blur();
    let parent = $(target).closest('span')
    if($(parent).hasClass('collapsed')){
      $(target).removeClass('fa-minus')
      $(target).addClass('fa-plus')
    }else{
      $(target).removeClass('fa-plus')
      $(target).addClass('fa-minus')
    }
  }

  afterClickEdit(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    let name = $(target).data('name');
    this.props.afterEdit(index, name);
  }
  afterClickDelete(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.url + '/' + 'programs/' +index, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted();
      })
      .catch(error => console.log(error));
    }
  }
}
