import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import CreateForm from './create_form';
import UniversityLists from './university_lists';

import * as app_constants from 'constants/app_constants';
import * as university_contants from './university_contants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_contants.ADMIN_UNIVERSITY_PATH;

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
                  <CreateForm
                    universities={this.state.universities}
                    createUniversity={this.createUniversity.bind(this)}
                  />
                </div>
              </div>
            </div>

            <div className='box-footer'>
              <UniversityLists
                universities={this.state.universities}
                updateUniversity={this.updateUniversity.bind(this)}
                deleteUniversity={this.deleteUniversity.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  createUniversity(name) {
    axios.post(UNIVERSITY_URL, {
      university: {
        name: name
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.state.universities.push(response.data.university);
      this.setState({universities: this.state.universities});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateUniversity(university, newName) {
    axios.patch(UNIVERSITY_URL + '/' + university.id, {
      university: {
        name: newName
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      const foundItem = _.find(this.state.universities, university => university.id === response.data.university.id);
      foundItem.name = newName;
      this.setState({universities: this.state.universities});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteUniversity(universityDelete) {
    // axios.delete(UNIVERSITY_URL + '/' + universityDelete.id, {
    //   params: {
    //     authenticity_token: ReactOnRails.authenticityToken()
    //   }
    // }, app_constants.AXIOS_CONFIG)
    // .then(response => {
    //   _.remove(this.state.universities, university => university.id === universityDelete.id);
    //   this.setState({ universites: this.state.universities });
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    axios({
      method: 'delete',
      url: UNIVERSITY_URL + '/' + universityDelete.id,
      data: {
        authenticity_token: ReactOnRails.authenticityToken()
      },
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      _.remove(this.state.universities, university => university.id === universityDelete.id);
      this.setState({ universites: this.state.universities });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetchUniversities() {
    axios.get(UNIVERSITY_URL + '.json')
      .then(response => this.setState({ universities:response.data.universities }))
      .catch(response => console.log(response));
  }
}
