import axios from 'axios';
import Form from './templates/form';
import React from 'react';
import ProgramLists from './programs';
import IndexBreadCrumb from './templates/bread_crumbs/index';

import * as app_constants from 'constants/app_constants';

const ORGANIZATIONS_URL = app_constants.APP_NAME + 
  app_constants.ORGANIZATIONS_PATH;

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      program: '',
      organization: this.props.organization,
      not_assigned_programs: [],
      parent: ''
    };
  }

  componentWillMount() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    const url = ORGANIZATIONS_URL + '/' + this.state.organization.id + '/' +
      app_constants.PROGRAMS_PATH;
    axios.get(url + '.json')
      .then(response => {
        this.setState({
          programs: response.data.programs,
          not_assigned_programs: response.data.not_assigned_programs
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  render() {
    const url = ORGANIZATIONS_URL + '/' + this.state.organization.id + '/' +
      app_constants.PROGRAMS_PATH;
    return (
      <div className="row">
        <IndexBreadCrumb
          organization={this.state.organization}
          program={this.state.program}
        />
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("programs.titles.all")}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className="box-body no-padding">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <Form
                    url={url}
                    program={this.state.program}
                    parent_id={this.state.parent ? this.state.parent.id : ''}
                    handleAfterCreated={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <ProgramLists
                programs={this.state.programs}
                not_assigned_programs={this.state.not_assigned_programs}
                organization={this.state.organization}
                handleAfterCreated={this.handleAfterCreated.bind(this)}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)}
                handleAfterAssignProgram={this.handleAfterAssignProgram.bind(this)}
                handleAfterUnassignProgram={this.handleAfterUnassignProgram.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(response) {
    this.state.programs.push(response.data.program);
    this.setState({
      programs: this.state.programs,
      parent: '',
      program: ''
    });
  }

  handleAfterUpdated(response) {
    let new_program = response.data.program;
    for(let i = 0; i < this.state.programs.length; i++){
      let parent = this.state.programs[i].parent;
      if(parent && parent.id == new_program.id) {
        this.state.programs[i].parent = new_program;
      }
    }
    let index = this.state.programs
      .findIndex(program => program.id === new_program.id);
    this.state.programs[index] = new_program;
    this.setState({
      programs: this.state.programs,
      parent: ''
    });
  }

  handleAfterDeleted(response) {
    let program = response.data.program
    this.removeChildren(program);
    _.remove(this.state.programs, _program => {
      return _program.id == program.id;
    });
    this.setState({
      programs: this.state.programs,
      parent: ''
    });
  }

  removeChildren(parent) {
    for(let program of this.state.programs) {
      if(program.parent && program.parent.id == parent.id) {
        this.removeChildren(program);
      }
    };
    _.remove(this.state.programs, program => {
      return program.parent && program.parent.id == parent.id;
    });
  }

  handleAfterAssignProgram(program_ids) {
    let assigned_programs = this.state.not_assigned_programs.filter(program => {
      return program_ids.indexOf(program.id) >= 0;
    });
    _.remove(this.state.not_assigned_programs, program => {
      return program_ids.indexOf(program.id) >= 0;
    });
    this.state.programs = _.union(this.state.programs, assigned_programs);
    this.setState({
      not_assigned_programs: this.state.not_assigned_programs,
      programs: this.state.programs
    });
  }

  handleAfterUnassignProgram(program_id) {
    let unassigned_program = this.state.programs.filter(program => {
      return program.id == program_id;
    });
    _.remove(this.state.programs, program => {
      return program.id == program_id;
    });
    this.state.not_assigned_programs = _.union(this.state.not_assigned_programs,
      unassigned_program);
    this.setState({
      not_assigned_programs: this.state.not_assigned_programs,
      programs: this.state.programs
    });
  }
}
