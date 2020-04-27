import React from "react";
import { Badge } from "react-bootstrap";

class ChartNode extends React.Component {
  getPropertiesString = () => {
    const properties = this.props.node.properties || {};
    let str = ''
    Object.keys(properties).map(propId => {
      str = str.concat(`pod-${propId}-${properties[propId]} `);
    })
    return str;
  }
  getIcons = () => {
    const { properties } = this.props.node;
    let icons = [];
    Object.keys(properties).map(prop => {
      if (prop == 'image' && properties[prop])
        icons.push(<span className="fab fa-docker mx-1" />)
      if (prop == 'num_part' && properties[prop])
        icons.push(<span className="fas fa-code-branch mx-1" />)
      if (prop == 'read_only' && properties[prop])
        icons.push(<span className="fas fa-lock mx-1" />)
      if (prop == 'host' && properties[prop])
        icons.push(<span className="fas fa-network-wired mx-1" />)
      if (prop == 'separated_workspace' && properties[prop])
        icons.push(<span className="fas fa-columns mx-1" />)
      if (prop == 'py_modules' && properties[prop])
        icons.push(<span className="fab fa-python mx-1" />)
    })
    return icons;
  }
  render = () => {
    const { label, type, properties } = this.props.node;
    const propSTR = this.getPropertiesString();
    const icons = this.getIcons();
    const isSpecial = Object.keys(properties).length>0;
    const isGateway = label==='gateway';
    return (
      <div className={`chart-node ${isSpecial?'special':''} ${properties.replicas ? 'stacked' : ''} ${isGateway ? 'gateway' : ''}`}>
        <div className="p-2">
          <p className="m-1"><b>{label || <span className="text-warning">Unnamed Pod</span>}</b><Badge variant="primary" className="ml-2 mt-1">{properties.replicas}</Badge></p>
        </div>
        {
          icons.length > 0 &&
          <div className="node-icons">
            {icons}
          </div>
        }
      </div>
    )
  }
}

export default ChartNode;
