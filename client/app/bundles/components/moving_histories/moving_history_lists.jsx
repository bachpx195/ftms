import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';

import * as app_constants from 'constants/app_constants';
import * as moving_history_constants from './moving_history_constants';

const USER_URL = app_constants.APP_NAME + moving_history_constants.USERS_PATH

export default class MovingHistoryLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_moving_histories: props.organization_moving_histories,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization_moving_histories: nextProps.organization_moving_histories
    });
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='griddle-head clearfix'>
          <div className='col-md-6'>
            <Filter />
          </div>
          <div className='col-md-6 text-right'>
            <Pagination />
          </div>
        </div>
        <Table />
      </div>
    );

    const LinkShowUser = ({value, griddleKey}) => (
      <a href={USER_URL + '/' +
        this.props.organization_moving_histories[griddleKey].user_id}>{value}</a>
    );
    return (
      <div className='col-md-10 col-md-offset-1'>
        <Griddle data={this.state.organization_moving_histories}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='user_name' title='User Name'
              customComponent={LinkShowUser}/>
            <ColumnDefinition id='source_name' title='From'/>
            <ColumnDefinition id='destination_name' title='To'/>
            <ColumnDefinition id='move_date' title='Moving Date'/>
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
