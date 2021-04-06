import jinadClient from "./jinad"
import { configData } from "../data/multiModalExample"

export async function multiModalScript() {
  Object.entries(configData).forEach(([fileName, fileData]) => {
    const blob = new Blob([fileData], { type: "text/plain" })
    const file = new File([blob], fileName, { type: "text/plain" })
    jinadClient.createWorkspace([file]).then((result) => console.log(result))
  })
}
