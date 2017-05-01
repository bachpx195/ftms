import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';
import {NewLayout} from 'shared/griddles/new_layout';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalMetaTasks from './modal_meta_tasks';
import React from 'react';

export default class DynamicTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta_tasks: []
    }
  }

  render() {
    const UserLink = ({griddleKey}) => {
      let user = this.props.tasks[griddleKey].user;
      return <a href={routes.user_url(user.id)}>{user.name}</a>;
    };

    const Status = ({value}) => {
      return <span>{I18n.t('tasks.statuses.' + value)}</span>;
    };

    const ShowMetaTasksButton = ({griddleKey}) => {
      let meta_tasks = this.props.tasks[griddleKey].meta_tasks;
      if (meta_tasks.length > 0) {
        return (
          <button type='button' className='btn btn-primary'
            onClick={this.showMetaTasks.bind(this, meta_tasks)}>
            {I18n.t('tasks.meta_tasks')}
          </button>
        );
      }
      return null;
    };

    return (
      <div className='row'>
        <Griddle data={this.props.tasks} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='user' title={I18n.t('tasks.headers.name')}
              customComponent={UserLink} />
            <ColumnDefinition id='status'
              title={I18n.t('tasks.headers.status')}
              customComponent={Status} />
            <ColumnDefinition id='show_meta_tasks_button'
              title={I18n.t('tasks.meta_tasks')}
              customComponent={ShowMetaTasksButton} />
          </RowDefinition>
        </Griddle>
        <ModalMetaTasks meta_tasks={this.state.meta_tasks} />
      </div>
    );
  }

  showMetaTasks(meta_tasks) {
    this.setState({meta_tasks: meta_tasks});
    $('.modal-meta-tasks').modal();
  }
}
