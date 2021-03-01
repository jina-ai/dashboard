export type JinaApiResponse = {
  authors: string
  descriptin: string
  docs: string
  license: string
  name: string
  source: string
  url: string
  vendor: string
  version: string
  methods: JinaApiMethod[]
  [key: string]: any
}

export type JinaApiMethod = {
  name: string
  options: JinaApiMethodOption[]
}

export type JinaApiMethodOption = {
  name: string
  help: string
  type: "str" | "bool" | "int" | "typing.List[str]"
  default: string | boolean | number | null
  required: boolean
  [key: string]: any
}

export type DaemonArgumentsResponse = {
  [key: string]: DaemonArgument
}

export type DaemonArgument = {
  description: string
  type: "string" | "boolean" | "integer" | "array"
  default?: string | boolean | number
  [key: string]: any
}
