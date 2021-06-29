import { findIndex } from "lodash"

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

export const newVersionLocalStorageReset = (
  version: string,
  localVersion: string | null
) => {
  if (localVersion === null) localStorage.setItem("version", version)
  else {
    const versionList = version.split(".")
    const localVersionList = localVersion.split(".")
    const majorVersion = parseInt(versionList[0])
    const majorLocalVersion = parseInt(localVersionList[0])
    const minorVersion = parseInt(versionList[1])
    const minorLocalVersion = parseInt(localVersionList[1])
    const patchVersion = parseInt(versionList[2])
    const patchLocalVersion = parseInt(localVersionList[2])
    if (
      majorLocalVersion < majorVersion ||
      minorLocalVersion < minorVersion ||
      patchLocalVersion < patchVersion
    ) {
      localStorage.clear()
      window.location.reload()
    }
  }
}

export const mimeTypeFromDataURI = (dataURI: string) =>
  dataURI.substring(dataURI.indexOf(":") + 1, dataURI.indexOf(";"))

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const formatDebugRequest = async (
  textQuery: string,
  files: FileList | null,
  rows: string[],
  locations: { [key: string]: string },
  keys: { [key: string]: string },
  values: { [key: string]: string }
) => {
  const request: any = {
    data: [],
    parameters: {},
  }
  if (textQuery) {
    request.data.push({ text: textQuery })
  }
  if (files?.length) {
    for (let file of Array.from(files)) {
      const uri = await fileToBase64(file)
      request.data.push({ uri })
    }
  }
  rows.forEach((row) => {
    const location = locations[row]
    const key = keys[row]
    const value = values[row]

    if (!key || !value) return

    let formattedValue = ""

    try {
      formattedValue = JSON.parse(value)
    } catch (e) {
      formattedValue = value
    }

    if (!location || location === "parameters")
      request.parameters[key] = formattedValue
    else if (location === "root") request[key] = formattedValue
    else if (location === "textQuery" && textQuery)
      request.data[0][key] = formattedValue
    else if (files) {
      let dataIndex = findIndex(
        Array.from(files),
        (file) => `file-${file.name}` === location
      )
      if (textQuery) dataIndex = 1
      if (dataIndex >= 0) request.data[dataIndex][key] = formattedValue
    }
  })
  return JSON.stringify(request, null, "\t")
}
