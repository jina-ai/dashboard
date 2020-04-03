
import * as React from 'react'
import { REACT_FLOW_CHART } from '@mrblenny/react-flow-chart'

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render = () => {
    const { label, type, ports, properties } = this.props;
    return (
      <div
        ref={this.ref}
        className="draggable-item"
        draggable={true}
        onDragStart={(event) => {
          event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ label,type, ports, properties, }))
        }}
      >
        {type}
        
      </div>
    )
  }
}

export default SidebarItem;