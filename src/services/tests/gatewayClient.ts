import axios from "axios"
import { Settings } from "../../redux/settings/settings.types"
import { ConnectionCallback } from "../../redux/global/global.types"
import logger from "../../logger"
import { TIMEOUT } from "../config"

export let gatewayInstance = axios.create()
//todo refactor messages into variables and share them with tests

const gatewayClient = {
  connect: async (settings: Settings, callback: ConnectionCallback) => {
    logger.log("api - connect - settings", settings)
    const baseURL = `${settings.gatewayHost}:${settings.gatewayPort}`

    gatewayInstance = axios.create({ baseURL, timeout: TIMEOUT })

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
        top_k: 10,
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
        top_k: 10,
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
