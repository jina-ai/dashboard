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
