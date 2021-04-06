import jinadClient from "./jinad"
import { configData, indexData, indexFlow } from "../data/multiModalExample"
import logger from "../logger"

export async function multiModalScript() {
  const configFiles: (string | Blob)[] = []

  Object.entries(configData).forEach(([fileName, fileData]) => {
    const blob = new Blob([fileData], { type: "text/plain" })
    const file = new File([blob], fileName, { type: "text/plain" })
    configFiles.push(file)
  })

  const workspaceResult = await jinadClient.createWorkspace(configFiles)
  logger.log(workspaceResult)
  const flowResult = await jinadClient.startFlow(
    indexFlow,
    workspaceResult.workspace
  )
  logger.log(flowResult)

  indexData.forEach((indexMeta) => {
    const data = {
      data: [
        {
          id: indexMeta["1"],
          image: indexMeta["image_1.jpg"],
          caption:
            indexMeta["A beautiful young girl posing on a white background."],
        },
      ],
    }

    console.log(data)
  })
}
