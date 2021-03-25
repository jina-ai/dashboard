const version = require("../../package.json").version
const localVersion = localStorage.getItem("version")

export const copyToClipboard = (str: string) => {
  const temp = document.createElement("textarea")
  temp.value = str
  document.body.appendChild(temp)
  temp.select()
  document.execCommand("copy")
  document.body.removeChild(temp)
  return
}

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const versionCompare = () => {
  if (localVersion === null) return true
  const localVersionValue = parseInt(localVersion.replaceAll(".", ""))
  const versionValue = parseInt(version.replaceAll(".", ""))

  return localVersion === null || localVersionValue < versionValue
}
