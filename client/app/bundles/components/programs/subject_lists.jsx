import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';

export default class SubjectLists extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      subjects: [],
      program_subject_counts: null,
      program_name: '',
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      subjects: nextProps.subjects,
      program_subject_counts: nextProps.program_subject_counts,
      program_name: nextProps.program_name
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

    const Image = ({griddleKey}) => (
      <div className='td-box'>
        <img src={this.state.subjects[griddleKey].image}
          className='thumbnail-image td-course-image'/>
      </div>
    );

    return (
      <div className='col-md-12'>
        <div className='box box-warning'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('programs.list_subjects')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i></button>
            </div>
          </div>
          <div className='box-body'>
            <Griddle data={this.state.subjects} plugins={[plugins.LocalPlugin]}
              components={{Layout: NewLayout}}
              styleConfig={table_constants.styleConfig}>
              <RowDefinition>
                <ColumnDefinition id='image'
                  title={I18n.t('programs.image')}
                  customComponent={Image} />
                <ColumnDefinition id='name' title={I18n.t('programs.name')} />
                <ColumnDefinition id='description' title={I18n.t('programs.description')} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }
}
