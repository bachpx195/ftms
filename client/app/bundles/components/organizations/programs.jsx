import axios from 'axios';
import FormProgram from './templates/program_form';
import Program from './templates/program';
import React from 'react';

import * as app_constants from 'constants/app_constants';

const ORGANIZATIONS_URL = app_constants.APP_NAME + 
  app_constants.ORGANIZATIONS_PATH;
const PROGRAMS_URL = app_constants.APP_NAME + app_constants.PROGRAMS_PATH;

require('../../assets/sass/list_programs.scss');

export default class Programs extends React.Component {
   constructor(props){
    super(props)
    this.state = {
      organization: props.organization,
      programs: props.programs,
      index: null,
      program: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      programs: nextProps.programs
    });
  }

  render() {
    let PROGRAMS_URL = ORGANIZATIONS_URL + '/' + this.state.organization.id + 
      '/' + app_constants.PROGRAMS_PATH;
    let PROGRAM_URL = PROGRAMS_URL + '/' + this.state.program.id;
    let programs_url = app_constants.APP_NAME + app_constants.PROGRAMS_PATH;
    return (
      <div className="box-programs">
        <div className="form-create">
          <FormProgram
            url={PROGRAMS_URL}
            organization={this.state.organization}
          />
        </div>
        <div id="list-programs">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {this._renderProgram(programs_url)}
          </div>
          {this.renderModal(this.state.program, PROGRAM_URL)}
        </div>
      </div>
    )
  }

  renderModal(program, edit_url){
    return(
      <div className='modal fade in modalEdit' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t("buttons.edit")}</h4>
            </div>
            <div className='modal-body'>
              <FormProgram
                url={edit_url}
                organization={this.state.organization}
                program={program}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _renderProgram(PROGRAMS_URL) {
    return this.state.programs.map((program) => {
      return (
        <div className="program" key={program.id}>
          <Program
            program={program}
            organization={this.state.organization}
            afterEdit={this.afterClickEdit.bind(this)}
            handleAfterDeleted={this.handleAfterDeleted.bind(this)}
            url={PROGRAMS_URL + '/' + program.id}/>
        </div>
      );
    });
  }

  afterClickEdit(program){
    this.setState({
      program: program
    })
    $('.modalEdit').modal();
  }

  handleAfterDeleted(response){
    let program = response.data.program;
    let index = this.state.programs.findIndex(item => item.id == program.id);
    this.state.programs.splice(index, 1);
    this.setState({
      programs: this.state.programs
    })
  }

  handleAfterUpdated(response){
    let program = response.data.program;
    let index = this.state.programs.findIndex(item => item.id == program.id);
    this.state.programs[index].name = program.name;
    this.setState({
      programs: this.state.programs
    });
  }
}
