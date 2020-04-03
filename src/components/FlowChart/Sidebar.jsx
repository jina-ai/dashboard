import React from "react";
import SidebarItem from './SidebarItem';
import { Button, FormControl, Row, Col, ButtonGroup } from 'react-bootstrap';
import { Store } from "../../flux";

class FlowChartSidebar extends React.Component {

  state = {
    availableProperties: Store.getAvailableProperties(),
    node: {},
  }

  componentWillReceiveProps = (nextProps) => {
    const { selected, nodes } = nextProps.chart;
    const { id, type } = selected;

    if (id === this.state.node.id)
      return;

    if (!id)
      return;

    if (type === 'node' && id != this.state.node.id) {
      const node = nodes[id];
      this.setInitialNode(node);
    }
  }

  setInitialNode = (node) => {
    const properties = {};
    const newProperties = {};
    const label = node.label;

    Object.keys(node.properties).map(key => {
      properties[key] = node.properties[key];
    });

    this.setState({ node: { label, id: node.id, properties, newProperties } });
  }

  updateLabel = (label) => {
    this.setState((prevState, props) => {
      const { node } = prevState;
      node.label = label;
      return { node };
    });
  }

  updateExistingValue = (prop, value) => {
    this.setState((prevState, props) => {
      const { node } = prevState;
      node.properties[prop] = value;
      return { node };
    });
  }

  updateNewValue = (prop, value) => {
    this.setState((prevState, props) => {
      const { node } = prevState;
      node.newProperties[prop] = value;
      return { node };
    });
  }

  saveChanges = () => {
    const { node } = this.state;
    const newNode = this.props.updateNode(node);
    this.setInitialNode(newNode);
  }

  renderEditNode = () => {
    const { availableProperties, node } = this.state;
    return (
      <div className="h-100 d-flex flex-column">
        <div className="p-2 mb-1">
          <p className="mb-1"><b>Pod Label</b></p>
          <FormControl spellCheck={false} value={node.label} onChange={(e) => this.updateLabel(e.target.value)} className="pod-name-input" />
        </div>
        <p className="mb-1 px-2"><b>Properties</b></p>
        <div className="property-table flex-fill mx-2">
          {
            Object.keys(node.properties).map(prop => {
              const value = node.properties[prop];
              return (
                <div key={prop} className="property-item mb-2">
                  <p className="property-label mb-1">{prop}</p>
                  <FormControl spellCheck={false} value={value} onChange={(e) => this.updateExistingValue(prop, e.target.value)} className="property-value-input" />
                </div>

              )
            })
          }
          {
            availableProperties.map(property => {
              if (typeof node.properties[property.name] == 'undefined')
                return (
                  <div key={property.name} className="property-item mb-2">
                    <p className="property-label mb-1">{property.name}</p>
                    <FormControl spellCheck={false} placeholder={property.type} value={node.newProperties[property.name] || ''} onChange={(e) => this.updateNewValue(property.name, e.target.value)} className="property-value-input"></FormControl>
                  </div>
                )
            })
          }
        </div>
        <div className="px-2 pt-2 d-flex flex-row">
          <div className="w-50 mr-1">
            <Button variant="outline" className="w-100" onClick={this.props.cancelChanges}>Cancel</Button>
          </div>
          <div className="w-50 ml-1">
            <Button variant="primary" className="w-100" onClick={this.saveChanges}>Save Changes</Button>
          </div>
        </div>
        <div className="p-2">
          <Button variant="danger" className="w-100" onClick={this.props.deleteSelection}>Delete Pod</Button>
        </div>
      </div>
    )
  }

  renderEditLink = (link) => {
    const { nodes } = this.props.chart;
    const nodeFrom = nodes[link.from.nodeId].label;
    const nodeTo = nodes[link.to.nodeId].label;
    return (
      <div className="h-100 d-flex flex-column">
        <div className="flex-fill">
          <div className="p-2 mb-1">
            <p className="mb-1"><b>From</b></p>
            <h5>{nodeFrom}</h5>
            <p className="mb-1"><b>To</b></p>
            <h5>{nodeTo}</h5>
          </div>
        </div>
        <div className="p-2">
        <Button variant="danger" className="w-100" onClick={this.props.deleteSelection}>Delete Link</Button>
        </div>
      </div>
    )
  }

  renderInstructions = () => {
    return (
      <div className="sidebar-instructions">
        <h2>Select a pod to edit properties</h2>
        <p>or</p>
        <h4>Drag a New Pod:</h4>
        <SidebarItem
          type="Empty Pod"
          ports={{
            port1: {
              id: 'port1',
              type: 'input',
            },
            port2: {
              id: 'port2',
              type: 'output',
            },
          }}
          label="tests"
          properties={{}}
        />

      </div>
    )
  }

  render = () => {
    const { selected, nodes, links } = this.props.chart;
    const hasSelected = Object.keys(selected).length > 0;
    return (
      <div className="flowchart-sidebar d-none d-md-block">
        {
          hasSelected ?
            selected.type === 'link' ?
              this.renderEditLink(links[selected.id], nodes)
              :
              this.renderEditNode(nodes[selected.id])
            :
            this.renderInstructions()
        }
      </div>
    )
  }
}

export default FlowChartSidebar;
