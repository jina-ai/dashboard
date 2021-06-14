// @ts-nocheck
import * as YAML from "yaml"
import { getInitialLogLevel } from "../redux/logStream/logStream.constants"
import _ from "lodash"
import { Level, LogLevelOccurrences } from "../redux/logStream/logStream.types"
import {
  CustomDataObject,
  FlowArgument,
  FlowArguments,
  FlowChart,
  FlowNode,
  FlowEdge,
} from "../redux/flows/flows.types"
import { isFlowNode, isFlowEdge } from "./flow-chart"

const customData = Object.keys(CustomDataObject)

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const mimeTypeFromDataURI = (dataURI: string) =>
  dataURI.substring(dataURI.indexOf(":") + 1, dataURI.indexOf(";"))

export const formatDebugRequest = async (
  textQuery: string,
  files: FileList | null,
  rows: string[],
  locations: { [key: string]: string },
  keys: { [key: string]: string },
  values: { [key: string]: string }
) => {
  const request: any = {
    data: [],
    parameters: {},
  }
  if (textQuery) {
    request.data.push({ text: textQuery })
  }
  if (files?.length) {
    for (let file of Array.from(files)) {
      const uri = await fileToBase64(file)
      request.data.push({ uri })
    }
  }
  rows.forEach((row) => {
    const location = locations[row]
    const key = keys[row]
    const value = values[row]

    if (!key || !value) return

    let formattedValue = ""

    try {
      formattedValue = JSON.parse(value)
    } catch (e) {
      formattedValue = value
    }

    if (!location || location === "parameters")
      request.parameters[key] = formattedValue
    else if (location === "root") request[key] = formattedValue
    else if (location === "textQuery" && textQuery)
      request.data[0][key] = formattedValue
    else if (files) {
      let dataIndex = _.findIndex(
        Array.from(files),
        (file) => `file-${file.name}` === location
      )
      if (textQuery) dataIndex = 1
      if (dataIndex >= 0) request.data[dataIndex][key] = formattedValue
    }
  })
  return JSON.stringify(request, null, "\t")
}

export const parseYAML = (yamlSTR: string) => {
  let yamlStrWithoutTag = /^!/.test(yamlSTR)
    ? yamlSTR.split("\n").slice(1).join("\n")
    : yamlSTR

  try {
    const data = YAML.parse(yamlStrWithoutTag)
    if (typeof data !== "object" || data === null)
      throw new Error("Invalid YAML")
    Object.keys(data.pods).forEach((podId) => {
      if (data.pods[podId].needs && !Array.isArray(data.pods[podId].needs)) {
        data.pods[podId].needs = [data.pods[podId].needs]
      }
    })

    return { data }
  } catch (error) {
    alert("Error Parsing YAML:\n" + error.message)
  }
}

export const decodePropValue = (
  argName,
  propValue,
  possibleArguments: FlowArgument[]
) => {
  const argument = possibleArguments.find((arg) => arg.name === argName)
  if (!argument) return propValue
  if (argument.type === "boolean") return String(propValue) === "true"
  return propValue
}

const unpackIfLengthOne = (arr) =>
  Array.isArray(arr) && arr.length === 1 ? arr[0] : arr

export const formatAsYAML = (
  chart: FlowChart,
  flowArguments: FlowArguments
) => {
  const { with: chartWith, elements } = chart

  let nodes: FlowNode[] = []
  let flowEdges: FlowEdge[] = []

  elements.forEach((element) => {
    if (isFlowEdge(element)) flowEdges.push(element)
    if (isFlowNode(element)) nodes.push(element)
  })

  const { pod: podArguments } = flowArguments

  const childParentsMap = flowEdges.reduce((acc, curr) => {
    const parent = curr.source
    const child = curr.target

    if (!acc[child]) {
      acc[child] = []
    }
    acc[child].push(parent)
    return acc
  }, {})

  const pods = nodes
    .filter((node) => node.data.label !== "gateway")
    .reduce((acc, node) => {
      const key = node.data.label

      const podProperties = Object.entries(node.data).reduce(
        (acc, [argName, propValue]) => {
          if (customData.includes(argName)) return acc
          acc[argName] = decodePropValue(argName, propValue, podArguments)
          return acc
        },
        {}
      )
      if (childParentsMap[key]) {
        podProperties.needs = unpackIfLengthOne(childParentsMap[key])
      }

      acc[key] = { ...podProperties }
      return acc
    }, {})

  const canvas = nodes.reduce((acc, node) => {
    const {
      position: { x, y },
    } = node
    const key = node.data.label || node.data.name
    acc[key] = { x: parseInt(x), y: parseInt(y) }
    return acc
  }, {})

  const output = { with: { ...chartWith, board: { canvas } }, pods }
  return `!Flow\n${YAML.stringify(output)}`
}

export const formatSeconds = (numSeconds: number): string => {
  let minute = 60
  let hour = 60 * minute

  return numSeconds < minute
    ? `${Math.floor(numSeconds)}s`
    : numSeconds < hour
    ? `${Math.floor(numSeconds / minute)}m ${Math.floor(numSeconds % minute)}s`
    : `${Math.floor(numSeconds / hour)}h ${Math.floor(
        (numSeconds % hour) / minute
      )}m ${Math.floor(numSeconds % minute)}s`
}

export const formatBytes = (numBytes: number): string => {
  return numBytes < 1024
    ? `${numBytes} Bytes`
    : numBytes < 1024 ** 2
    ? `${(numBytes / 1024).toFixed(1)} KB`
    : numBytes < 1024 ** 3
    ? `${(numBytes / 1024 ** 2).toFixed(1)} MB`
    : `${(numBytes / 1024 ** 3).toFixed(1)} GB`
}

export function getLogLevelCharts(
  numSeconds: number = 60,
  MAX_CHART_TICKS: number,
  logLevelOccurrences: LogLevelOccurrences,
  currentDate: Date
) {
  const emptyItem = getInitialLogLevel()
  const step = numSeconds / MAX_CHART_TICKS
  const data = []
  const currentInterval = Math.ceil(currentDate / 1000 / step) * step
  const now = Math.floor(currentDate / 1000)
  for (let i = currentInterval - numSeconds; i < currentInterval; i += step) {
    let item = _.cloneDeep(emptyItem)
    for (let j = i; j < i + step; ++j) {
      const occurrence = logLevelOccurrences[j]
      if (!occurrence) continue
      item.lastLog = occurrence.lastLog
      Object.entries(occurrence.levels).forEach((logEntry) => {
        const level = logEntry[0] as Level
        const amount = logEntry[1] as number
        item.levels[level] = item.levels[level] + amount
      })
    }
    data.push(item)
  }
  return { data, numSeconds, numTicks: MAX_CHART_TICKS, lastTimestamp: now }
}
