import axios from 'axios';
import css from '../../assets/subject.scss';
import React from 'react';
import _ from 'lodash';
import FormMetaTask from '../../subject_form/form_meta_task';
import * as routes from 'config/routes';

export default class PullRequestList extends React.Component {
  constructor(props) {
    super(props);
    let meta_tasks = new Array();
    for (let key in this.props.meta_tasks) {
      meta_tasks[key] = this.props.meta_tasks[key];
    }
    this.state = {
      meta_task: [],
      dynamic_task: props.dynamic_task,
      assignment: props.assignment,
      meta_tasks: meta_tasks
    }
  }

  componentWillReceiveProps(nextProps) {
    let meta_tasks = new Array();
    for (let key in nextProps.meta_tasks) {
      meta_tasks[key] = nextProps.meta_tasks[key];
    }

    this.setState({
      assignment: nextProps.assignment,
      meta_tasks: meta_tasks,
      dynamic_task: nextProps.dynamic_task
    });
  }

  render() {
    let form_task = [];
    if (this.state.assignment.meta_types) {
      this.state.assignment.meta_types.map((meta_type, index) => {
        let id = _.findIndex(this.state.meta_tasks, meta_task => {
          return meta_task.title === meta_type.name;
        })
        if(id >= 0) {
          form_task.push(
            <FormMetaTask meta_type={meta_type} key={index}
              meta_task={this.state.meta_tasks[id]}
              afterOnChangeInput={this.afterOnChangeInput.bind(this)}
            />
          )
        } else {
          form_task.push(
            <FormMetaTask meta_type={meta_type} key={index}
              meta_task
              afterOnChangeInput={this.afterOnChangeInput.bind(this)}
            />
          )
        }

      })
    }

    return (
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
                    {form_task}
                    <button type="submit" className="btn btn-primary"
                      onClick={this.sendPull.bind(this)}>
                      {I18n.t("meta_tasks.submit_task")}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterOnChangeInput(meta_task) {
    let index = this.state.meta_tasks
      .findIndex(_meta_task => meta_task.title === _meta_task.title);
    if(index >= 0) {
      this.state.meta_tasks[index] = meta_task;
    } else {
      this.state.meta_tasks.push(meta_task);
    }

    this.setState({
      meta_tasks: this.state.meta_tasks
    })
  }

  sendPull(event) {
    event.preventDefault();
    let formData = new FormData();
    this.state.meta_tasks.map((meta_task, index) => {
      if (meta_task.id) {
        formData.append('meta_task['+ index + '][id]', meta_task.id)
      }
      formData.append('meta_task['+ index + '][title]', meta_task.title);
      formData.append('meta_task['+ index + '][value]', meta_task.value);
    });
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method, url;
    if (this.props.meta_tasks.length > 0) {
      method = 'PUT';
      url = routes.update_meta_task_url(this.state.dynamic_task.id);
    } else {
      method = 'POST';
      url = routes.create_meta_task_url(this.state.dynamic_task.id);
    }
    axios({
      url: url + '.json',
      method: method,
      data: formData
    })
    .then(response => {
      $('.modal-send-pull').modal('hide');
      this.props.afterSendPull(dynamic_task, this.state.meta_tasks);
    })
    .catch(error => console.log(error));
  }
}
