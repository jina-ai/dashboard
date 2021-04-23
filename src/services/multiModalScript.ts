import jinadClient from "./jinad"
import {
  configDataList,
  configUrl,
  indexData,
  indexFlow,
  queryFlow,
} from "../data/multiModalExample"
import gatewayClient from "./gatewayClient"
import store from "../redux"
import { timeout } from "../helpers/utils"
import axios from "axios"
import { showBanner } from "../redux/global/global.actions"

export async function multiModalScript() {
  const configFiles: Blob[] = []

  for (const fileName of configDataList) {
    const response = await axios.get(configUrl + "/" + fileName, {
      responseType: "blob",
    })
    const file = new File([response.data], fileName, { type: "text/plain" })
    configFiles.push(file)
  }

  store.dispatch(showBanner("Creating Workspace", "success"))
  const workspaceResult = await jinadClient.createWorkspace(configFiles)

  console.log(workspaceResult, "workspaceResult")
  store.dispatch(showBanner("Starting Index Flow", "success"))
  const flowResult = await jinadClient.startFlow(
    indexFlow,
    workspaceResult.workspace
  )
  console.log(flowResult, "flowResult")
  const settings = store.getState().settingsState.settings
  store.dispatch(showBanner("Connecting to gateway", "success"))
  const gatewayClientResult = await gatewayClient.connect(settings, (result) =>
    store.dispatch(showBanner("Connceted to gateway", "success"))
  )

  console.log(gatewayClientResult, "gatewayClientResult")

  store.dispatch(showBanner("Start indexing", "success"))
  for (let i = 0; i < 10; i++) {
    const data = {
      id: indexData[i]["1"].toString(),
      image: indexData[i]["image_1.jpg"],
      caption:
        indexData[i]["A beautiful young girl posing on a white background."],
    }
    await gatewayClient.index(JSON.stringify(data))
  }

  store.dispatch(showBanner("Terminating Flow", "success"))
  jinadClient.terminateFlow(flowResult.flow_id)
  await timeout(1)
  const terminateFlow = await jinadClient.terminateFlow(flowResult.flow_id)
  console.log(terminateFlow, "terminateFlow")

  store.dispatch(showBanner("Starting Query Flow", "success"))
  const startQueryResult = await jinadClient.startFlow(
    queryFlow,
    workspaceResult.workspace
  )
  console.log(startQueryResult, "startQueryResult")
  window.open("https://static.jina.ai/multimodal/", "_blank")
}
