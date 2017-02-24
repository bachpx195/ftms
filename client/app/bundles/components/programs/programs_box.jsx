import React from 'react';
import axios from 'axios';

import ProgramLists from './program_lists';
import FormCreate from './form_create';

import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

const PROGRAM_URL = app_constants.APP_NAME + program_constants.ADMIN_PROGRAM_PATH;

export default class ProgramBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      program: {
        name: ''
      },
      organization: this.props.organization,
      parent: ''
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
          console(error);
        }
      );
  }

  render() {
    const url = PROGRAM_URL + "/" + this.props.organization.id + "/programs";
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
                  <FormCreate
                    program={this.state.program}
                    url={url}
                    parent={this.state.parent}
                    handleAfterSaved={this.handleAfterHandle.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <ProgramLists
                programs={this.state.programs}
                organization={this.state.organization}
                handleAfterUpdated={this.handleAfterHandle.bind(this)}
                handleAfterDeleted={this.handleAfterHandle.bind(this)} />
            </div>

          </div>
        </div>
      </div>
    );
  }

  handleAfterHandle(program) {
    this.setState({
      programs: program,
      program: ''
    });
  }
}
