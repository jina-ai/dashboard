module.exports = {
  example: `!Flow
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
      shards: $SHARDS
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
  flower: `!Flow
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
  southpark: `!Flow
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
      shards: $SHARDS
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
};
