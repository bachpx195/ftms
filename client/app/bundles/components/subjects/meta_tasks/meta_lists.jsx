import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

export default class MetaLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_tasks: props.meta_tasks
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      meta_tasks: nextProps.meta_tasks
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

    const LinkValue = ({value, griddleKey}) => {
      return <a href={`https://${value}`} target="_blank">{value}</a>
    };

    return (
      <div className='col-md-12'>
        <Griddle data={this.state.meta_tasks}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='title' title={I18n.t('meta_tasks.headers.title')} />
            <ColumnDefinition id='value' title={I18n.t('meta_tasks.headers.value')}
              customComponent={LinkValue}/>
            <ColumnDefinition id='meta_type' title={I18n.t('meta_tasks.headers.meta_type')} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
