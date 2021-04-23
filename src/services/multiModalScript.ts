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

  store.dispatch(showBanner("Starting Index Flow", "success"))
  const { flow_id } = await jinadClient.startFlow(
    indexFlow,
    workspaceResult.workspace
  )
  const settings = store.getState().settingsState.settings
  store.dispatch(showBanner("Connecting to gateway", "success"))
  await gatewayClient.connect(settings, (result) =>
    store.dispatch(showBanner("Connceted to gateway", "success"))
  )

  store.dispatch(showBanner("Start indexing", "success"))
  for (const dataEntry of indexData) {
    const data = {
      id: dataEntry["1"].toString(),
      image: dataEntry["image_1.jpg"],
      caption:
        dataEntry["A beautiful young girl posing on a white background."],
    }
    await gatewayClient.index(JSON.stringify(data))
    store.dispatch(
      showBanner(
        "Indexed: " +
          dataEntry["A beautiful young girl posing on a white background."],
        "success"
      )
    )
  }

  store.dispatch(showBanner("Terminating Flow", "success"))
  jinadClient.terminateFlow(flow_id)
  await timeout(1)
  await jinadClient.terminateFlow(flow_id)

  store.dispatch(showBanner("Starting Query Flow", "success"))
  await jinadClient.startFlow(queryFlow, workspaceResult.workspace)
  window.open("https://static.jina.ai/multimodal/", "_blank")
}
