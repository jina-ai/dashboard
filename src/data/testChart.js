module.exports = {
  offset: {
    x: 0,
    y: 0,
  },
  nodes: {
    
    node2: {
      id: 'node2',
      type: 'input-output',
      position: {
        x: 300,
        y: 300,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node1: {
      id: 'node1',
      position: {
        x: 300,
        y: 100,
      },
      ports: {
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node3: {
      id: 'node3',
      type: 'input-output',
      position: {
        x: 100,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node4: {
      id: 'node4',
      type: 'input-output',
      position: {
        x: 500,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node5: {
      id: 'node5',
      type: 'input-output',
      position: {
        x: 300,
        y: 700,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
      },
    },
  },
  links: {
    link1: {
      id: 'link1',
      from: {
        nodeId: 'node1',
        portId: 'port2',
      },
      to: {
        nodeId: 'node2',
        portId: 'port1',
      },
      properties: {
        label: 'example link label',
      },
    },
    link2: {
      id: 'link2',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node3',
        portId: 'port1',
      },
      properties: {
        label: 'another example link label',
      },
    },
    link3: {
      id: 'link3',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node4',
        portId: 'port1',
      },
    },
    link4: {
      id: 'link4',
      from: {
        nodeId: 'node3',
        portId: 'port2',
      },
      to: {
        nodeId: 'node5',
        portId: 'port1',
      },
    },
    link5: {
      id: 'link5',
      from: {
        nodeId: 'node4',
        portId: 'port2',
      },
      to: {
        nodeId: 'node5',
        portId: 'port1',
      },
    },
  },
  selected: {},
  hovered: {},
}