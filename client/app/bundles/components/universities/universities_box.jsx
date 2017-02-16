import React from 'react';
import axios from 'axios';

import CreateForm from './create_form';
import UniversityLists from './university_lists';

import * as app_constants from 'constants/app_constants';
import * as university_constants from './university_constants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.ADMIN_UNIVERSITY_PATH;

export default class UniversityBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: []
    };
  }

  componentWillMount() {
    this.fetchUniversities();
  }

  render () {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('universities.titles.all')}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                  <CreateForm afterCreate={this.afterCreate.bind(this)} />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <UniversityLists
                universities={this.state.universities}
                afterUpdate={this.afterUpdate.bind(this)}
                afterDelete={this.afterDelete.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterCreate(university) {
    this.state.universities.push(university);
    this.setState({universities: this.state.universities});
  }

  afterUpdate(old_university, new_university) {
    let found_item = _.findIndex(this.state.universities,
      university => university.id === old_university.id);
    this.state.universities[found_item] = new_university;
    this.setState({universities: this.state.universities});
  }

  afterDelete(deleted_university) {
    _.remove(this.state.universities,
      university => university.id === deleted_university.id);
    this.setState({universities: this.state.universities});
  }

  fetchUniversities() {
    axios.get(UNIVERSITY_URL + '.json')
      .then(response => this.setState({universities: response.data.universities}))
      .catch(response => console.log(response));
  }
}
