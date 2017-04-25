import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unassigned_user_subjects: props.unassigned_user_subjects,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      unassigned_user_subjects: nextProps.unassigned_user_subjects,
    });
  }

  render() {
    return (
      <div className='modalTeam modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('teams.create')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                course_subject={this.props.course_subject}
                team={this.props.team}
                url={this.props.url}
                handleAfterSaved={this.handleAfterSaved.bind(this)}
                user_subjects={this.state.unassigned_user_subjects}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterSaved(team) {
    this.props.handleAfterSaved(team);
  }
}
