import React from 'react';
import Form from './form';
import axios from 'axios';
import SubjectLists from './subject_lists';

export default class ModalAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      select_subjects: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return (
      <div id='modalAssignSubject' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' 
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title' title={this.state.training_standard.name || ''}>
                {this.state.training_standard.name || ''}
              </h4>
            </div>
            <div className='modal-body'>
              <SubjectLists
                selected_subjects={this.state.selected_subjects}
                remain_subjects={this.state.remain_subjects}
                standard_subjects={this.state.standard_subjects}
                training_standard={this.state.training_standard}
                select_subjects={this.state.select_subjects}
                chooseSubjectItem={this.chooseSubjectItem.bind(this)}
              />
            </div>
            <div className="modal-footer">
              <div className="col-md-3 col-md-offset-4">
                <button className="btn btn-success" onClick={this.onSubmitAssignSubject.bind(this)}
                  title={I18n.t("training_standards.assign")}>{I18n.t("training_standards.assign")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmitAssignSubject() {
    this.props.handleAfterAssignSubject(this.state.select_subjects);
    this.setState({
      select_subjects: []
    });
    $('#modalAssignSubject').modal('hide');
  }

  chooseSubjectItem(select_subjects) {
    this.setState({
      select_subjects: select_subjects
    });
  }
}
