module.exports = {
	flow1:
	`!Flow
  with:
    board:
      canvas:
        chunk_seg:
          x: 361
          y: 81
        encode1:
          x: 250
          y: 300
        encode2:
          x: 474
          y: 300
        joiner:
          x: 357
          y: 473
  pods:
    chunk_seg:
      replicas: 3
    encode1:
      replicas: 2
      recv_from: chunk_seg
    encode2:
      replicas: 2
      recv_from: chunk_seg
    joiner:
      yaml_path: merge
      recv_from:
        - encode1
        - encode2
  `
}