import axios from 'axios';
import CourseLists from '../../programs/courses';
import Destroy from '../actions/destroy';
import React from 'react';
import ProgramPolicy from 'policy/program_policy';

export default class Program extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization,
      program: props.program
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      program: nextProps.program
    })
  }

  render() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading" role="tab"
          id={'heading'+this.state.program.id}>
          <div className="name-program col-xs-6">
            <h4 className="panel-title">
              <span id="collapse-panel" role="button" data-toggle="collapse"
                data-parent="#accordion"
                href={'#program'+this.state.program.id}
                aria-controls={'#program'+this.state.program.id}>
                <div className="icon">
                  <i className="fa fa-minus"
                    onClick={this.checkShowProgram.bind(this)}></i>
                </div>
              </span>
              <div className="name">
                <a href={this.props.url}>{this.state.program.name}</a>
              </div>
            </h4>
          </div>
          <div className="function col-xs-6">
            <div className="list-function hidden">
              <ProgramPolicy permit={[
                {action: ['ownerById'], data: {id: this.state.program.owner_id}},
                {action: ['update', 'creator'], data: this.state.organization},
                {action: ['update', 'creator'], data: this.state.program},
                {action: ['update', 'belongById'],
                  data: {key: 'program_id', id: this.state.program.id}},
              ]}>
                <i className="fa fa-pencil"
                  data-index={this.state.program.id}
                  data-name={this.state.program.name}
                  onClick={this.afterClickEdit.bind(this)}></i>
              </ProgramPolicy>
              <ProgramPolicy permit={[
                {action: ['ownerById'], data: {id: this.state.program.owner_id}},
                {action: ['destroy', 'creator'],  data: this.state.organization},
                {action: ['destroy', 'creator'],  data: this.state.program},
                {action: ['destroy', 'belongById'],
                  data: {key: 'program_id', id: this.state.program.id}},
              ]}>
                <Destroy
                  url={this.props.url}
                  program={this.state.program}
                  handleAfterDeleted={this.props.handleAfterDeleted}
                />
              </ProgramPolicy>

            </div>
              <i className="fa fa-list list"
                onClick={this.showListFunction.bind(this)}></i>
          </div>
          <div className="clearfix"></div>
        </div>
        <div id={'program'+this.state.program.id}
          className="panel-collapse collapse in"
          role="tabpanel" aria-labelledby={'heading'+this.state.program.id}>
          <div className="panel-body">
            <CourseLists
              program_name={this.state.program.name}
              courses={this.state.program.courses} />
          </div>
        </div>
      </div>
    );
  }

  showListFunction(event) {
    let target = event.target
    $(target).blur();
    if($(target).siblings().hasClass('hidden')) {
      $(target).siblings().removeClass('hidden');
    }else{
      $(target).siblings().addClass('hidden');
    }
  }

  checkShowProgram(event) {
    let target = event.target
    $(target).blur();
    let parent = $(target).closest('span')
    if($(parent).hasClass('collapsed')) {
      $(target).removeClass('fa-minus')
      $(target).addClass('fa-plus')
    }else{
      $(target).removeClass('fa-plus')
      $(target).addClass('fa-minus')
    }
  }

  afterClickEdit(event) {
    this.props.afterEdit(this.props.program);
  }
}
