export const legacyYAML = `!Flow
pods:
  segmenter:
    show_exc_info: true
    uses: pods/segment.yml
    read_only: true
  encoder:
    show_exc_info: true
    uses: pods/encode.yml
    polling: any
    shards: $JINA_PARALLEL
    timeout_ready: 600000
    read_only: true
  chunk_idx:
    polling: any
    show_exc_info: true
    uses: pods/chunk.yml
    shards: $JINA_SHARDS
  doc_idx:
    polling: any
    uses: pods/doc.yml
    needs: gateway
  join_all:
    uses: _merge
    needs: [doc_idx,chunk_idx]
`;

export const v1YAML = `!Flow
version: '1'
pods:
  - name: segmenter
    show_exc_info: true
    uses: pods/segment.yml
    read_only: true
  - name: encoder
    show_exc_info: true
    uses: pods/encode.yml
    polling: any
    shards: $JINA_PARALLEL
    timeout_ready: 600000
    read_only: true
  - name: chunk_idx
    polling: any
    show_exc_info: true
    uses: pods/chunk.yml
    shards: $JINA_SHARDS
  - name: doc_idx
    polling: any
    uses: pods/doc.yml
    needs: gateway
  - name: join_all
    uses: _merge
    needs: [doc_idx, chunk_idx]
`;

export const parsedLegacyYaml = {};

export const parsedV1Yaml = {};

export const formattedFlow = {
  offset: { x: 0, y: 0 },
  nodes: {
    gateway: {
      type: "input-output",
      id: "gateway",
      label: "gateway",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: {},
      send_to: {},
      position: { y: 150, x: 250 },
      properties: {},
      depth: 0,
    },
    segmenter: {
      type: "input-output",
      id: "segmenter",
      label: "segmenter",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: { gateway: true },
      send_to: {},
      position: { y: 300, x: 250 },
      properties: {
        show_exc_info: true,
        uses: "pods/segment.yml",
        read_only: true,
      },
      depth: 1,
    },
    encoder: {
      type: "input-output",
      id: "encoder",
      label: "encoder",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: { segmenter: true },
      send_to: {},
      position: { y: 450, x: 250 },
      properties: {
        show_exc_info: true,
        uses: "pods/encode.yml",
        polling: "any",
        shards: "$JINA_PARALLEL",
        timeout_ready: 600000,
        read_only: true,
      },
      depth: 2,
    },
    chunk_idx: {
      type: "input-output",
      id: "chunk_idx",
      label: "chunk_idx",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: { encoder: true },
      send_to: {},
      position: { y: 600, x: 250 },
      properties: {
        polling: "any",
        show_exc_info: true,
        uses: "pods/chunk.yml",
        shards: "$JINA_SHARDS",
      },
      depth: 3,
    },
    doc_idx: {
      type: "input-output",
      id: "doc_idx",
      label: "doc_idx",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: { gateway: true },
      send_to: {},
      position: { y: 300, x: 500 },
      properties: { polling: "any", uses: "pods/doc.yml" },
      depth: 1,
    },
    join_all: {
      type: "input-output",
      id: "join_all",
      label: "join_all",
      ports: {
        inPort: { id: "inPort", type: "input" },
        outPort: { id: "outPort", type: "output" },
      },
      needs: { doc_idx: true, chunk_idx: true },
      send_to: {},
      position: { y: 750, x: 250 },
      properties: { uses: "_merge" },
      depth: 4,
    },
  },
  links: {
    "gateway-to-segmenter": {
      color: "red",
      id: "gateway-to-segmenter",
      from: { nodeId: "gateway", portId: "outPort" },
      to: { nodeId: "segmenter", portId: "inPort" },
    },
    "segmenter-to-encoder": {
      color: "red",
      id: "segmenter-to-encoder",
      from: { nodeId: "segmenter", portId: "outPort" },
      to: { nodeId: "encoder", portId: "inPort" },
    },
    "encoder-to-chunk_idx": {
      color: "red",
      id: "encoder-to-chunk_idx",
      from: { nodeId: "encoder", portId: "outPort" },
      to: { nodeId: "chunk_idx", portId: "inPort" },
    },
    "gateway-to-doc_idx": {
      color: "red",
      id: "gateway-to-doc_idx",
      from: { nodeId: "gateway", portId: "outPort" },
      to: { nodeId: "doc_idx", portId: "inPort" },
    },
    "doc_idx-to-join_all": {
      color: "red",
      id: "doc_idx-to-join_all",
      from: { nodeId: "doc_idx", portId: "outPort" },
      to: { nodeId: "join_all", portId: "inPort" },
    },
    "chunk_idx-to-join_all": {
      color: "red",
      id: "chunk_idx-to-join_all",
      from: { nodeId: "chunk_idx", portId: "outPort" },
      to: { nodeId: "join_all", portId: "inPort" },
    },
  },
  selected: {},
  hovered: {},
  scale: 1,
};
