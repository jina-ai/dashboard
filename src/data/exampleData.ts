import { defaultFlowArguments } from "../redux/flows/flows.constants"
import { ExampleFlows, Workspaces } from "../redux/flows/flows.types"

export const exampleWorkspaces: Workspaces = {
  example_workspace_pokedex: {
    jina_version: "latest",
    type: "example",
    name: "Pokedex Workspace",
    selectedFlowId: "example_flow_pokedex",
    flowArguments: defaultFlowArguments,
    isConnected: false,
    daemon_endpoint: null,
    daemon_id: null,
    files: [],
  },
  example_workspace_flower: {
    jina_version: "latest",
    type: "example",
    name: "Flower Workspace",
    selectedFlowId: "example_flow_flower",
    flowArguments: defaultFlowArguments,
    isConnected: false,
    daemon_endpoint: null,
    daemon_id: null,
    files: [],
  },
  example_workspace_southpark: {
    jina_version: "latest",
    type: "example",
    name: "Southpark Workspace",
    selectedFlowId: "example_flow_southpark",
    flowArguments: defaultFlowArguments,
    isConnected: false,
    daemon_endpoint: null,
    daemon_id: null,
    files: [],
  },
}

export const exampleFlows: ExampleFlows = {
  example_flow_pokedex: {
    workspaceId: "pokedex",
    name: "Pokedex Query",
    yaml: `!Flow
      with:
        read_only: true
        rest_api: true
        port_expose: $JINA_PORT
        board:
          canvas:
            gateway:
              x: 250
              y: 150
            chunk_seg:
              x: 250
              y: 268
            tf_encode:
              x: 250
              y: 420
            chunk_idx:
              x: 250
              y: 600
            ranker:
              x: 250
              y: 836
            doc_idx:
              x: 249
              y: 985
      pods:
        gateway: {}
        chunk_seg:
          uses: pods/craft.yml
          parallel: $PARALLEL
          needs: gateway
        tf_encode:
          uses: pods/encode.yml
          parallel: $PARALLEL
          timeout_ready: 600000
          needs: chunk_seg
        chunk_idx:
          uses: pods/chunk.yml
          separated_workspace: true
          polling: all
          uses_reducing: _merge_all
          timeout_ready: 100000
          needs: tf_encode
        ranker:
          uses: BiMatchRanker
          needs: chunk_idx
        doc_idx:
          uses: pods/doc.yml
          needs: ranker
      
      `,
  },
  example_flow_flower: {
    workspaceId: "flower",
    name: "Flower Query",
    yaml: `!Flow
  with:
    read_only: true
    port_expose: $JINA_PORT
    board:
      canvas:
        gateway:
          x: 250
          y: 150
        loader:
          x: 250
          y: 257
        flipper:
          x: 252
          y: 407
        normalizer:
          x: 239
          y: 563
        encoder:
          x: 252
          y: 712
        chunk_indexer:
          x: 250
          y: 872
        ranker:
          x: 252
          y: 1066
        doc_indexer:
          x: 253
          y: 1199
  pods:
    gateway: {}
    loader:
      uses: yaml/craft-load.yml
      read_only: true
      needs: gateway
    flipper:
      uses: yaml/craft-flip.yml
      read_only: true
      needs: loader
    normalizer:
      uses: yaml/craft-normalize.yml
      read_only: true
      needs: flipper
    encoder:
      uses: $ENCODER
      timeout_ready: 600000
      read_only: true
      needs: normalizer
    chunk_indexer:
      uses: yaml/index-chunk.yml
      separated_workspace: true
      polling: all
      uses_reducing: _merge_all
      needs: encoder
    ranker:
      uses: MinRanker
      needs: chunk_indexer
    doc_indexer:
      uses: yaml/index-doc.yml
      needs: ranker  
  `,
  },
  example_flow_southpark: {
    workspaceId: "southpark",
    name: "Southpark Query",
    yaml: `!Flow
with:
  read_only: true
  port_expose: $JINA_PORT
  board:
    canvas:
      gateway:
        x: 254
        y: 147
      splittor:
        x: 254
        y: 270
      encoder:
        x: 254
        y: 448
      chunk_indexer:
        x: 251
        y: 645
      ranker:
        x: 255
        y: 862
      doc_indexer:
        x: 256
        y: 1002
pods:
  gateway: {}
  splittor:
    uses: pods/craft-split.yml
    parallel: $PARALLEL
    read_only: true
    needs: gateway
  encoder:
    uses: pods/encode.yml
    parallel: $PARALLEL
    timeout_ready: 60000
    read_only: true
    needs: splittor
  chunk_indexer:
    uses: pods/index-chunk.yml
    separated_workspace: true
    polling: all
    reducing_uses: _merge_all
    needs: encoder
  ranker:
    uses: MinRanker
    needs: chunk_indexer
  doc_indexer:
    uses: pods/index-doc.yml
    needs: ranker
`,
  },
}
