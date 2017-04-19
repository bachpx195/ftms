import Breadcrumb from '../../../shareds/bread_crumb/bread_crumb';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as program_constants from '../../constants/program_constants';

const APP_NAME = app_constants.APP_NAME;
const ORGANIZATION_URL = APP_NAME + program_constants.ORGANIZATION_PATH;
const PROGRAM_PATH = program_constants.PROGRAMS_PATH;

export default class ShowBreadCrumd extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <Breadcrumb
          path={
            [
              {
                path: APP_NAME,
                label: I18n.t("breadcrumbs.home"),
              },
              {
                path: ORGANIZATION_URL,
                label: I18n.t("breadcrumbs.organizations"),
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id,
                label: this.props.organization.name,
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id +
                  '/' + PROGRAM_PATH,
                label: I18n.t("breadcrumbs.programs"),
              },
              {
                path: ORGANIZATION_URL + '/' + this.props.organization.id +
                  '/' + PROGRAM_PATH + '/' + this.props.program.id,
                label: this.props.program.name,
              }
            ]
          }
          separatorChar={' > '}
          others={this.props.others}
        />
      </div>
    );
  }
}
