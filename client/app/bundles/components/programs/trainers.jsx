import React from 'react';

export default class Trainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    }
  }

  render() {
    let course = this.state.course;
    let trainers = [];
    let renderUsers = null;
    if (course.users) {
      let count_users = course.users.length - 2;
      trainers = course.users.slice(0,2).map((trainer, index) => {
        return (<div key={index} className="block-trainer">
          <a className="image" onError={this.checkImage.bind(this)}
            title={trainer.name} href={this.props.user_url + trainer.id} >
            <img src={trainer.avatar.url} className='img-circle' />
          </a>
        </div>);
      });
      if (count_users > 0) {
        renderUsers = (
          <div className='subsit-users'>
            <div className="block-trainer">
              <p className="image image-others"
                onClick={this.handleClick.bind(this)}
                title={I18n.t('organizations.other_managers')} >
                <img src='/assets/profile.png' className='img-circle' />
                <span className='count-users'>{count_users}+</span>
              </p>
            </div>
            <div id='modalManager' className='modal fade in' role='dialog'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button type='button' className='close'
                      data-dismiss='modal'>&times;</button>
                    <h4 className='modal-title'>
                      {I18n.t('organizations.all_managers')}
                    </h4>
                  </div>
                  <div className='modal-body'>
                    {this.renderOtherManagers(course.users.slice(0, course.users.length))}
                  </div>
                  <div className='clearfix'></div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
    return (
      <div className="list-trainers" key={'course'+course.id}>
        {trainers}
        {renderUsers}
      </div>
    )
  }

  renderOtherManagers(course_users) {
    return (
      course_users.map((trainer, index) => {
        return (
          <div key={index} className="block-trainer">
            <a className="image" onError={this.checkImage.bind(this)}
              title={trainer.name} href={this.props.user_url + trainer.id} >
              <img src={trainer.avatar.url} className='img-circle' />
            </a>
          </div>
        )
      })
    )
  }

  checkImage(event) {
    let target = event.target;
    $(target).attr('src', '/assets/image_found.png')
  }

  handleClick() {
    let $target = $(event.target);
    $target.blur();
    $('#modalManager').modal();
  }
}
