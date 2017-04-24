import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import {NewLayout} from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as routes from 'config/routes';

export default class MetaTasks extends React.Component {
  render() {
    const userLink = ({griddleKey}) => {
      let user = this.props.meta_tasks[griddleKey].dynamic_task.user;
      return <a href={routes.user_url(user.id)}>{user.name}</a>;
    };

    const metaTaskLink = ({value}) => {
      return <a href={value}>{value}</a>;
    };

    const TimeComponent = ({value}) => {
      return <span>{I18n.l('time.formats.default', value)}</span>;
    };

    return (
      <div className='row'>
        <Griddle data={this.props.meta_tasks} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='user' title={I18n.t('tasks.headers.name')}
              customComponent={userLink} />
            <ColumnDefinition id='title'
              title={I18n.t('tasks.headers.title')} />
            <ColumnDefinition id='value'
              title={I18n.t('tasks.headers.value')}
              customComponent={metaTaskLink} />
            <ColumnDefinition id='created_at'
              title={I18n.t('tasks.headers.sent_at')}
              customComponent={TimeComponent} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
