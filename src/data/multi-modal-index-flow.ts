const indexFlow =
  "jtype: Flow\n" +
  "version: '1'\n" +
  "with:\n" +
  "  restful: true\n" +
  "  port_expose: 45678\n" +
  "pods:\n" +
  "  - name: segment\n" +
  "    uses: segment.yml\n" +
  "  # first pathway\n" +
  "  - name: filter_text\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: text/plain\n" +
  "  - name: textEncoder\n" +
  "    uses: encode-text.yml\n" +
  "  - name: textModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: text\n" +
  "  # second pathway, in parallel\n" +
  "  - name: filter_image\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: image/jpeg\n" +
  "    needs: segment\n" +
  "  - name: imageCrafter\n" +
  "    uses: crafter-image.yml\n" +
  "  - name: imageEncoder\n" +
  "    uses: encode-image.yml\n" +
  "  - name: imageModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: image\n" +
  "  # third pathway, in parallel\n" +
  "  - name: docIndexer\n" +
  "    uses: index-doc.yml\n" +
  "    needs: segment\n" +
  "  # join all parallel works\n" +
  "  - needs: [docIndexer, imageModIndexer, textModIndexer]\n" +
  "    name: joiner"
export default indexFlow
