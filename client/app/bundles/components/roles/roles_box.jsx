import React from 'react';
import axios from 'axios';
import go from 'gojs';
import RoleDetail from './role_detail';
import * as app_constants from 'constants/app_constants';
import * as role_constants from './role_constants'

const goObj = go.GraphObject.make;
const ROLE_URL = app_constants.APP_NAME + role_constants.ROLE_PATH;
const ROLE_FUNCTION_URL = app_constants.APP_NAME + role_constants.ROLE_FUNCTION_PATH;

export default class RoleBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDiagram: null,
      dataRole: {functions: [], role: {}},
      data: {
        class: 'go.TreeModel',
        nodeDataArray: []
      }
    };
  }

  componentWillMount() {
    let nodeDataArray = [];
    let _functions = this.props.roles;

    for (let value of _functions) {
      let _function = {
        'key': value.id,
        'name': value.name,
      };
      if(value.parent_id) {
        Object.assign(_function, {'parent': value.parent_id});
      }
      nodeDataArray.push(_function);
    }
    Object.assign(this.state.data, {nodeDataArray: nodeDataArray});
    this.setState({
      data: this.state.data
    });
  }

  render() {
    return (
      <div className='row functions'>
        <div ref='myDiagramDiv' id='myDiagramDiv'></div>
        <button id='SaveButton' onClick={this.onSave.bind(this)}>{I18n.t("buttons.save")}</button>
        <RoleDetail updateRoleDiagram={this.updateRoleDiagram.bind(this)} functions={this.state.dataRole.functions}
          role={this.state.dataRole.role}/>
      </div>
    );
  }

  componentDidMount() {
    if (window.goSamples) goSamples();
    let myDiagram = goObj(go.Diagram, this.refs.myDiagramDiv,
      {
        initialContentAlignment: go.Spot.Center,
        maxSelectionCount: 1,
        validCycle: go.Diagram.CycleDestinationTree,
        'clickCreatingTool.archetypeNodeData': {},
        'clickCreatingTool.insertPart': loc => {
          this.archetypeNodeData = {
          };
          return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
        },
        layout: goObj(go.TreeLayout,
          {
            treeStyle: go.TreeLayout.StyleLastParents,
            layerSpacing: 35,
            alternateLayerSpacing: 15,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }
        ),
      }
    );

    let levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB',
      '#008299', '#D24726', '#008A00', '#094AB2'];

    myDiagram.layout.commitNodes = () => {
      go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);
      myDiagram.layout.network.vertexes.each(v => {
        if (v.node) {
          let level = v.level % (levelColors.length);
          let color = levelColors[level];
          let shape = v.node.findObject('SHAPE');
          if (shape) shape.fill = goObj(go.Brush, 'Linear', {0: color,
            1: go.Brush.lightenBy(color, 0.05),
            start: go.Spot.Left, end: go.Spot.Right});
        }
      });
    };

    myDiagram.nodeTemplate = goObj(go.Node, 'Auto',
      {
        mouseDragEnter: (e, node, prev) => {
          let diagram = node.diagram;
          let selnode = diagram.selection.first();
          if (!this.mayWorkFor(selnode, node)) return;
          let shape = node.findObject('SHAPE');
          if (shape) {
            shape._prevFill = shape.fill;
            shape.fill = 'darkred';
          }
        },

        mouseDragLeave: (e, node, next) => {
          let shape = node.findObject('SHAPE');
          if (shape && shape._prevFill) {
            shape.fill = shape._prevFill;
          }
        },

        mouseDrop: (e, node) => {
          let diagram = node.diagram;
          let selnode = diagram.selection.first();
          if (this.mayWorkFor(selnode, node)) {
            let link = selnode.findTreeParentLink();
            if (link !== null) {
              link.fromNode = node;
            } else {
              diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
            }
          }
        }
      },
      new go.Binding('text', 'name'),
      new go.Binding('layerName', 'isSelected', function(sel) { return sel ? 'Foreground' : ''; }).ofObject(),
      goObj(go.Shape, 'Rectangle',
        {
          name: 'SHAPE', fill: 'white', stroke: null,
          portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
        }
      ),
      goObj(go.Panel, 'Horizontal',
        goObj(go.Panel, 'Table',
          {
            maxSize: new go.Size(150, 999),
            margin: new go.Margin(6, 10, 0, 3),
            defaultAlignment: go.Spot.Left
          },
          goObj(go.RowColumnDefinition, {column: 2, width: 4}),
          goObj(go.TextBlock, this.textStyle(),
            {
              row: 0, column: 0, columnSpan: 5,
              font: '12pt Segoe UI,sans-serif',
              editable: false, isMultiline: false,
              minSize: new go.Size(10, 16)
            },
            new go.Binding('text', 'name').makeTwoWay()
          ),

          goObj('Button',
            {
              row: 1, column: 0, columnSpan: 5,
              minSize: new go.Size(10, 16),
              click: this.editRole.bind(this)
            },
            goObj(go.TextBlock, I18n.t('buttons.edit'))),

          goObj(go.TextBlock, this.textStyle(), this.textStyle(),
            {
              row: 3, column: 0, columnSpan: 5,
              font: 'italic 9pt sans-serif',
              wrap: go.TextBlock.WrapFit,
              editable: true,
              minSize: new go.Size(10, 14)
            },
            new go.Binding('text', 'comments').makeTwoWay()
          )
        )
      )
    );

    myDiagram.linkTemplate = goObj(go.Link, go.Link.Orthogonal,
      {corner: 5, relinkableFrom: true, relinkableTo: true},
      goObj(go.Shape, {strokeWidth: 4, stroke: '#00a4a4'})
    );
    myDiagram.model = go.Model.fromJson(JSON.stringify(this.state.data));
    this.setState({myDiagram: myDiagram});
    if (window.Inspector) myInspector = new Inspector('myInspector', myDiagram,
      {
        properties: {
          'key': {readOnly: true},
          'comments': {}
        }
      }
    );
  }

  onSave() {
    let data = this.state.myDiagram.model.toJson();
    $.ajax({
      url: 'roles/1',
      type: 'PATCH',
      data: {
        node_array: data
      },
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      }
    });
  }

  mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false;
    if (node1 === node2) return false;
    if (node2.isInTreeOf(node1)) return false;
    return true;
  }

  textStyle() {
    return {font: '9pt  Segoe UI,sans-serif', stroke: 'white'};
  }

  updateRoleDiagram(role){
    var nodeDataArray = this.state.data.nodeDataArray;
    for (var index in nodeDataArray){
      if(nodeDataArray[index].key == role.id) {
        nodeDataArray[index].name = role.name;
      }
    }
    Object.assign(this.state.data, {nodeDataArray: this.state.data.nodeDataArray});
    this.state.myDiagram.model = go.Model.fromJson(JSON.stringify(this.state.data));
  }

  editRole(e, obj){
   $('.role-detail').modal('show');
   axios.get(ROLE_URL + '/' + obj.part.data.key + '.json')
    .then(response => {
      this.setState({dataRole: response.data});
      console.log(response.data);
    })
   .catch(error => {
      console.log(error);
   });
  }
}
