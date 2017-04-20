import axios from 'axios';
import Clone from '../actions/clone';
import Share from '../actions/share';
import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      select_organizations: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  renderButton() {
    if (this.props.evaluation_template) {
      let evaluation = this.props.url + '/'+ this.props.training_standard.id +
        '/evaluation_template';
      return (
        <div className='col-md-2'>
          <a className='btn btn-success' href={evaluation}
            title={I18n.t('training_standards.create_evaluation')}>
            <i className='fa fa-eye'></i> {I18n.t('training_standards.show_evaluation')}
          </a>
        </div>
      );
    } else {
      return (
        <div className='col-md-2'>
          <button className='btn btn-success'
            title={I18n.t('training_standards.create_evaluation')}
            onClick={this.props.onClickCreateEvaluationTemplate}>
            <i className='fa fa-eye'></i> {I18n.t('training_standards.show_evaluation')}
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='box box-success'>
        <div className='row'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='border-btn'>
                <div className='col-md-2'>
                  <button className='btn btn-success'
                    title={I18n.t('training_standards.assign')}
                    onClick={this.props.onClickButtonAssignSubject}>
                    <i className='fa fa-plus'></i>
                    {I18n.t('training_standards.assign')}
                  </button>
                </div>
                {this.renderButton()}
                <Clone training_standard={this.props.training_standard}
                  organization={this.props.organization}
                  share_with_organization={this.props.share_with_organization} />
                <Share training_standard={this.props.training_standard}
                  organization={this.props.organization}
                  standard_organizations={this.props.standard_organizations}
                />
              </div>
            </div>
          </div>
          <div className='row custom-padding-action'>
            <div className='col-md-4 griddle-head'>
              <this.props.Filter />
            </div>
            <div className='col-md-4 griddle-head'>
              <this.props.Pagination />
            </div>
          </div>
          <div className='row custom-padding-table'>
            <div className='col-md-12'>
              <this.props.Table />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
