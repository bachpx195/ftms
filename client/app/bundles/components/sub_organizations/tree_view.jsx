import React from 'react';
import _ from 'lodash';
import TreeNode from './tree_node';
import Modal from './modal';

export default class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      id: '',
      data: props.data,
      parent: '',
      status: '',
      organization: props.organization
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      id: nextProps.id,
      data: nextProps.data,
      parent: nextProps.parent,
      organization: nextProps.organization
    });
  }

  render() {
    return(
      <div className="programs-of-organization">
        <ul className="list-group">
          {this.renderNode(this.state.data)}
        </ul>
        <Modal
          organization={this.props.organization}
          name={this.state.name}
          id={this.state.id}
          status={this.state.status}
          parent={this.state.parent}
          afterCreate={this.afterCreate.bind(this)}
          afterEdit={this.afterEdit.bind(this)}
        />
      </div>
    );
  }

  renderNode(data) {
    return _.map(data, node => {
      return (
        <li className="list-group-item" key={node.id}>
          <TreeNode
            organization={this.props.organization}
            key={node.id}
            node={node}
            children={node.nodes}
            handleonClickEdit={this.handleonClickEdit.bind(this)}
            handleonClickCreate={this.handleonClickCreate.bind(this)}
          />
        </li>
      );
    })
  }

  handleonClickEdit(name, id) {
    this.setState({
      name: name,
      id: id,
      parent: '',
      status: 'edit'
    });
  }

  handleonClickCreate(parent) {
    this.setState({
      parent: parent,
      name: '',
      id: '',
      status: 'create'
    });
  }

  afterCreate(program) {
    this.push_program_after_create(this.state.data, program);
  }

  push_program_after_create(nodes, program) {
    let json = {
      text: program.name,
      id: program.id,
      parent: program.parent_id,
      nodes: []
    }
    _.map(nodes, node => {
      if(node.id == program.parent_id) {
        node.nodes.push(json);
      } else {
        if(node.nodes != []) {
          this.push_program_after_create(node.nodes, program);
        }
      }
    })
    this.setState({
      data: this.state.data
    });
  }

  afterEdit(program) {
    _.map(this.state.data, node => {
      this.push_program_after_edit(this.state.data, program);
    })
  }

  push_program_after_edit(nodes, program) {
    _.map(nodes, node => {
      if(node.id == program.id) {
        node.text = program.name
        this.setState({
          data: this.state.data
        });
      } else {
        if(node.nodes != []) {
          this.push_program_after_edit(node.nodes, program);
        }
      }
    })
  }
}
