import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH;

import * as table_constants from 'constants/griddle_table_constants';
import UserFunctionBox from './user_function_box';
import Row from './row';
import Cell from './cell';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class UserListBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      user_functions: []
    };
    Row.prototype.handleClick = this.handleClick.bind(this);
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
              <Pagination/>
            </div>
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    );

    return(
      <div>
        <Griddle data={this.state.users} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout, Cell: Cell, Row: Row}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="id"
              title={I18n.t("users.id")}/>
            <ColumnDefinition id="name"
              title={I18n.t("users.name")}/>
            <ColumnDefinition id="email"
              title={I18n.t("users.email")} />
            <ColumnDefinition id="action"
              title={I18n.t("users.action")} />
          </RowDefinition>
        </Griddle>
        <UserFunctionBox data={this.state.user_functions}/>
      </div>
    );
  }

  handleClick(key){
    $('#user_function_modal').modal();
    axios.get(USER_URL + '/' + key + '.json')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCell(){
    return(
      <Cell updateData={this.updateData.bind(this)}/>
    );
  }
}
