import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';

import TreeNode from './tree_node'
import FormEdit from './form_edit';
import FormCreate from './form_create';
import ListPrograms from './list_programs';

const SUB_ORGANIZATION_URL = app_constants.APP_NAME + 'sub_organizations';
const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations/';

export default class OrganizationList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      organization: props.organization,
      programs: props.programs,
      index: null,
      name: null,
      parent: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      programs: nextProps.programs
    });
  }

  render(){
    return(
      <div>
        <ListPrograms organization={this.state.organization}
          programs={this.state.programs}
          afterEditProgram={this.fetchData.bind(this)}
          afterCreateProgram={this.fetchData.bind(this)}
          afterDeleteProgram={this.fetchData.bind(this)}/>
      </div>
    )
  }

  afterClickEdit(index, name){
    this.setState({
      index: index,
      name: name,
    });
    $('#modal').modal();
  }
  afterClickCreate(index){
    this.setState({
      parent: true,
      index: index,
      name: null
    });
    $('#modal').modal();
  }

  renderModal(){
    let form= null;
    let title= null;
    if(this.state.name){
      title = I18n.t('organizations.edit');
      form = (
        <FormEdit url={SUB_ORGANIZATION_URL} index={this.state.index}
          name={this.state.name} afterSave={this.fetchData.bind(this)} />
      )
    }else{
      title= I18n.t('organizations.create_sub')
      form = (
        <FormCreate url={SUB_ORGANIZATION_URL} index={this.state.index}
          afterCreate={this.fetchData.bind(this)} parent={this.state.parent}/>
      )
    }
    return(
      <div id='modal' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body'>
              {form}
            </div>
          </div>
        </div>
      </div>
    )
  }

  fetchData() {
    const url = ORGANIZATION_URL + this.state.organization.id;
    axios.get(url + ".json")
      .then(response => {
        this.setState({
          organization: response.data.organization,
          programs: response.data.programs
          });
        this.props.handleAfter(this.state.organization, this.state.programs);
      })
      .catch(error => {
        console.log(error)
      });
  }
}

