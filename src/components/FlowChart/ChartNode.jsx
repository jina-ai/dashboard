import React from "react";
import {Badge} from "react-bootstrap";

class ChartNode extends React.Component {
  getPropertiesString = () =>{
    const properties = this.props.node.properties || {};
    let str = ''
    Object.keys(properties).map(propId=>{
      str = str.concat(`pod-${propId}-${properties[propId]} `);
    })
    return str;
  }
  render = () => {
    const {label,type,properties} = this.props.node;
    const propSTR = this.getPropertiesString();
    return (
      <div className={`chart-node ${propSTR}`}>
        <p className="m-1"><b>{label||<span className="text-warning">Unnamed Pod</span>}</b><Badge variant="primary" className="ml-2 mt-1">{properties.replicas}</Badge></p>
      </div>
    )
  }
}

export default ChartNode;
