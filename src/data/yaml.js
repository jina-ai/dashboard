module.exports = {
  flow1: `!Flow
  with:
    board:
      canvas:
        chunk_seg:
          x: 862
          y: 138
        encode1:
          x: 198
          y: 311
        encode2:
          x: 428
          y: 309
        pod_3:
          x: 652
          y: 308
        pod_4:
          x: 863
          y: 307
        pod_5:
          x: 1084
          y: 309
        pod_6:
          x: 1305
          y: 311
        connector:
          x: 861
          y: 477
        midleft_1:
          x: 530
          y: 601
        midright_1:
          x: 1210
          y: 598
        midleft_2:
          x: 331
          y: 739
        midright_2:
          x: 1399
          y: 733
        pod_left:
          x: 508
          y: 862
        pod_right:
          x: 1226
          y: 865
        end_pod:
          x: 870
          y: 1083.6666641235352
        pod_7:
          x: 1526
          y: 311.66666412353516
  pods:
    gateway:
    chunk_seg:
      replicas: 3
    encode1:
      replicas: 2
      needs: chunk_seg
    encode2:
      replicas: 2
      needs: chunk_seg
    pod_3:
      needs: chunk_seg
    pod_4:
      needs: chunk_seg
    pod_5:
      needs: chunk_seg
    pod_6:
      needs: chunk_seg
    connector:
      needs:
        - encode1
        - encode2
        - pod_3
        - pod_4
        - pod_5
        - pod_6
        - pod_7
    midleft_1:
      needs: connector
    midright_1:
      needs: connector
    midleft_2:
      needs: midleft_1
    midright_2:
      needs: midright_1
    pod_left:
      needs:
        - midleft_2
        - midleft_1
        - connector
    pod_right:
      needs:
        - midright_2
        - midright_1
        - connector
    end_pod:
      needs:
        - pod_left
        - pod_right
    pod_7:
      needs: chunk_seg
  `,
  pokedex: `!Flow
  with:
    read_only: true  # better add this in the query time
    rest_api: true
    port_expose: $JINA_PORT
  pods:
    chunk_seg:
      uses: pods/craft.yml
      parallel: $PARALLEL
    tf_encode:
      uses: pods/encode.yml
      parallel: $PARALLEL
      timeout_ready: 600000
    chunk_idx:
      uses: pods/chunk.yml
      shards: $SHARDS
      separated_workspace: true
      polling: all
      uses_reducing: _merge_all
      timeout_ready: 100000 # larger timeout as in query time will read all the data
    ranker:
      uses: BiMatchRanker
    doc_idx:
      uses: pods/doc.yml
  `,
  flower: `!Flow
  with:
    read_only: true
    port_expose: $JINA_PORT
  pods:
    loader:
      uses: yaml/craft-load.yml
      read_only: true
    flipper:
      uses: yaml/craft-flip.yml
      read_only: true
    normalizer:
      uses: yaml/craft-normalize.yml
      read_only: true
    encoder:
      uses: $ENCODER
      timeout_ready: 600000
      read_only: true
    chunk_indexer:
      uses: yaml/index-chunk.yml
      separated_workspace: true
      polling: all
      uses_reducing: _merge_all
    ranker:
      uses: MinRanker
    doc_indexer:
      uses: yaml/index-doc.yml
  `,
  southpark: `!Flow
  with:
    read_only: true
    port_expose: $JINA_PORT
  pods:
    splittor:
      uses: pods/craft-split.yml
      parallel: $PARALLEL
      read_only: true
    encoder:
      uses: pods/encode.yml
      parallel: $PARALLEL
      timeout_ready: 60000
      read_only: true
    chunk_indexer:
      uses: pods/index-chunk.yml
      shards: $SHARDS
      separated_workspace: true
      polling: all
      reducing_uses: _merge_all
    ranker:
      uses: MinRanker
    doc_indexer:
      uses: pods/index-doc.yml
  `,
};
