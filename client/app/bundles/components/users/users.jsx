import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

const USERS_URL = app_constants.APP_NAME + app_constants.USERS_PATH;
const USER_FUNCTIONS_URL = app_constants.APP_NAME + app_constants.USER_FUNCTIONS_PATH;

import * as table_constants from 'constants/griddle_table_constants';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      user_id: null,
      user_functions: []
    };
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

    const LinkShowUser = ({value, griddleKey}) => (
      <a href={USERS_URL + '/' + this.props.users[griddleKey].id}>{value}</a>
    );

    return(
      <div>
        <Griddle data={this.state.users} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="id"
              title={I18n.t("users.id")}/>
            <ColumnDefinition id="name" customComponent={LinkShowUser}
              title={I18n.t("users.name")}/>
            <ColumnDefinition id="email"
              title={I18n.t("users.email")} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  handlePermission(key){
    $('#user_function_modal').modal();
    axios.get(USER_FUNCTIONS_URL + '/' + key + '.json')
      .then(response => {
        console.log(response.data);
        this.setState({user_functions: response.data.functions, user_id: key});
      })
      .catch(error => {
        console.log(error);
      });
  }
}
