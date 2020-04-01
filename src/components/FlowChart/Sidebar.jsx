import React from "react";
import SidebarItem from './SidebarItem';
import { Button, FormControl, Row, Col,ButtonGroup } from 'react-bootstrap';
import { Store } from "../../flux";

class FlowChartSidebar extends React.Component {

  state = {
    availableProperties: Store.getAvailableProperties()
  }

  renderEditNode = (node) => {
    const { availableProperties } = this.state;
    return (
      <div className="h-100 d-flex flex-column">
        <div className="p-2 mb-1">
          <p className="mb-1"><b>Pod Label</b></p>
          <input spellCheck={false} className="form-control pod-name-input" value={node.id} />
        </div>
        <p className="mb-1 px-2"><b>Properties</b></p>
        <div className="property-table flex-fill mx-2">
          {
            Object.keys(node.properties).map(id => {
              const value = node.properties[id];
              return (
                <div className="property-item mb-2">
                  <p className="property-label mb-1">{id}</p>
                  <FormControl spellCheck={false} value={value} className="property-value-input" />
                </div>

              )
            })
          }
          {
            availableProperties.map(property => {
              if (!node.properties[property.name])
                return (
                  <div className="property-item mb-2">
                    <p className="property-label mb-1">{property.name}</p>
                    <FormControl spellCheck={false} placeHolder={property.type} className="property-value-input"></FormControl>
                  </div>
                )
            })
          }
        </div>

        <div className="p-2 d-flex flex-row">
          <div className="w-50 mr-1">
          <Button variant="outline" className="w-100">Cancel</Button>
          </div>
          <div className="w-50 ml-1">
          <Button variant="primary" className="w-100">Save Changes</Button>
          </div>
        </div>
      </div>
    )
  }

  renderEditLink = (link) => {
    return (
      <div>
        <h2>Edit link</h2>
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
              this.renderEditLink(links[selected.id])
              :
              this.renderEditNode(nodes[selected.id])
            :
            'Select a pod to edit properties'
        }
      </div>
    )
  }
}

export default FlowChartSidebar;
