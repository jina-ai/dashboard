import { FlowArguments, FlowState } from "./flows.types"

export const testFlowState: FlowState = {
  workspaces: {
    testWorkspace1: {
      jina_version: "test_version",
      daemon_id: "test_daemon_id",
      name: "Workspace 1",
      type: "user-generated",
      daemon_endpoint: "",
      isConnected: false,
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
                type: "pod",
              },
              {
                id: "node0",
                position: { x: 200, y: 200 },
                type: "pod",
              },
              {
                id: "node1",
                position: { x: 400, y: 400 },
                type: "pod",
              },
              {
                id: "e-gateway-to-node0",
                source: "gateway",
                target: "node0",
              },
              {
                id: "e-node0-to-node1",
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
                type: "pod",
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
                type: "gateway",
                data: {
                  label: "gateway",
                  depth: 0,
                },
              },
              {
                id: "loader",
                position: {
                  x: 250,
                  y: 257,
                },
                type: "pod",
                data: {
                  label: "loader",
                  needs: ["gateway"],
                  uses: "yaml/craft-load.yml",
                  read_only: true,
                  depth: 1,
                },
              },
              {
                id: "flipper",
                position: {
                  x: 252,
                  y: 407,
                },
                type: "pod",
                data: {
                  label: "flipper",
                  needs: ["loader"],
                  uses: "yaml/craft-flip.yml",
                  read_only: true,
                  depth: 2,
                },
              },
              {
                id: "normalizer",
                position: {
                  x: 239,
                  y: 563,
                },
                type: "pod",
                data: {
                  label: "normalizer",
                  needs: ["flipper"],
                  uses: "yaml/craft-normalize.yml",
                  read_only: true,
                  depth: 3,
                },
              },
              {
                id: "encoder",
                position: {
                  x: 252,
                  y: 712,
                },
                type: "pod",
                data: {
                  label: "encoder",
                  needs: ["normalizer"],
                  uses: "$ENCODER",
                  timeout_ready: 600000,
                  read_only: true,
                  depth: 4,
                },
              },
              {
                id: "chunk_indexer",
                position: {
                  x: 250,
                  y: 872,
                },
                type: "pod",
                data: {
                  label: "chunk_indexer",
                  needs: ["encoder"],
                  uses: "yaml/index-chunk.yml",
                  separated_workspace: true,
                  polling: "all",
                  uses_reducing: "_merge_all",
                  depth: 5,
                },
              },
              {
                id: "ranker",
                position: {
                  x: 252,
                  y: 1066,
                },
                type: "pod",
                data: {
                  label: "ranker",
                  needs: ["chunk_indexer"],
                  uses: "MinRanker",
                  depth: 6,
                },
              },
              {
                id: "doc_indexer",
                position: {
                  x: 253,
                  y: 1199,
                },
                type: "pod",
                data: {
                  label: "doc_indexer",
                  needs: ["ranker"],
                  uses: "yaml/index-doc.yml",
                  depth: 7,
                },
              },
              {
                id: "e-gateway-to-loader",
                source: "gateway",
                target: "loader",
                type: "step",
              },
              {
                id: "e-loader-to-flipper",
                source: "loader",
                target: "flipper",
                type: "step",
              },
              {
                id: "e-flipper-to-normalizer",
                source: "flipper",
                target: "normalizer",
                type: "step",
              },
              {
                id: "e-normalizer-to-encoder",
                source: "normalizer",
                target: "encoder",
                type: "step",
              },
              {
                id: "e-encoder-to-chunk_indexer",
                source: "encoder",
                target: "chunk_indexer",
                type: "step",
              },
              {
                id: "e-chunk_indexer-to-ranker",
                source: "chunk_indexer",
                target: "ranker",
                type: "step",
              },
              {
                id: "e-ranker-to-doc_indexer",
                source: "ranker",
                target: "doc_indexer",
                type: "step",
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
      files: [],
      flowArguments: {
        pod: [],
        pea: [],
        flow: [],
      },
    },
    testWorkspace2: {
      jina_version: "test_version",
      daemon_id: "test_daemon_id",
      name: "Workspace 2",
      type: "user-generated",
      daemon_endpoint: "",
      isConnected: false,
      selectedFlowId: "",
      flows: {},
      files: [],
      flowArguments: {
        pod: [],
        pea: [],
        flow: [],
      },
    },
  },
  selectedWorkspaceId: "testWorkspace1",
}

export const testFlowArguments: FlowArguments = {
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
