import React from "react";
import SidebarItem from './SidebarItem';

class FlowChartSidebar extends React.Component {
  render = () => {
    return (
      <div className="flowchart-sidebar d-none d-md-block">
        <p className="p-2 text-center">Add Nodes to Flowchart</p>
        <SidebarItem
          name="Test Node 2"
          type="top/bottom"
          ports={{
            portzx: {
              id: 'portzx',
              type: 'top',
            },
          }}
          properties={{
            custom: 'properssty',
          }}
        />
        <SidebarItem
          name="Test Node 1"
          type="top/bottom"
          ports={{
            port1: {
              id: 'port1',
              type: 'top',
              properties: {
                custom: 'property',
              },
            },
            port2: {
              id: 'port1',
              type: 'bottom',
              properties: {
                custom: 'property',
              },
            },
          }}
          properties={{
            custom: 'property',
          }}
        />
      </div>
    )
  }
}

export default FlowChartSidebar;
