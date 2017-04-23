import axios from 'axios';
import css from '../assets/subject.scss';
import MetaList from './meta_lists';
import React from 'react';
import _ from 'lodash';
import * as routes from 'config/routes';

export default class PullRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_task: [],
      dynamic_task: props.dynamic_task,
      assignment: props.assignment,
      meta_tasks: props.meta_tasks || []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      assignment: nextProps.assignment,
      meta_tasks: nextProps.meta_tasks,
      dynamic_task: nextProps.dynamic_task
    });
  }

  render() {
    return(
      <div className="modal-send-pull modal fade" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="assign-member-label">
                {I18n.t("meta_tasks.title")}
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form className="form-horizontal">
                    <div className="col-md-10">
                      <input type='value'
                        placeholder={I18n.t("meta_tasks.placeholder_value")}
                        className='form-control' name='value' ref="link_pull" />
                      </div>
                    <div className="col-md-2">
                      <button type="submit" className="btn btn-primary"
                        onClick={this.sendPull.bind(this)}>
                        {I18n.t("meta_tasks.send_pull")}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <MetaList
                meta_tasks={this.state.meta_tasks}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  sendPull(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('meta_task[title]', "Pull request of " + this.state.assignment.name);
    formData.append('meta_task[value]', this.refs.link_pull.value);
    formData.append('meta_task[meta_type]', "Pull request");
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.state.meta_task.id ? 'PUT' : 'POST';
    let url = routes.dynamic_task_meta_tasks_url(this.state.dynamic_task.id);

    axios({
      url: url + ".json",
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.refs.link_pull.value = "";
      this.props.afterSendPull(response.data.meta_task);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
