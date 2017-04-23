import React from 'react';
import axios from 'axios'

import FunctionLists from './function_lists';

import * as routes from 'config/routes';

export default class FunctionsBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      functions: []
    };
  }

  componentDidMount() {
    this.fetchFunctions();
  }

  fetchFunctions() {
    axios.get(routes.functions_url() + '.json')
    .then(response =>{
      this.setState({functions: response.data.functions});
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">

            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("functions.titles.all")}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-footer'>
              <FunctionLists functions={this.state.functions} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}
