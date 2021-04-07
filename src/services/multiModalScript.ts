import jinadClient from "./jinad"
import { configData, indexData, indexFlow } from "../data/multiModalExample"
import logger from "../logger"
import gatewayClient from "./gatewayClient"
import store from "../redux"

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

  for (const indexMeta of indexData) {
    const data = {
      id: indexMeta["1"].toString(),
      image: indexMeta["image_1.jpg"],
      caption:
        indexMeta["A beautiful young girl posing on a white background."],
    }

    console.log(data, "loop")
    gatewayClient.index(JSON.stringify(data))
  }
  jinadClient.terminateAllFlows()
}
