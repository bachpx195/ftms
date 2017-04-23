import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';

import * as routes from 'config/routes';

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
      <a href={routes.user_url(
        this.props.organization_moving_histories[griddleKey].user_id)}>{value}
      </a>
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
