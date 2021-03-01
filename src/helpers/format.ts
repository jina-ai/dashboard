// @ts-nocheck
import * as YAML from "yaml"
import { getInitialLogLevel } from "../redux/logStream/logStream.constants"
import _ from "lodash"
import { Level, LogLevelOccurrences } from "../redux/logStream/logStream.types"
import { FlowArgument, FlowArguments } from "../redux/flows/flows.types"

const getNodeLabelsByPortId = ({ from, to }, nodes) => ({
  [from.portId]: nodes[from.nodeId].label || nodes[from.nodeId].properties.name,
  [to.portId]: nodes[to.nodeId].label || nodes[to.nodeId].properties.name,
})

export const parseYAML = (yamlSTR: string) => {
  //todo removing the !tag is kind a bootleg solution. We should look into the parsing

  let yamlStrWithoutTag = /^!/.test(yamlSTR)
    ? yamlSTR.split("\n").slice(1).join("\n")
    : yamlSTR

  try {
    const data = YAML.parse(yamlStrWithoutTag)
    if (typeof data !== "object" || data === null)
      throw new Error("Invalid YAML")
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

export const formatAsYAML = (chart, flowArguments: FlowArguments) => {
  const { with: chartWith, nodes, links } = chart

  const { pod: podArguments } = flowArguments

  const needsByPodLabel = Object.values(links).reduce((acc, curr) => {
    const nodeLabelsByPortId = getNodeLabelsByPortId(curr, nodes)
    const needs = nodeLabelsByPortId.outPort
    const neededBy = nodeLabelsByPortId.inPort

    if (!acc[neededBy]) {
      acc[neededBy] = []
    }
    acc[neededBy].push(needs)
    return acc
  }, {})

  const pods = Object.values(nodes)
    .filter(({ label }) => label !== "gateway")
    .reduce((acc, node) => {
      const key = node.label || node.properties.name

      const podProperties = Object.entries(node.properties).reduce(
        (acc, [argName, propValue]) => {
          acc[argName] = decodePropValue(argName, propValue, podArguments)
          return acc
        },
        {}
      )
      if (needsByPodLabel[key]) {
        podProperties.needs = unpackIfLengthOne(needsByPodLabel[key])
      }

      acc[key] = { ...podProperties }
      return acc
    }, {})

  const canvas = Object.values(nodes).reduce((acc, node) => {
    const {
      position: { x, y },
    } = node
    const key = node.label || node.properties.name
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
