import { FlowArguments, FlowState } from "./flows.types"

export const testFlowState: FlowState = {
  rerender: false,
  flowArguments: {
    pod: [],
    pea: [],
    flow: [],
    version: "",
  },
  tooltipConfig: {
    tooltipsGlobal: {
      showTooltip: true,
      toogleOffWhenClicked: "global",
      text: "Hold Shift and click to select multiple nodes",
    },
  },
  selectedFlow: "testFlow1",
  flows: {
    testFlow1: {
      name: "Custom Flow 1",
      type: "user-generated",
      isConnected: false,
      flow: {
        selected: {},
        hovered: {},
        scale: 1,
        nodes: {
          gateway: {
            id: "gateway",
            type: "input-output",
            label: "gateway",
            ports: {
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            properties: {},
            position: { x: 629, y: 72 },
          },
          node0: {
            id: "node0",
            type: "input-output",
            label: "node0",
            ports: {
              outPort: {
                id: "outPort",
                type: "output",
              },
              inPort: {
                id: "inPort",
                type: "input",
              },
            },
            properties: {},
            position: { x: 200, y: 200 },
          },
          node1: {
            id: "node1",
            type: "input-output",
            label: "node1",
            ports: {
              outPort: {
                id: "outPort",
                type: "output",
              },
              inPort: {
                id: "inPort",
                type: "input",
              },
            },
            properties: {},
            position: { x: 400, y: 400 },
          },
        },
        links: {
          link1: {
            id: "link1",
            from: {
              nodeId: "gateway",
              portId: "outPort",
            },
            to: {
              nodeId: "node0",
              portId: "inPort",
            },
          },
          link2: {
            id: "link2",
            from: {
              nodeId: "node0",
              portId: "outPort",
            },
            to: {
              nodeId: "node1",
              portId: "inPort",
            },
          },
        },
        offset: { x: 0, y: 0 },
      },
    },
    testFlow2: {
      name: "Custom Flow 2",
      type: "user-generated",
      isConnected: false,
      flow: {
        selected: {},
        hovered: {},
        scale: 1,
        nodes: {
          gateway: {
            id: "gateway",
            type: "input-output",
            label: "gateway",
            ports: {
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            properties: {},
            position: { x: 333, y: 312 },
          },
        },
        links: {},
        offset: { x: 312, y: 123 },
      },
    },
    flower: {
      name: "Flower Search Query",
      type: "example",
      isConnected: false,
      yaml:
        "!Flow\n    with:\n      read_only: true\n      port_expose: $JINA_PORT\n      board:\n        canvas:\n          gateway:\n            x: 250\n            y: 150\n          loader:\n            x: 250\n            y: 257\n          flipper:\n            x: 252\n            y: 407\n          normalizer:\n            x: 239\n            y: 563\n          encoder:\n            x: 252\n            y: 712\n          chunk_indexer:\n            x: 250\n            y: 872\n          ranker:\n            x: 252\n            y: 1066\n          doc_indexer:\n            x: 253\n            y: 1199\n    pods:\n      gateway: {}\n      loader:\n        uses: yaml/craft-load.yml\n        read_only: true\n        needs: gateway\n      flipper:\n        uses: yaml/craft-flip.yml\n        read_only: true\n        needs: loader\n      normalizer:\n        uses: yaml/craft-normalize.yml\n        read_only: true\n        needs: flipper\n      encoder:\n        uses: $ENCODER\n        timeout_ready: 600000\n        read_only: true\n        needs: normalizer\n      chunk_indexer:\n        uses: yaml/index-chunk.yml\n        separated_workspace: true\n        polling: all\n        uses_reducing: _merge_all\n        needs: encoder\n      ranker:\n        uses: MinRanker\n        needs: chunk_indexer\n      doc_indexer:\n        uses: yaml/index-doc.yml\n        needs: ranker  \n    ",
      flow: {
        offset: {
          x: 0,
          y: 0,
        },
        nodes: {
          gateway: {
            id: "gateway",
            type: "input-output",
            label: "gateway",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {},
            send_to: {},
            position: {
              x: 250,
              y: 150,
            },
            properties: {},
            depth: 0,
          },
          loader: {
            id: "loader",
            type: "input-output",
            label: "loader",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              gateway: true,
            },
            send_to: {},
            position: {
              x: 250,
              y: 257,
            },
            properties: {
              uses: "yaml/craft-load.yml",
              read_only: true,
            },
            depth: 1,
          },
          flipper: {
            id: "flipper",
            type: "input-output",
            label: "flipper",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              loader: true,
            },
            send_to: {},
            position: {
              x: 252,
              y: 407,
            },
            properties: {
              uses: "yaml/craft-flip.yml",
              read_only: true,
            },
            depth: 2,
          },
          normalizer: {
            id: "normalizer",
            type: "input-output",
            label: "normalizer",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              flipper: true,
            },
            send_to: {},
            position: {
              x: 239,
              y: 563,
            },
            properties: {
              uses: "yaml/craft-normalize.yml",
              read_only: true,
            },
            depth: 3,
          },
          encoder: {
            id: "encoder",
            type: "input-output",
            label: "encoder",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              normalizer: true,
            },
            send_to: {},
            position: {
              x: 252,
              y: 712,
            },
            properties: {
              uses: "$ENCODER",
              timeout_ready: 600000,
              read_only: true,
            },
            depth: 4,
          },
          chunk_indexer: {
            id: "chunk_indexer",
            type: "input-output",
            label: "chunk_indexer",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              encoder: true,
            },
            send_to: {},
            position: {
              x: 250,
              y: 872,
            },
            properties: {
              uses: "yaml/index-chunk.yml",
              separated_workspace: true,
              polling: "all",
              uses_reducing: "_merge_all",
            },
            depth: 5,
          },
          ranker: {
            id: "ranker",
            type: "input-output",
            label: "ranker",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              chunk_indexer: true,
            },
            send_to: {},
            position: {
              x: 252,
              y: 1066,
            },
            properties: {
              uses: "MinRanker",
            },
            depth: 6,
          },
          doc_indexer: {
            id: "doc_indexer",
            type: "input-output",
            label: "doc_indexer",
            ports: {
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            },
            needs: {
              ranker: true,
            },
            send_to: {},
            position: {
              x: 253,
              y: 1199,
            },
            properties: {
              uses: "yaml/index-doc.yml",
            },
            depth: 7,
          },
        },
        links: {
          "gateway-to-loader": {
            color: "red",
            id: "gateway-to-loader",
            from: {
              nodeId: "gateway",
              portId: "outPort",
            },
            to: {
              nodeId: "loader",
              portId: "inPort",
            },
          },
          "loader-to-flipper": {
            color: "red",
            id: "loader-to-flipper",
            from: {
              nodeId: "loader",
              portId: "outPort",
            },
            to: {
              nodeId: "flipper",
              portId: "inPort",
            },
          },
          "flipper-to-normalizer": {
            color: "red",
            id: "flipper-to-normalizer",
            from: {
              nodeId: "flipper",
              portId: "outPort",
            },
            to: {
              nodeId: "normalizer",
              portId: "inPort",
            },
          },
          "normalizer-to-encoder": {
            color: "red",
            id: "normalizer-to-encoder",
            from: {
              nodeId: "normalizer",
              portId: "outPort",
            },
            to: {
              nodeId: "encoder",
              portId: "inPort",
            },
          },
          "encoder-to-chunk_indexer": {
            color: "red",
            id: "encoder-to-chunk_indexer",
            from: {
              nodeId: "encoder",
              portId: "outPort",
            },
            to: {
              nodeId: "chunk_indexer",
              portId: "inPort",
            },
          },
          "chunk_indexer-to-ranker": {
            color: "red",
            id: "chunk_indexer-to-ranker",
            from: {
              nodeId: "chunk_indexer",
              portId: "outPort",
            },
            to: {
              nodeId: "ranker",
              portId: "inPort",
            },
          },
          "ranker-to-doc_indexer": {
            color: "red",
            id: "ranker-to-doc_indexer",
            from: {
              nodeId: "ranker",
              portId: "outPort",
            },
            to: {
              nodeId: "doc_indexer",
              portId: "inPort",
            },
          },
        },
        selected: {},
        hovered: {},
        scale: 1,
        with: {
          board: {
            canvas: {
              chunk_indexer: {
                x: 250,
                y: 872,
              },
              doc_indexer: {
                x: 253,
                y: 1199,
              },
              encoder: {
                x: 252,
                y: 712,
              },
              flipper: {
                x: 252,
                y: 407,
              },
              gateway: {
                x: 250,
                y: 150,
              },
              loader: {
                x: 250,
                y: 257,
              },
              normalizer: {
                x: 239,
                y: 563,
              },
              ranker: {
                x: 252,
                y: 1066,
              },
            },
          },
          port_expose: "$JINA_PORT",
          read_only: true,
        },
      },
    },
  },
}

export const testFlowArguments: FlowArguments = {
  version: "1",
  pod: [
    {
      defaultValue: "any",
      description: "test_description_1",
      name: "test_name_1",
      type: "string",
    },
  ],
  pea: [
    {
      defaultValue: 39399,
      description: "test_description_2",
      name: "test_name_2",
      type: "integer",
    },
  ],
  flow: [
    {
      defaultValue: true,
      description: "test_description_3",
      name: "test_name_3",
      type: "boolean",
    },
  ],
}
