import axios from 'axios';
import FormProgram from './templates/program_form';
import Program from './templates/program';
import React from 'react';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from './constants/organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME +
   organization_constants.ORGANIZATION_PATH;
const PROGRAM_PATH = organization_constants.PROGRAMS_PATH;

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
    let INDEX_PROGRAM_URL = ORGANIZATION_URL + this.state.organization.id + '/' +
      PROGRAM_PATH;
    let SHOW_PROGRAM_URL = INDEX_PROGRAM_URL + this.state.program.id;
    return (
      <div className="box-programs">
        <div className="form-create">
          <FormProgram
            url={INDEX_PROGRAM_URL}
            organization={this.state.organization}
          />
        </div>
        <div id="list-programs">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {this._renderProgram(INDEX_PROGRAM_URL)}
          </div>
          {this.renderModal(this.state.program, SHOW_PROGRAM_URL)}
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

  _renderProgram(INDEX_PROGRAM_URL) {
    return this.state.programs.map((program) => {
      return (
        <div className="program" key={program.id}>
          <Program
            program={program}
            organization={this.state.organization}
            afterEdit={this.afterClickEdit.bind(this)}
            handleAfterDeleted={this.handleAfterDeleted.bind(this)}
            url={INDEX_PROGRAM_URL + program.id}/>
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
