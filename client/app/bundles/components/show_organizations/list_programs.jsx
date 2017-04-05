import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';
import Program from './program';
import FormEditProgram from './form_edit_program';
import FormCreateProgram from './form_create_program';

import * as sub_org_constants from './sub_organization_constants';
const SUB_ORGANIZATION_URL = sub_org_constants.SUB_ORGANIZATION_PATH;
const ORGANIZATION_URL = sub_org_constants.ORGANIZATION_PATH;

require('../../assets/sass/list_programs.scss');

export default class ListPrograms extends React.Component {
   constructor(props){
    super(props)
    this.state = {
      organization: props.organization,
      programs: props.programs,
      index: null,
      name: null,
      status: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      programs: nextProps.programs
    });
  }

  render(){
    let programs = [];
    if(this.state.programs){
      this.state.programs.map((program) => {
        programs.push(
          <div className="program" key={program.id}>
            <Program program={program} organization={this.state.organization}
              afterEdit={this.afterClickEdit.bind(this)}
              handleAfterDeleted={this.afterDelete.bind(this)}
              url={ORGANIZATION_URL + '/' + this.state.organization.id}/>
          </div>
        )
      })
    }
    return(
      <div className="box-programs">
        <div className="form-create">
          <FormCreateProgram
            url={ORGANIZATION_URL}
            organization={this.state.organization}
            afterCreate={this.afterCreate.bind(this)}
          />
        </div>
        <div id="list-programs">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {programs}
          </div>
          {this.renderModal()}
        </div>
      </div>
    )
  }

  renderModal(){
    return(
      <div id='modalEdit' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t("buttons.edit")}</h4>
            </div>
            <div className='modal-body'>
              <FormEditProgram index={this.state.index}
                name={this.state.name} organization={this.state.organization}
                status={this.state.status}
                afterEditProgram={this.afterEditProgram.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  afterClickEdit(index, name){
    this.setState({
      index: index,
      name: name,
      status: 'edit'
    })
    $('#modalEdit').modal();
  }

  afterDelete(){
    this.props.afterDeleteProgram();
  }

  afterCreate(program){
    this.props.afterCreateProgram(program);
  }

  afterEditProgram(program){
    this.props.afterEditProgram();
  }
}
