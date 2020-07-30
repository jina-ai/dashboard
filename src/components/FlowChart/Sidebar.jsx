import React from "react";
import SidebarItem from './SidebarItem';
import { Button, FormControl,Card} from 'react-bootstrap';
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
    console.log('setInititailNode:',node);
    const properties = {};
    const newProperties = {};
    const label = node.label;

    Object.keys(node.properties).map(key => {
      properties[key] = node.properties[key];
    });

    this.setState({ node: { label, id: node.id, properties, newProperties } });
  }

  updateLabel = (label) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.label = label;
      return { node };
    },this.saveChanges);
  }

  updateExistingValue = (prop, value) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.properties[prop] = value;
      return { node };
    },this.saveChanges);
  }

  updateNewValue = (prop, value) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.newProperties[prop] = value;
      return { node };
    },this.saveChanges);
  }

  saveChanges = () => {
    const { node } = this.state;
    this.props.updateNode(node);
    console.log('save changes: ',node)
  }

  renderEditNode = () => {
    const { availableProperties, node } = this.state;
    console.log('rendering')
    console.log('label:',node.label)
    let label = typeof node.label === 'undefined' ? node.properties.name : node.label || ''
    return (
      <div className="h-100 d-flex flex-column">
        <div className="p-2 mb-1">
          <p className="mb-1"><b>Pod Name</b></p>
          <FormControl spellCheck={false} value={label} onChange={(e) => this.updateLabel(e.target.value)} className="pod-name-input" />
        </div>
        <p className="mb-1 px-2"><b>Properties</b></p>
        <div className="property-table flex-fill mx-2">
          {
            Object.keys(node.properties).map(prop => {
              const value = node.properties[prop];
              if(prop==='name')
                return;
              return (
                <div key={prop} className="property-item mb-2">
                  <p className="property-label mb-1">{prop}</p>
                  <FormControl spellCheck={false} value={value || ""} onChange={(e) => this.updateExistingValue(prop, e.target.value)} className="property-value-input" />
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
          <p className="mb-1"><b>Type</b></p>
            <h5>Connection</h5>
            <p className="mb-1"><b>From</b></p>
            <h5>{nodeFrom}</h5>
            <p className="mb-1"><b>To</b></p>
            <h5>{nodeTo}</h5>
          </div>
        </div>
        <div className="p-2">
        <Button variant="danger" className="w-100" onClick={this.props.deleteSelection}>Delete Connection</Button>
        </div>
      </div>
    )
  }

  renderPodMenu = () => {
    return (
      <div className="p-3 text-muted">
        <SidebarItem
          ports={{
            inPort: {
              id: 'inPort',
              type: 'input',
            },
            outPort: {
              id: 'outPort',
              type: 'output',
            },
          }}
          label="Hello World"
          properties={{}}
        />
        <SidebarItem
          ports={{
            inPort: {
              id: 'inPort',
              type: 'input',
            },
            outPort: {
              id: 'outPort',
              type: 'output',
            },
          }}
          label="hello"
          properties={{name:"Indexer", replicas: 3}}
        />
      </div>
    )
  }

  render = () => {
    const { selected, nodes, links } = this.props.chart;
    const hasSelected = Object.keys(selected).length > 0;
    return (
      <Card className="flowchart-sidebar mb-4">
        {
          hasSelected ?
            selected.type === 'link' ?
              this.renderEditLink(links[selected.id], nodes)
              :
              this.renderEditNode(nodes[selected.id])
            :
            this.renderPodMenu()
        }
      </Card>
    )
  }
}

export default FlowChartSidebar;
