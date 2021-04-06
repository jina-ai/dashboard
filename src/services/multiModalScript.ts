import jinadClient from "./jinad"
import { configData } from "../data/multiModalExample"

export async function multiModalScript() {
  const configFiles: (string | Blob)[] = []

  Object.entries(configData).forEach(([fileName, fileData]) => {
    const blob = new Blob([fileData], { type: "text/plain" })
    const file = new File([blob], fileName, { type: "text/plain" })
    configFiles.push(file)
  })

  jinadClient.createWorkspace(configFiles).then((result) => console.log(result))
}
