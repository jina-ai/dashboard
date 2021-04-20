import axios from "axios"
import { Settings } from "../redux/settings/settings.types"
import { ConnectionCallback } from "../redux/global/global.types"
import logger from "../logger"
import { TIMEOUT } from "./config"

export let gatewayInstance = axios.create()
const top_k = 10
const gatewayClient = {
  connect: async (settings: Settings, callback: ConnectionCallback) => {
    logger.log("api - connect - settings", settings)
    const baseURL = `${settings.gatewayHost}:${settings.gatewayPort}`

    if (gatewayInstance) {
      gatewayInstance.defaults.baseURL = baseURL
      gatewayInstance.defaults.timeout = TIMEOUT
    } else gatewayInstance = axios.create({ baseURL, timeout: TIMEOUT })

    try {
      const result = await gatewayInstance.get("/status")
      if (result.status === 200) {
        logger.log("api - connect successfully connected to gateway")
        return callback({
          connected: true,
          message: `Successfully connected to Jina at ${baseURL}`,
        })
      }
    } catch (e) {
      logger.log("api - connect could not connect to gateway:", e)
    }
    return callback({ connected: false, message: "failed to connect" })
  },
  search: async (searchRequest: string) => {
    try {
      const result = await gatewayInstance.post("/api/search", {
        top_k,
        mode: "search",
        data: [searchRequest],
      })
      if (result.status === 200) {
        logger.log("search - successful")
        return result
      }
    } catch (e) {
      logger.log("search - error", e)
    }
  },
  index: async (indexRequest: string) => {
    try {
      const result = await gatewayInstance.post("/api/index", {
        top_k,
        mode: "index",
        data: [indexRequest],
      })
      if (result.status === 200) {
        logger.log("index - successful")
        return result
      }
    } catch (e) {
      logger.log("index - error", e)
    }
  },
}

export default gatewayClient
