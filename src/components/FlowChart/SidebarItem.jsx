import * as React from "react";
import { REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import ChartNode from "./ChartNode";

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render = () => {
    const { label, ports, properties } = this.props;
    return (
      <div
        ref={this.ref}
        className="mb-3 draggable-container"
        draggable={true}
        onDragStart={(event) => {
          event.dataTransfer.setData(
            REACT_FLOW_CHART,
            JSON.stringify({ label, ports, properties, type: "hello world" })
          );
        }}
      >
        <ChartNode node={{ properties }} />
      </div>
    );
  };
}

export default SidebarItem;
