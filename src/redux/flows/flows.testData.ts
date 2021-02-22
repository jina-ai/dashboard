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
  selectedFlowId: "testFlow1",
  flows: {
    testFlow1: {
      name: "Custom Flow 1",
      type: "user-generated",
      isConnected: false,
      flowChart: {
        elements: [
          {
            id: "gateway",
            position: { x: 629, y: 72 },
            type: "default",
          },
          {
            id: "node0",
            position: { x: 200, y: 200 },
            type: "default",
          },
          {
            id: "node1",
            position: { x: 400, y: 400 },
            type: "default",
          },
          {
            id: "link1",
            source: "gateway",
            target: "node0",
          },
          {
            id: "link2",
            source: "node0",
            target: "node1",
          },
        ],
      },
    },
    testFlow2: {
      name: "Custom Flow 2",
      type: "user-generated",
      isConnected: false,
      flowChart: {
        elements: [
          {
            id: "gateway",
            position: { x: 333, y: 312 },
            type: "default",
            data: {
              label: "gateway",
            },
          },
        ],
      },
    },
    flower: {
      name: "Flower Search Query",
      type: "example",
      isConnected: false,
      yaml:
        "!Flow\n    with:\n      read_only: true\n      port_expose: $JINA_PORT\n      board:\n        canvas:\n          gateway:\n            x: 250\n            y: 150\n          loader:\n            x: 250\n            y: 257\n          flipper:\n            x: 252\n            y: 407\n          normalizer:\n            x: 239\n            y: 563\n          encoder:\n            x: 252\n            y: 712\n          chunk_indexer:\n            x: 250\n            y: 872\n          ranker:\n            x: 252\n            y: 1066\n          doc_indexer:\n            x: 253\n            y: 1199\n    pods:\n      gateway: {}\n      loader:\n        uses: yaml/craft-load.yml\n        read_only: true\n        needs: gateway\n      flipper:\n        uses: yaml/craft-flip.yml\n        read_only: true\n        needs: loader\n      normalizer:\n        uses: yaml/craft-normalize.yml\n        read_only: true\n        needs: flipper\n      encoder:\n        uses: $ENCODER\n        timeout_ready: 600000\n        read_only: true\n        needs: normalizer\n      chunk_indexer:\n        uses: yaml/index-chunk.yml\n        separated_workspace: true\n        polling: all\n        uses_reducing: _merge_all\n        needs: encoder\n      ranker:\n        uses: MinRanker\n        needs: chunk_indexer\n      doc_indexer:\n        uses: yaml/index-doc.yml\n        needs: ranker  \n    ",
      flowChart: {
        elements: [
          {
            id: "gateway",
            position: {
              x: 250,
              y: 150,
            },
            type: "input",
            data: {
              label: "gateway",
              needs: [],
              send_to: {},
              properties: {},
              depth: 0,
            },
          },
          {
            id: "loader",
            position: {
              x: 250,
              y: 257,
            },
            type: "default",
            data: {
              label: "loader",
              needs: ["gateway"],
              send_to: {},
              properties: {
                uses: "yaml/craft-load.yml",
                read_only: true,
              },
              depth: 1,
            },
          },
          {
            id: "flipper",
            position: {
              x: 252,
              y: 407,
            },
            type: "default",
            data: {
              label: "flipper",
              needs: ["loader"],
              send_to: {},
              properties: {
                uses: "yaml/craft-flip.yml",
                read_only: true,
              },
              depth: 2,
            },
          },
          {
            id: "normalizer",
            position: {
              x: 239,
              y: 563,
            },
            type: "default",
            data: {
              label: "normalizer",
              needs: ["flipper"],
              send_to: {},
              properties: {
                uses: "yaml/craft-normalize.yml",
                read_only: true,
              },
              depth: 3,
            },
          },
          {
            id: "encoder",
            position: {
              x: 252,
              y: 712,
            },
            type: "default",
            data: {
              label: "encoder",
              needs: ["normalizer"],
              send_to: {},

              properties: {
                uses: "$ENCODER",
                timeout_ready: 600000,
                read_only: true,
              },
              depth: 4,
            },
          },
          {
            id: "chunk_indexer",
            position: {
              x: 250,
              y: 872,
            },
            type: "default",
            data: {
              label: "chunk_indexer",
              needs: ["encoder"],
              send_to: {},
              properties: {
                uses: "yaml/index-chunk.yml",
                separated_workspace: true,
                polling: "all",
                uses_reducing: "_merge_all",
              },
              depth: 5,
            },
          },
          {
            id: "ranker",
            position: {
              x: 252,
              y: 1066,
            },
            type: "default",
            data: {
              label: "ranker",
              needs: ["chunk_indexer"],
              send_to: {},
              properties: {
                uses: "MinRanker",
              },
              depth: 6,
            },
          },
          {
            id: "doc_indexer",
            position: {
              x: 253,
              y: 1199,
            },
            type: "default",
            data: {
              label: "doc_indexer",
              needs: ["ranker"],
              send_to: {},
              properties: {
                uses: "yaml/index-doc.yml",
              },
              depth: 7,
            },
          },
          {
            id: "e-gateway-to-loader",
            source: "gateway",
            target: "loader",
          },
          {
            id: "e-loader-to-flipper",
            source: "loader",
            target: "flipper",
          },
          {
            id: "e-flipper-to-normalizer",
            source: "flipper",
            target: "normalizer",
          },
          {
            id: "e-normalizer-to-encoder",
            source: "normalizer",
            target: "encoder",
          },
          {
            id: "e-encoder-to-chunk_indexer",
            source: "encoder",
            target: "chunk_indexer",
          },
          {
            id: "e-chunk_indexer-to-ranker",
            source: "chunk_indexer",
            target: "ranker",
          },
          {
            id: "e-ranker-to-doc_indexer",
            source: "ranker",
            target: "doc_indexer",
          },
        ],
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
