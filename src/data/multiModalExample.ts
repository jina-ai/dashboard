export const configData = {
  "__init__.py": "",

  "crafter-image.yml":
    "jtype: ImageNormalizer\n" +
    "requests:\n" +
    "  on:\n" +
    "    IndexRequest:\n" +
    "      with:\n" +
    "        traversal_paths: ['c']\n" +
    "      drivers:\n" +
    "        - jtype: DataURI2Blob {}\n" +
    "        - jtype: CraftDriver {}\n" +
    "    SearchRequest:\n" +
    "      with:\n" +
    "        traversal_paths: [ 'c' ]\n" +
    "      drivers:\n" +
    "        - jtype: DataURI2Blob { }\n" +
    "        - jtype: CraftDriver { }",

  "encode-image.yml":
    "jtype: ImageTorchEncoder\n" +
    "with:\n" +
    "  channel_axis: -1\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    [IndexRequest, SearchRequest]:\n" +
    "      with:\n" +
    "        traversal_paths: ['c']\n" +
    "      drivers:\n" +
    "        - jtype: EncodeDriver {}\n" +
    "        - jtype: ExcludeQL\n" +
    "          with:\n" +
    "            fields:\n" +
    "              - blob\n",

  "encode-text.yml":
    "jtype: TransformerTorchEncoder\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    [SearchRequest, IndexRequest]:\n" +
    "      with:\n" +
    "        traversal_paths: ['c']\n" +
    "      drivers:\n" +
    "        - jtype: EncodeDriver {}",

  "filter.yml":
    "jtype: BaseExecutor\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    [IndexRequest, SearchRequest]:\n" +
    "      - jtype: FilterQL\n" +
    "        with:\n" +
    "          lookups:\n" +
    "            mime_type: '${{ENV.filter_mime}}'\n" +
    "          traversal_paths: ['c']",

  "index-comp.yml":
    "jtype: CompoundIndexer\n" +
    "components:\n" +
    "  - jtype: NumpyIndexer\n" +
    "    with:\n" +
    "      index_filename: vec.gz\n" +
    "      metric: cosine\n" +
    "    metas:\n" +
    "      name: vecidx  # a customized name\n" +
    "  - jtype: BinaryPbIndexer\n" +
    "    with:\n" +
    "      index_filename: chunk.gz\n" +
    "    metas:\n" +
    "      name: docidx\n" +
    "metas:\n" +
    "  name: '${{ ENV.indexer_name }}'\n" +
    "  workspace: indexed\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    SearchRequest:\n" +
    "      drivers:\n" +
    "        - jtype: VectorSearchDriver\n" +
    "          with:\n" +
    "            executor: BaseVectorIndexer\n" +
    "            traversal_paths: [ 'c' ]\n" +
    "        - jtype: KVSearchDriver\n" +
    "          with:\n" +
    "            executor: BaseKVIndexer\n" +
    "            traversal_paths: [ 'cm' ]\n" +
    "        - jtype: ExcludeQL\n" +
    "          with:\n" +
    "            fields:\n" +
    "              - embedding\n" +
    "              - blob\n" +
    "            traversal_paths: [ 'cm', 'c' ]\n" +
    "    [ IndexRequest, UpdateRequest ]:\n" +
    "      with:\n" +
    "        traversal_paths: [ 'c' ]\n" +
    "      drivers:\n" +
    "        - jtype: VectorIndexDriver\n" +
    "          with:\n" +
    "            executor: BaseVectorIndexer\n" +
    "        - jtype: ExcludeQL\n" +
    "          with:\n" +
    "            fields:\n" +
    "              - embedding\n" +
    "              - blob\n" +
    "        - jtype: KVIndexDriver\n" +
    "          with:\n" +
    "            executor: BaseKVIndexer",

  "index-doc.yml":
    "jtype: BinaryPbIndexer\n" +
    "with:\n" +
    "  index_filename: 'doc.gz'\n" +
    "metas:\n" +
    "  name: kv_indexer\n" +
    "  workspace: indexed\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    IndexRequest:\n" +
    "      - jtype: ExcludeQL\n" +
    "        with:\n" +
    "          fields:\n" +
    "            - chunks\n" +
    "      - jtype: URI2DataURI {}\n" +
    "      - jtype: ExcludeQL\n" +
    "        with:\n" +
    "          fields:\n" +
    "            - buffer\n" +
    "      - jtype: KVIndexDriver {}",

  "ranker.yml":
    "jtype: WeightedRanker\n" +
    "with:\n" +
    "  query_required_keys:\n" +
    "    - weight\n" +
    "metas:\n" +
    "  py_modules:\n" +
    "    - weighted_ranker.py\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    SearchRequest:\n" +
    "      - jtype: Chunk2DocRankDriver\n" +
    "        with:\n" +
    "          traversal_paths: ['r']\n" +
    "      - jtype: SortQL\n" +
    "        with:\n" +
    "          reverse: true\n" +
    "          field: 'score__value'\n" +
    "          traversal_paths: ['m']\n" +
    "      - jtype: SliceQL\n" +
    "        with:\n" +
    "          start: 0\n" +
    "          end: 10 # is overwritten by the QueryLangDriver\n" +
    "          traversal_paths: ['m']\n" +
    "      - jtype: ExcludeQL\n" +
    "        with:\n" +
    "          fields:\n" +
    "            - chunks",

  "segment.yml":
    "jtype: CompoundExecutor\n" +
    "components:\n" +
    "  - jtype: SimpleCrafter\n" +
    "    metas:\n" +
    "      name: craft\n" +
    "  - jtype: BiSegmenter\n" +
    "    metas:\n" +
    "      name: seg\n" +
    "metas:\n" +
    "  name: converter\n" +
    "  py_modules:\n" +
    "    - segmenter.py\n" +
    "requests:\n" +
    "  use_default: true\n" +
    "  on:\n" +
    "    [IndexRequest, SearchRequest]:\n" +
    "      - jtype: CraftDriver\n" +
    "        with:\n" +
    "          executor: craft\n" +
    "      - jtype: SegmentDriver\n" +
    "        with:\n" +
    "          executor: seg",

  "segmenter.py":
    "import os\n" +
    "\n" +
    "from jina import Segmenter, Crafter\n" +
    "from jina.executors.decorators import single\n" +
    "\n" +
    "\n" +
    "class SimpleCrafter(Crafter):\n" +
    '    """Simple crafter for multimodal example."""\n' +
    "\n" +
    "    @single\n" +
    "    def craft(self, tags):\n" +
    '        """\n' +
    "        Read the data and add tags.\n" +
    "\n" +
    "        :param tags: tags of data\n" +
    "        :return: crafted data\n" +
    '        """\n' +
    "        return {\n" +
    "            'text': tags['caption'],\n" +
    "            'uri': f'https://jina-hello-multimodal.s3.amazonaws.com/people-img/{tags[\"image\"]}'\n" +
    "        }\n" +
    "\n" +
    "\n" +
    "class BiSegmenter(Segmenter):\n" +
    '    """Segmenter for multimodal example."""\n' +
    "\n" +
    "    @single(slice_nargs=2)\n" +
    "    def segment(self, text, uri):\n" +
    '        """\n' +
    "        Segment data into text and uri.\n" +
    "\n" +
    "        :param text: text data\n" +
    "        :param uri: uri data of images\n" +
    "        :return: Segmented data.\n" +
    '        """\n' +
    "        return [\n" +
    "            {'text': text, 'mime_type': 'text/plain'},\n" +
    "            {'uri': uri, 'mime_type': 'image/jpeg'},\n" +
    "        ]",

  "weighted_ranker.py":
    "from jina.executors.rankers import Chunk2DocRanker\n" +
    "\n" +
    "\n" +
    "class WeightedRanker(Chunk2DocRanker):\n" +
    '    """\n' +
    "    Ranker for multimodal example.\n" +
    "\n" +
    "    Will give the scores to chunk data according to weight.\n" +
    '    """\n' +
    "\n" +
    "    match_required_keys = None\n" +
    "    query_required_keys = {'weight'}\n" +
    "\n" +
    "    def score(self, match_idx, query_chunk_meta, match_chunk_meta, *args, **kwargs):\n" +
    '        """\n' +
    "        Given a set of queries (that may correspond to the chunks of a root level query) and a set of matches\n" +
    "        corresponding to the same parent id, compute the matching score of the common parent of the set of matches.\n" +
    "        Returns a score corresponding to the score of the parent document of the matches in `match_idx`\n" +
    "\n" +
    "        :param match_idx: A [N x 4] numpy ``ndarray``, column-wise:\n" +
    "                - ``match_idx[:, 0]``: ``parent_id`` of the matched docs, integer\n" +
    "                - ``match_idx[:, 1]``: ``id`` of the matched chunks, integer\n" +
    "                - ``match_idx[:, 2]``: ``id`` of the query chunks, integer\n" +
    "                - ``match_idx[:, 3]``: distance/metric/score between the query and matched chunks, float.\n" +
    "                All the matches belong to the same `parent`\n" +
    "        :param query_chunk_meta: The meta information of the query chunks, where the key is query chunks' ``chunk_id``,\n" +
    "            the value is extracted by the ``query_required_keys``.\n" +
    "        :param match_chunk_meta: The meta information of the matched chunks, where the key is matched chunks'\n" +
    "            ``chunk_id``, the value is extracted by the ``match_required_keys``.\n" +
    "        :param args: Extra positional arguments\n" +
    "        :param kwargs: Extra keyword arguments\n" +
    "        :return: Return the score associated to the parent id of the matches\n" +
    '        """\n' +
    "\n" +
    "        scores = match_idx[[self.COL_QUERY_CHUNK_ID, self.COL_SCORE]]\n" +
    "\n" +
    "        weight_score = 0.0\n" +
    "        for k, v in scores:\n" +
    "            vv = 1 / (1 + v)\n" +
    "            weight_score += query_chunk_meta[k]['weight'] * vv\n" +
    "\n" +
    "        return weight_score\n",
}
