export default [
	{
		name: 'reader',
		yaml_path: 'pods/extract.yml'
	},
	{
		name: 'splittor',
		yaml_path: 'pods/craft-split.yml',
		replicas: 3,
		read_only: 'true'
	},
	{
		name: 'encoder',
		yaml_path: 'pods/encode.yml',
		replicas: 3,
		timeout_ready: 1200000,
		read_only: 'true',
	},
	{
		name: 'chunk_indexer',
		yaml_path: 'pods/index-chunk.yml',
		replicas: 3,
		separated_workspace: 'true',
	},
	{
		name: 'doc_indexer',
		yaml_path: 'pods/index-doc.yml',
	},
	{
		name: 'join_all',
		yaml_path: '_merge',
		read_only: 'true',
	},
]