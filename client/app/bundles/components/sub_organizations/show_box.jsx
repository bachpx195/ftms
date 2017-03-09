import React from 'react';
import axios from 'axios';
import TreeView from './tree_view';
import FormCreate from './form_create';

import * as sub_org_constants from './sub_organization_constants';

const SUB_ORGANIZATION_URL = sub_org_constants.SUB_ORGANIZATION_PATH;
const ORGANIZATION_URL = sub_org_constants.ORGANIZATION_PATH;

export default class SubOrganizationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization,
      programs_of_organization: []
    };
  }

  componentDidMount() {
    this.fetchProgramsOfOrganization();
  }

  fetchProgramsOfOrganization() {
    let url = SUB_ORGANIZATION_URL + "/" + this.state.organization.id + ".json";
    axios.get(url)
    .then(reponse => {
      this.setState({
        programs_of_organization: reponse.data.programs_of_org
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("sub_organizations.all_program")}</h3>

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
              <div className="col-md-8 col-md-offset-2">
                <FormCreate
                  url={ORGANIZATION_URL}
                  organization={this.state.organization}
                  afterCreate={this.afterCreate.bind(this)}
                />
              </div> 
            </div>

            <div className='box-footer'>
              <TreeView
                organization={this.state.organization}
                data={this.state.programs_of_organization} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(program) {
    let json = {
      text: program.name,
      id: program.id,
      parent: program.parent_id || "null",
      nodes: []
    }
    this.state.programs_of_organization.push(json);
    this.setState({
      programs_of_organization: this.state.programs_of_organization
    });
  }
}
