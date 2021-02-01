const dedaultPods = [
  {},
  {
    name: "reader",
    yaml_path: "pods/extract.yml",
  },
  {
    name: "loader",
    yaml_path: "yaml/craft-load.yml",
    replicas: 3,
    read_only: "true",
  },
  {
    name: "splittor",
    yaml_path: "pods/craft-split.yml",
    replicas: 3,
    read_only: "true",
  },
  {
    name: "encoder",
    yaml_path: "pods/encode.yml",
    replicas: 3,
    timeout_ready: 1200000,
    read_only: "true",
  },
  {
    name: "chunk_indexer",
    yaml_path: "pods/index-chunk.yml",
    replicas: 3,
    separated_workspace: "true",
  },
  {
    name: "doc_indexer",
    yaml_path: "pods/index-doc.yml",
  },
  {
    name: "join_all",
    yaml_path: "_merge",
    read_only: "true",
  },
  {
    name: "ranker",
    yaml_path: "MinRanker",
  },
  {
    name: "flipper",
    yaml_path: "yaml/craft-flip.yml",
    replicas: 3,
    read_only: "true",
  },
  {
    name: "normalizer",
    yaml_path: "yaml/craft-normalize.yml",
    replicas: 3,
    read_only: "true",
  },
  {
    name: "crafter",
    yaml_path: "pods/craft.yml",
    read_only: "true",
  },
  {
    name: "chunk_seg",
    yaml_path: "pods/craft.yml",
    replicas: 3,
  },
];

export default dedaultPods;
