import axios from "axios"
import { timeout } from "../helpers/utils"
import logger from "../logger"
import {
  FlowArgument,
  FlowArguments,
  FlowArgumentType,
} from "../redux/flows/flows.types"
import { RawLog } from "../redux/logStream/logStream.types"
import { FLOW_RETRIES, FLOW_RETRY_TIMEOUT, TIMEOUT } from "./config"
import { DaemonArgumentsResponse } from "./services.types"
import { Settings } from "../redux/settings/settings.types"
import { ConnectionCallback } from "../redux/global/global.types"

export let jinadInstance = axios.create()

type LogHandler = (log: RawLog) => void

type Args = { [key: string]: string | number | boolean }

const jinadClient = {
  connect: async (settings: Settings, callback: ConnectionCallback) => {
    logger.log("api - connect - settings", settings)
    const baseURL = `${settings.jinadHost}:${settings.jinadPort}`

    jinadInstance = axios.create({ baseURL, timeout: TIMEOUT })

    let result
    try {
      result = await jinadInstance.get("/")
      if (result.status === 200) {
        logger.log("api - connect successfully connected to jinad")
        return callback({
          connected: true,
          message: `Successfully connected to Jina at ${baseURL}`,
        })
      }
    } catch (e) {
      logger.log("api - connect could not connect to jinad:", e)
    }
    return callback({ connected: false, message: "failed to connect" })
  },
  getJinaFlowArguments: async (): Promise<FlowArguments> => {
    const statusResult = await jinadInstance.get("/status")
    const version = statusResult.data.jina.jina

    const flowResult = await jinadInstance.get("/flows/arguments")
    const flow = parseDaemonFlowMethodOptions(flowResult.data)

    const podResult = await jinadInstance.get("/pods/arguments")
    const pod = parseDaemonFlowMethodOptions(podResult.data)

    const peaResult = await jinadInstance.get("/peas/arguments")
    const pea = parseDaemonFlowMethodOptions(peaResult.data)

    return { version, flow, pod, pea }
  },
  getDaemonStatus: async () => {
    try {
      const result = await jinadInstance.get("/status")
      if (result.status === 200)
        return { status: "success", daemonStatus: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  getWorkspaces: async () => {
    try {
      const result = await jinadInstance.get("/workspaces")
      if (result.status === 200)
        return { status: "success", workspaces: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  createWorkspace: async (files: (string | Blob)[]) => {
    const formData = new FormData()
    files.forEach((file: string | Blob) => {
      if (typeof file === "string") formData.append("files", new Blob([file]))
      else formData.append("files", file)
    })
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    try {
      const result = await jinadInstance.post("/workspaces", formData, options)
      if (result.status === 201)
        return { status: "success", workspace: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  deleteWorkspace: async (workspace_id: string) => {
    try {
      const result = await jinadInstance.delete(`/workspaces/${workspace_id}`)
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - deleteWorkspace ${workspace_id} error: `, e)
    }
    return { status: "error" }
  },
  deleteAllWorkspaces: async () => {
    try {
      const result = await jinadInstance.delete(`/workspaces/all`)
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - deleteAllWorkspaces error: `, e)
    }
    return { status: "error" }
  },
  getArgumentsForFlow: async () => {
    try {
      const result = await jinadInstance.get("/flows/arguments")
      if (result.status === 200)
        return { status: "success", arguments: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  getFlow: async (flow_id: string) => {
    try {
      const result = await jinadInstance.get(`/flows/${flow_id}`)
      if (result.status === 200) return { status: "success", flow: result.data }
      return {
        status: "error",
        message: result.data,
      }
    } catch (e) {
      logger.log("api - getFlow error getting flow: ", e)
    }
    return {
      status: "error",
      message: `Could not get flow\nFlowId:${flow_id}`,
    }
  },
  startFlow: async (yaml: string, workspace_id?: string) => {
    logger.log("yamlString:", yaml)
    const formData = new FormData()
    formData.append("flow", new Blob([yaml]))
    if (workspace_id) formData.append("workspace_id", workspace_id)
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    try {
      const result = await jinadInstance.post(`/flows`, formData, options)
      if (result.status === 201) {
        const flow_id = result.data
        const message = `Successfuly started flow\nid: ${flow_id}`
        return { status: "success", message, flow_id }
      }
      return { status: "error", message: result.data }
    } catch (e) {
      logger.log("api - startFlow error: ", e)
      return { status: "error", message: e.message }
    }
  },
  terminateFlow: async (flow_id: string) => {
    try {
      const result = await jinadInstance.delete(`/flows/${flow_id}`)
      logger.log("terminate result", result)
      if (result.status === 200) {
        const message = `Successfuly terminated flow ${flow_id}`
        return { status: "success", message, flow: result.data }
      }
      return { status: "error", message: result.data }
    } catch (e) {
      logger.log("api - terminateFlow error: ", e)
      return { status: "error", message: e.message }
    }
  },
  terminateAllFlows: async () => {
    try {
      const result = await jinadInstance.delete("/flows/all")
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log("api - terminateAllFlows error: ", e)
    }
    return { status: "error" }
  },
  getLogs: async (workspace_id: string, flow_id: string) => {
    try {
      const result = await jinadInstance.get(`/logs/${workspace_id}/${flow_id}`)
      if (result.status === 200) {
        const logs = result.data
          .split("\n")
          .filter((line: string) => line !== "")
          .map(JSON.parse)
        return { status: "success", logs }
      }
    } catch (e) {
      logger.log("api - getLogs error: ", e)
    }
    return {
      status: "error",
      message: `Could not get logs for flow.\nFlowId:${flow_id}`,
    }
  },
  waitForFlow: async (
    workspace_id: string,
    flow_id: string,
    numRetries: number = FLOW_RETRIES,
    retryTimeout: number = FLOW_RETRY_TIMEOUT
  ) => {
    for (let i = 0; i < numRetries; ++i) {
      logger.log(`checking for flow logs [${i + 1}]`)
      try {
        const result = await jinadInstance.get(
          `/logs/${workspace_id}/${flow_id}`
        )
        if (result.status === 200) {
          return {
            status: "success",
            message: `Successfuly stablished logstream.\nFlowId:${flow_id}`,
          }
        }
      } catch (e) {
        logger.log(`no flow logs yet [${i + 1}]`)
      }
      await timeout(retryTimeout)
    }
    return {
      status: "error",
      message: `Could not establish log stream for flow.\nFlowId:${flow_id}`,
    }
  },
  listenForLogs: async (
    workspace_id: string,
    flow_id: string,
    settings: Settings,
    callback: ConnectionCallback,
    handleLog: LogHandler
  ) => {
    let origin = settings.jinadHost
      .replace("http://", "ws://")
      .replace("https://", "wss://")
    const baseURL = `${origin}:${settings.jinadPort}/logstream/${workspace_id}/${flow_id}`
    logger.log("api - listenForLogs - baseURl:", baseURL)
    let socket: WebSocket
    try {
      socket = new WebSocket(baseURL)
    } catch (e) {
      return callback({ connected: false, message: e })
    }

    socket.addEventListener("open", () => {
      callback({ connected: true, message: "Successfully Connected" })
      socket.send(JSON.stringify({ from: 0 }))
    })
    socket.addEventListener("message", function (event) {
      logger.log("api - logstream - message received: ", event)
      const log: RawLog = JSON.parse(event.data)
      handleLog(log)
    })
    socket.addEventListener("close", function (event) {
      callback({ connected: false, message: "Connection closed" })
    })
    socket.addEventListener("error", function (event) {
      callback({ connected: false, message: "Socket error" })
    })
  },
  getArgumentsForPod: async () => {
    try {
      const result = await jinadInstance.get("/pods/arguments")
      if (result.status === 200)
        return { status: "success", arguments: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  getPod: async (podId: string) => {
    try {
      const result = await jinadInstance.get(`/pods/${podId}`)
      if (result.status === 200) return { status: "success", pod: result.data }
    } catch (e) {
      logger.log(`api - getPod ${podId} error: `, e)
    }
    return { status: "error" }
  },
  startPod: async (podArgs: Args) => {
    try {
      const result = await jinadInstance.post(`/pods`, podArgs)
      if (result.status === 201) return { status: "success", pod: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  terminatePod: async (podId: string) => {
    try {
      const result = await jinadInstance.delete(`/pods/${podId}`)
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - terminatePod ${podId} error: `, e)
    }
    return { status: "error" }
  },
  terminateAllPods: async () => {
    try {
      const result = await jinadInstance.delete(`/pods/all`)
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - terminateAllPods error: `, e)
    }
    return { status: "error" }
  },
  getArgumentsForPea: async () => {
    try {
      const result = await jinadInstance.get("/peas/arguments")
      if (result.status === 200)
        return { status: "success", arguments: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  getPea: async (peaId: string) => {
    try {
      const result = await jinadInstance.get(`/peas/${peaId}`)
      if (result.status === 200) return { status: "success", pea: result.data }
    } catch (e) {
      logger.log(`api - getPea error getting pea ${peaId}: `, e)
    }
    return { status: "error" }
  },
  startPea: async (peaArgs: Args) => {
    try {
      const result = await jinadInstance.post(`/peas`, peaArgs)
      if (result.status === 201) return { status: "success", pea: result.data }
      return { status: "error", message: result.data }
    } catch (e) {
      return { status: "error", message: e }
    }
  },
  terminatePea: async (peaId: string) => {
    try {
      const result = await jinadInstance.delete(`/peas/${peaId}`)
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - terminatePea ${peaId} error: `, e)
    }
    return { status: "error" }
  },
  terminateAllPeas: async () => {
    try {
      const result = await jinadInstance.delete("/peas/all")
      if (result.status === 200)
        return { status: "success", message: result.data }
    } catch (e) {
      logger.log(`api - terminateAllPeas error: `, e)
    }
    return { status: "error" }
  },
}

const typeMap: { [key: string]: FlowArgumentType } = {
  string: "string",
  boolean: "boolean",
  integer: "integer",
  array: "string",
}

export const parseDaemonFlowMethodOptions = (
  data: DaemonArgumentsResponse
): FlowArgument[] => {
  return Object.entries(data).map(
    ([name, { description, default: defaultValue, type: itemType }]) => {
      const type = typeMap[itemType]
      if (typeof defaultValue === "undefined" || defaultValue === null)
        return { name, description, type }
      return { name, description, defaultValue, type }
    }
  )
}

export default jinadClient
