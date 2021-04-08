import jinadClient from "./jinad"
import {
  configData,
  indexData,
  indexFlow,
  queryFlow,
} from "../data/multiModalExample"
import logger from "../logger"
import gatewayClient from "./gatewayClient"
import store from "../redux"
import { timeout } from "../helpers/utils"
import { showBanner } from "../redux/global/global.actions"

export async function multiModalScript() {
  const configFiles: Blob[] = []

  Object.entries(configData).forEach(([fileName, fileData]) => {
    const blob = new Blob([fileData], { type: "text/plain" })
    const file = new File([blob], fileName, { type: "text/plain" })
    configFiles.push(file)
  })

  const workspaceResult = await jinadClient.createWorkspace(configFiles)
  logger.log(workspaceResult, "workspaceResult")
  store.dispatch(showBanner("workspace created", "success"))
  const flowResult = await jinadClient.startFlow(
    indexFlow,
    workspaceResult.workspace_id
  )
  logger.log(flowResult, "flowResult")

  const settings = store.getState().settingsState.settings
  const gatewayResult = await gatewayClient.connect(settings, (result) =>
    logger.log(result)
  )

  logger.log(gatewayResult, "gatewayResult")

  for (let i = 0; i < 10; i++) {
    console.log(i)
    const data = {
      id: indexData[i]["1"].toString(),
      image: indexData[i]["image_1.jpg"],
      caption:
        indexData[i]["A beautiful young girl posing on a white background."],
    }

    await gatewayClient.index(JSON.stringify(data))
  }

  console.log("terminateFlow")
  jinadClient.terminateFlow(flowResult.flow_id)
  await timeout(1)
  const terminateResult2 = await jinadClient.terminateFlow(flowResult.flow_id)
  console.log(terminateResult2, "terminateResult2")
  console.log(workspaceResult.workspace_id)
  console.log("startFlow")
  await jinadClient.startFlow(queryFlow, workspaceResult.workspace_id)
}
