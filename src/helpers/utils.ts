import { nanoid } from "nanoid"

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

export const splitByNewline = (text: string) => text.split(/\n/)

export const formatDocumentRequest = async (
  text: string,
  uris: Array<string> | null,
  rows: string[],
  keys: { [key: string]: string },
  values: { [key: string]: string }
) => {
  const request: any = {
    data: [],
  }

  if (text) {
    const lines = splitByNewline(text)
    lines.forEach((line) => {
      if (line) request.data.push({ text: line })
    })
  }

  if (uris?.length) {
    for (let uri of uris) {
      request.data.push({ uri })
    }
  }

  rows.forEach((row) => {
    const key = keys[row]
    const value = values[row]

    if (!key || !value) return

    let formattedValue = ""

    try {
      formattedValue = JSON.parse(value)
    } catch (e) {
      formattedValue = value
    }

    request[key] = formattedValue
  })
  return JSON.stringify(request, null, " ")
}

export const parseDocumentRequest = (
  request: string,
  exampleRequest: string
) => {
  let text = ""
  const uris: string[] = []
  const rows: string[] = []
  const keys: { [key: string]: string } = {}
  const values: { [key: string]: string } = {}
  const placeholders: { [key: string]: string } = {}

  try {
    const parsed = JSON.parse(request)
    const parsedExample = JSON.parse(exampleRequest)

    if (parsed?.data)
      parsed.data.forEach((item: any) => {
        if (item.text) text += item.text + "\n"
        if (item.uri) uris.push(item.uri)
      })

    Object.entries(parsedExample).forEach(([key, value]) => {
      if (key === "data") return
      const id = nanoid()

      rows.push(id)
      keys[id] = key

      let formattedValue: any

      if (typeof value === "object" && value !== null) {
        formattedValue = JSON.stringify(value as any)
      } else formattedValue = value

      placeholders[id] = formattedValue
    })

    Object.entries(parsed).forEach(([key, value]) => {
      if (key === "data") return

      let id: any

      Object.entries(keys).forEach(([k, v]) => {
        if (v === key) {
          id = k
        }
      })

      if (!id) {
        id = nanoid()
        rows.push(id)
        keys[id] = key
      }

      let formattedValue: any

      if (typeof value === "object" && value !== null) {
        formattedValue = JSON.stringify(value as any)
      } else formattedValue = value
      values[id] = formattedValue
    })
  } catch (e) {
    console.log("ERROR:", e)
  }
  return { text, uris, keys, values, rows, placeholders }
}
