import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

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
      <a href={routes.user_url(this.props.users[griddleKey].id)}>{value}</a>
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
}
