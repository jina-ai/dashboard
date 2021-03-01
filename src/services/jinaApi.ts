import axios from "axios"
import {
  FlowArgument,
  FlowArguments,
  FlowArgumentType,
} from "../redux/flows/flows.types"
import { JinaApiMethodOption, JinaApiResponse } from "./services.types"

const JINA_API_ENDPOINT = process.env.REACT_APP_JINA_API!

export const getJinaFlowArguments = async (): Promise<FlowArguments> => {
  let response = await axios.get(JINA_API_ENDPOINT + "/latest.json")
  let data: JinaApiResponse = response.data
  let flowArguments: FlowArguments = {
    flow: parseFlowMethodOption(
      data.methods.find((m) => m.name === "flow")?.options
    ),
    pea: parseFlowMethodOption(
      data.methods.find((m) => m.name === "pea")?.options
    ),
    pod: parseFlowMethodOption(
      data.methods.find((m) => m.name === "pod")?.options
    ),
    version: data.version,
  }
  return flowArguments
}

const typeMap: { [key: string]: FlowArgumentType } = {
  str: "string",
  bool: "boolean",
  int: "integer",
  "typing.List[str]": "string",
}

export const parseFlowMethodOption = (
  options?: JinaApiMethodOption[]
): FlowArgument[] => {
  if (!options) return []
  return options.map(
    ({ name, help: description, default: defaultValue, type: itemType }) => {
      const type = typeMap[itemType]
      if (typeof defaultValue === "undefined" || defaultValue === null)
        return { name, description, type }
      return { name, description, defaultValue, type }
    }
  )
}
