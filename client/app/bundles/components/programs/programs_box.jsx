import React from 'react';
import axios from 'axios';

import ProgramLists from './program_lists';
import FormCreate from './form_create';

import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

const PROGRAM_URL = app_constants.APP_NAME + program_constants.PROGRAM_PATH;

export default class ProgramBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      program: {
        name: ''
      },
      organization: this.props.organization,
      parent: null
    };
  }

  componentWillMount() {
    this.fetchPrograms();
  }

  fetchPrograms() {
    const url = PROGRAM_URL + "/" + this.props.organization.id + "/programs";
    axios.get(url + '.json')
      .then(response => {
        this.setState({programs: response.data.programs});
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  render() {
    const url = PROGRAM_URL + '/' + this.props.organization.id + '/programs';
    return (
      <div className="row">
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
                  <FormCreate program={this.state.program} url={url}
                    parent={this.state.parent}
                    handleAfterSaved={this.handleAfterCreated.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <ProgramLists
                programs={this.state.programs}
                organization={this.state.organization}
                handleAfterCreated={this.handleAfterCreated.bind(this)}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                handleAfterDeleted={this.handleAfterDeleted.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(program) {
    this.state.programs.push(program);
    this.setState({
      programs: this.state.programs,
      parent: null
    });
  }

  handleAfterUpdated(new_program) {
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
      parent: null
    });
  }

  handleAfterDeleted(program) {
    this.removeChildren(program);
    _.remove(this.state.programs, _program => {
      return _program.id == program.id;
    });
    this.setState({
      programs: this.state.programs,
      parent: null
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
}
