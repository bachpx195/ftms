import React from 'react';
import { connect } from 'react-redux';

import * as table_constants from 'constants/griddle_table_constants';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class UserFunctionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functions: []
    }
  }

  render(){
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className="col-md-12">
        <div className="row">
          <div className="griddle-head clearfix">
            <div className="col-md-6">
              <Filter />
            </div>
            <div className="col-md-6 text-right">
              <Pagination />
            </div>
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    );

    return(
      <div id="user_function_modal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{I18n.t("users.user_function")}</h4>
            </div>
            <div className="modal-body">
              <Griddle data={this.state.functions} plugins={[plugins.LocalPlugin]}
                components={{Layout: NewLayout}}
                styleConfig={table_constants.styleConfig}>
                <RowDefinition keyColumn="id">
                  <ColumnDefinition id="id"
                    title={I18n.t("functions.table_position")}/>
                  <ColumnDefinition id="controller_name"
                    title={I18n.t("functions.controller_name")}/>
                  <ColumnDefinition id="action"
                    title={I18n.t("functions.action")} />
                  <ColumnDefinition id="action"
                    title={I18n.t("functions.action")} />
                </RowDefinition>
              </Griddle>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                {I18n.t("buttons.close")}</button>
              <button type="button" className="btn btn-primary">{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
