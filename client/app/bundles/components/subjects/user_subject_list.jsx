import React from 'react';
import axios from 'axios';
import * as table_constants from 'constants/griddle_table_constants';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const USER_SUBJECT_URL = app_constants.APP_NAME + subject_constants.USER_SUBJECT_PATH;

export default class UserSubjectList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_subjects: props.user_subjects,
      statuses: props.statuses,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user_subjects: nextProps.user_subjects,
      statuses: nextProps.statuses,
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

    const selectBoxStatus = ({griddleKey}) => (
      <select className="select-status" onChange={this.handleChange.bind(this)}
        name='status' data-index={griddleKey} 
        value={this.state.user_subjects[griddleKey].status}>
        {this.renderOptions()}
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

  handleChange(event) {
    let user_subject = this.state.user_subjects[$(event.target).data('index')];
    let index = this.state.user_subjects
      .findIndex(user_subject_item => user_subject_item.id === user_subject.id);
    this.state.user_subjects[index].status = event.target.value;
   
    axios.patch(USER_SUBJECT_URL + user_subject.id, {
      status: event.target.value,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        user_subjects: this.state.user_subjects,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderOptions() {
    let statuses=[];
    for(var key in this.state.statuses){
      statuses.push(
        <option key={this.state.statuses[key]} value={key}>
          {I18n.t('subjects.status.'+ key)}
        </option>
      )
    }
    return statuses;
  }
}
