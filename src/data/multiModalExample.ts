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
}
