import axios from "axios"
import { Settings } from "../../redux/settings/settings.types"
import { ConnectionCallback } from "../../redux/global/global.types"
import logger from "../../logger"
import { TIMEOUT } from "../config"

export let gatewayInstance = axios.create()

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
      logger.log("api - connect could not connect to jinad:", e)
    }
    return callback({ connected: false, message: "failed to connect" })
  },
}

export default gatewayClient
