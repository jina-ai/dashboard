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

export async function multiModalScript() {
  const configFiles: (string | Blob)[] = []

  Object.entries(configData).forEach(([fileName, fileData]) => {
    const blob = new Blob([fileData], { type: "text/plain" })
    const file = new File([blob], fileName, { type: "text/plain" })
    configFiles.push(file)
  })

  const workspaceResult = await jinadClient.createWorkspace(configFiles)
  logger.log(workspaceResult, "workspaceResult")
  const flowResult = await jinadClient.startFlow(
    indexFlow,
    workspaceResult.workspace
  )
  logger.log(flowResult, "flowResult")

  const settings = store.getState().settingsState.settings
  const gatewayResult = await gatewayClient.connect(settings, (result) =>
    logger.log(result)
  )

  logger.log(gatewayResult, "gatewayResult")

  // const data = {
  //   id: "26",
  //   image: "image_26.jpg",
  //   caption: "Attractive caucasian woman looking at camera.",
  // }
  //
  // const data2 = {
  //   id: indexData[0]["1"].toString(),
  //   image: indexData[0]["image_1.jpg"],
  //   caption:
  //     indexData[0]["A beautiful young girl posing on a white background."],
  // }
  //
  // const data3 = {
  //   id: 2499,
  //   image: "image_2499.jpg",
  //   caption: "Italian Woman Holding Sliced Pizza To Eat in a Restaurant",
  // }

  // console.log(data)
  // const gatewayClientResult = await gatewayClient.index(JSON.stringify(data))
  // console.log(gatewayClientResult, "gatewayClientResult")
  //
  // console.log(data2)
  // const gatewayClientResult2 = await gatewayClient.index(JSON.stringify(data2))
  // console.log(gatewayClientResult2, "gatewayClientResult")

  // console.log(data3)
  // const gatewayClientResult3 = await gatewayClient.index(JSON.stringify(data3))
  // console.log(gatewayClientResult3, "gatewayClientResult")

  for (let i = 0; i < 100; i++) {
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
  console.log(workspaceResult.workspace)
  console.log("startFlow")
  await jinadClient.startFlow(queryFlow, workspaceResult.workspace)
}
