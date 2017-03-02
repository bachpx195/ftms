import React from 'react';
import axios from 'axios';
import * as table_constants from 'constants/griddle_table_constants';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
export default class UserSubjectList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_subjects: props.user_subjects,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user_subjects: nextProps.user_subjects,
    });
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

    const selectBoxStatus = (griddleKey) => (
      <select name="form-control">
        <option>{I18n.t('subjects.status.init')}</option>
        <option>{I18n.t('subjects.status.progress')}</option>
        <option>{I18n.t('subjects.status.waiting')}</option>
        <option>{I18n.t('subjects.status.finish')}</option>
      </select>
    );

    return (
      <div className='col-md-12'>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              <span>{I18n.t('subjects.titles.user_subject_list')}</span>
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          <div className='box-body'>
            <Griddle data={this.state.user_subjects}
              plugins={[plugins.LocalPlugin]}
              components={{Layout: NewLayout}}
              styleConfig={table_constants.styleConfig}>
              <RowDefinition>
                <ColumnDefinition id='user_name'
                  title={I18n.t('subjects.headers.user_name')} />
                <ColumnDefinition id='start_date'
                  title={I18n.t('subjects.headers.start_date')} />
                <ColumnDefinition id='end_date'
                  title={I18n.t('subjects.headers.end_date')} />
                <ColumnDefinition id='status'
                  title={I18n.t('subjects.headers.status')}
                  customComponent={selectBoxStatus} />
                <ColumnDefinition id='current_progress'
                  title={I18n.t('subjects.headers.current_progress')} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }
}
