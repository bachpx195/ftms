import React from 'react';

import * as app_constants from 'constants/app_constants';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

const ROOT_URL = app_constants.APP_NAME + app_constants.ROOT_PATH;

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    };
  }

  renderPrograms () {
    let programs = ['new_dev', 'intern', 'open_edu'];
    return _.map(programs, program => {
      return (
        <div key={program} className='col-md-4'>
          <a href={`${ROOT_URL}/#program-${program}`} className='scroll_to_section' data-target={`#program-${program}`}>
            <div className='program clearfix'>
              <div className='col-md-12'>
                <h3 className='name'>
                  {I18n.t(`staticpages.learning_programs.${program}_name`)}
                </h3>
                <h4 className='description'>
                  {I18n.t(`staticpages.learning_programs.${program}_description`)}
                </h4>
              </div>
              <div className='col-sm-12 program-image'>
                <img src={`assets/programs/${program}.png`} className="program-img" />
              </div>
            </div>
          </a>
        </div>
      );
    });
  }

  renderLanguages () {
    return _.map(this.props.languages, language => {
      return (
        <div key={language.id} className="col-md-6">
          <div className="language clearfix">
            <div className="col-sm-3 language-image">
              <img src={`${language.image.url}`} />
            </div>
            <div className="col-sm-9 detail">
              <div className="row head">
                <div className="col-xs-8 name">
                  <h3>{language.name}</h3>
                </div>
                <div className="col-xs-4 statistic">
                  <p>{language.num_of_trainees}</p>
                  <p>{language.num_of_courses}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 description">
                  <p>{language.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  componentDidMount() {
    afterRender();
  }

  render () {
    return (
      <div className='landing-page'>
        <div id='programming-languages' className='scroll
          programming-languages'>
          <div className="td-wrapper">
            <div className='container-fluid'>
              <div className='row'>
                <h2 className='title'>
                  {I18n.t('staticpages.programming_languages.title')}
                </h2>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                {this.renderLanguages()}
              </div>
            </div>
          </div>
        </div>

        <div id='learning-programs' className='scroll learning-programs'>

          <section id='all-programs' className='all-programs'>
            <div className='container-fluid'>
              <div className='row'>
                <h2 className='title'>
                  {I18n.t('staticpages.learning_programs.title')}
                </h2>
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                {this.renderPrograms()}
              </div>
            </div>
          </section>

          <section className='program-progress'>
            <div id='program-intern' className='clearfix'>
              <div className='section-title'>
                {I18n.t('staticpages.intern.title')}
              </div>
              <div className='container relative'>
                <div className='col-sm-12 program-timeline' data-total-col='34'>
                  <div className='col-sm-3 timeline-block up' data-col='2'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/git.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.intern.git.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.intern.git.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.intern.git.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block down' data-col='10'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/tutorial.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.intern.tutorial.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.intern.tutorial.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.intern.tutorial.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block up' data-col='10'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/project.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.intern.project1.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.intern.project1.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.intern.project1.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block down' data-col='2'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/mysql.jpg' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.intern.mysql.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.intern.mysql.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.intern.mysql.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block up' data-col='10'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/project.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.intern.project2.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.intern.project2.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.intern.project2.body')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='program-progress'>
            <div id='program-open_edu' className='clearfix'>
              <div className='section-title'>
                {I18n.t('staticpages.open_edu.title')}
              </div>
              <div className='container relative'>
                <div className='col-sm-12 program-timeline' data-total-col='22'>
                  <div className='col-sm-3 timeline-block up' data-col='2'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/git.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.open_edu.git.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.open_edu.git.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.open_edu.git.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block down' data-col='10'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/tutorial.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.open_edu.tutorial.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.open_edu.tutorial.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.open_edu.tutorial.body')}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-3 timeline-block up' data-col='10'>
                    <div className='timeline-content'>
                      <div className='timeline-heading'>
                        <div className='img'>
                          <img src='assets/programs/project.png' className='img-circle' />
                        </div>
                      </div>
                      <div className='timeline-body'>
                        <h2 className='title'>
                          {I18n.t('staticpages.open_edu.project1.title')}
                        </h2>
                        <h4 className='subject-duration'>
                          {I18n.t('staticpages.open_edu.project1.duration')}
                        </h4>
                        <p>{I18n.t('staticpages.open_edu.project1.body')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id='counters' className='scroll counters'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12 col-sm-12 text-center'>
                  <h2 className='title'>
                    {I18n.t('staticpages.counters.title')}
                  </h2>
                  <h3 className='content'>
                    {I18n.t('staticpages.counters.content')}
                  </h3>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div className='counters-v2'>
                    <i className='counters-v2-icon fa fa-book'></i>
                    <figure className='counter color-base counters-v2-no'
                      data-remaining={this.props.courses_size}>
                      {this.props.courses_size}
                    </figure>
                    <h4 className='counters-v2-title'>
                      {I18n.t('layouts.courses')}
                    </h4>
                    <span className='counters-v2-subtitle'>
                      {I18n.t('staticpages.counters.completed')}
                    </span>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div className='counters-v2'>
                    <i className='counters-v2-icon fa fa-mortar-board'></i>
                    <figure className='counter color-base counters-v2-no'
                      data-remaining={this.props.trainees_size}>
                      {this.props.trainees_size}
                    </figure>
                    <h4 className='counters-v2-title'>
                      {I18n.t('courses.trainees')}
                    </h4>
                    <span className='counters-v2-subtitle'>
                      {I18n.t('staticpages.counters.learning')}
                    </span>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div className='counters-v2'>
                    <i className='counters-v2-icon fa fa-users'></i>
                    <figure className='counter color-base counters-v2-no'
                      data-remaining={this.props.trainers_size}>
                      {this.props.trainers_size}
                    </figure>
                    <h4 className='counters-v2-title'>
                      {I18n.t('courses.trainers')}
                    </h4>
                    <span className='counters-v2-subtitle'>
                      {I18n.t('staticpages.counters.manage')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {this.renderModalSignIn()}
      </div>
    );
  }

  renderModalSignIn() {
    return (
      <div className="modal fade login-modal" id="login-modal" tabIndex="-1"
        role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div id="div-forms" className="div-forms">
            <div id="login-form">
              <div className="content-top">{I18n.t("sessions.login")}</div>

              <div className="content-body">
                <div className="line-or"></div>
                <div className="form-modal">
                  {this.renderSessionNew()}
                </div>
              </div>

              <div className="content-footer">
                <a id="login_lost_btn" className="see-more pull-right">
                  {I18n.t("signins.forgot_password")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSessionNew() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} data-remote="true">
        <div className="form-group">
          <input name="email" type="text" placeholder={I18n.t("sessions.email")}
            className="form-control" />
        </div>
        <div className="form-group">
          <input name="password" type="password" placeholder={I18n.t("sessions.password")}
            className="form-control" autoComplete="off" />
        </div>
        <div className="checkbox">
          <span>
            <label className="fixed-label" name="remember_me">
              <input type="checkbox" name="remember_me"
                className="character-checkbox" />
              {I18n.t("signins.remember")}
            </label>
            <label className="text-right text-danger">
              {this.state.errors}
            </label>
          </span>
        </div>
        <input type="submit" className="btn btn-warning btn-login"
          value={I18n.t("sessions.login")} />
      </form>
    );
  }

  handleSubmit(event) {
    axios.post('auth/login', {
      user: {
        email: event.target.email.value,
        password: event.target.password.value,
        remember_me: event.target.remember_me.checked
      },
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.setState({
        errors: response.data.message
      });
      this.setLocalStorage(response.data.current_user);
      window.location.reload();
    })
    .catch(error => this.setState({errors: error.response.data.message}));
  }

  setLocalStorage(current_user) {
    localStorage.setItem('current_user', JSON.stringify(current_user));
  }
}
