const flow1 = {
  parsed: {
    offset: {
      x: 0,
      y: 0,
    },
    nodes: {
      chunk_seg: {
        id: "chunk_seg",
        label: "chunk_seg",
        ports: {
          inPort: {
            id: "inPort",
            type: "input",
            position: {
              x: 104.5,
              y: -3,
            },
          },
          outPort: {
            id: "outPort",
            type: "output",
            position: {
              x: 104.5,
              y: 95,
            },
          },
        },
        needs: {},
        send_to: {},
        position: {
          y: 150,
          x: 250,
        },
        properties: {
          yaml_path: "$RESOURCE_DIR/helloworld.crafter.yml",
          replicas: 2,
          read_only: true,
        },
        depth: 0,
        size: {
          width: 209,
          height: 92,
        },
      },
      doc_idx: {
        id: "doc_idx",
        label: "doc_idx",
        ports: {
          inPort: {
            id: "inPort",
            type: "input",
            position: {
              x: 100,
              y: -3,
            },
          },
          outPort: {
            id: "outPort",
            type: "output",
            position: {
              x: 100,
              y: 58,
            },
          },
        },
        needs: {
          chunk_seg: true,
        },
        send_to: {},
        position: {
          y: 300,
          x: 250,
        },
        properties: {
          yaml_path: "$RESOURCE_DIR/helloworld.indexer.doc.yml",
        },
        depth: 1,
        size: {
          width: 200,
          height: 55,
        },
      },
      encode: {
        id: "encode",
        label: "encode",
        ports: {
          inPort: {
            id: "inPort",
            type: "input",
            position: {
              x: 100,
              y: -3,
            },
          },
          outPort: {
            id: "outPort",
            type: "output",
            position: {
              x: 100,
              y: 61,
            },
          },
        },
        needs: {
          chunk_seg: true,
        },
        send_to: {},
        position: {
          y: 300,
          x: 500,
        },
        properties: {
          yaml_path: "$RESOURCE_DIR/helloworld.encoder.yml",
          replicas: 2,
        },
        depth: 1,
        size: {
          width: 200,
          height: 58,
        },
      },
      chunk_idx: {
        id: "chunk_idx",
        label: "chunk_idx",
        ports: {
          inPort: {
            id: "inPort",
            type: "input",
            position: {
              x: 100,
              y: -3,
            },
          },
          outPort: {
            id: "outPort",
            type: "output",
            position: {
              x: 100,
              y: 95,
            },
          },
        },
        needs: {
          encode: true,
        },
        send_to: {},
        position: {
          y: 450,
          x: 250,
        },
        properties: {
          yaml_path: "$RESOURCE_DIR/helloworld.indexer.chunk.yml",
          replicas: 2,
          separated_workspace: true,
        },
        depth: 2,
        size: {
          width: 200,
          height: 92,
        },
      },
      join_all: {
        id: "join_all",
        label: "join_all",
        ports: {
          inPort: {
            id: "inPort",
            type: "input",
            position: {
              x: 100,
              y: -3,
            },
          },
          outPort: {
            id: "outPort",
            type: "output",
            position: {
              x: 100,
              y: 92,
            },
          },
        },
        needs: {
          doc_idx: true,
          chunk_idx: true,
        },
        send_to: {},
        position: {
          y: 600,
          x: 250,
        },
        properties: {
          yaml_path: "_merge",
          read_only: true,
        },
        depth: 3,
        size: {
          width: 200,
          height: 89,
        },
      },
    },
    links: {
      "chunk_seg-to-doc_idx": {
        color: "red",
        id: "chunk_seg-to-doc_idx",
        from: {
          nodeId: "chunk_seg",
          portId: "outPort",
        },
        to: {
          nodeId: "doc_idx",
          portId: "inPort",
        },
      },
      "chunk_seg-to-encode": {
        color: "red",
        id: "chunk_seg-to-encode",
        from: {
          nodeId: "chunk_seg",
          portId: "outPort",
        },
        to: {
          nodeId: "encode",
          portId: "inPort",
        },
      },
      "encode-to-chunk_idx": {
        color: "red",
        id: "encode-to-chunk_idx",
        from: {
          nodeId: "encode",
          portId: "outPort",
        },
        to: {
          nodeId: "chunk_idx",
          portId: "inPort",
        },
      },
      "doc_idx-to-join_all": {
        color: "red",
        id: "doc_idx-to-join_all",
        from: {
          nodeId: "doc_idx",
          portId: "outPort",
        },
        to: {
          nodeId: "join_all",
          portId: "inPort",
        },
      },
      "chunk_idx-to-join_all": {
        color: "red",
        id: "chunk_idx-to-join_all",
        from: {
          nodeId: "chunk_idx",
          portId: "outPort",
        },
        to: {
          nodeId: "join_all",
          portId: "inPort",
        },
      },
    },
    selected: {},
    hovered: {},
    with: {
      logserver: "$WITH_LOGSERVER",
      compress_hwm: 1024,
      board: {
        canvas: {
          chunk_seg: {
            x: 250,
            y: 150,
          },
          doc_idx: {
            x: 250,
            y: 300,
          },
          encode: {
            x: 500,
            y: 300,
          },
          chunk_idx: {
            x: 250,
            y: 450,
          },
          join_all: {
            x: 250,
            y: 600,
          },
        },
      },
    },
  },
  yaml: `!Flow
with:
  logserver: $WITH_LOGSERVER
  compress_hwm: 1024
  board:
    canvas:
      chunk_seg:
        x: 250
        y: 150
      doc_idx:
        x: 250
        y: 300
      encode:
        x: 500
        y: 300
      chunk_idx:
        x: 250
        y: 450
      join_all:
        x: 250
        y: 600
pods:
  chunk_seg:
    yaml_path: $RESOURCE_DIR/helloworld.crafter.yml
    replicas: 2
    read_only: false
  doc_idx:
    yaml_path: $RESOURCE_DIR/helloworld.indexer.doc.yml
    needs: chunk_seg
  encode:
    yaml_path: $RESOURCE_DIR/helloworld.encoder.yml
    replicas: 2
    needs: chunk_seg
  chunk_idx:
    yaml_path: $RESOURCE_DIR/helloworld.indexer.chunk.yml
    replicas: 2
    separated_workspace: false
    needs: encode
  join_all:
    yaml_path: _merge
    read_only: false
    needs:
      - doc_idx
      - chunk_idx
`,
};

export { flow1 };
