import { saveAs } from "file-saver"

declare global {
  interface Window {
    logs: string[][]
    logsEnabled: boolean
    logsFormat: string
  }
}

function handleErrorMessage(msg: string, url: string, line: string) {
  logger.log("window.onerror - ERROR", msg, url, `line: ${line}`)
}

function pushLog(data: any[]) {
  window.logs.push(data)
}

function clearLogs() {
  window.logs = []
}

const logger = {
  log: function (...arg: any) {
    if (!window.logsEnabled) return
    let args = [...((arguments as unknown) as Array<any>)]
    console.log(...args)
    pushLog(args)
  },
  isEnabled: function () {
    return window.logsEnabled
  },
  enable: function () {
    const _navigator: any = {}
    for (let i in window.navigator)
      _navigator[i] = window.navigator[i as keyof Navigator]
    clearLogs()
    pushLog(_navigator)
    window.addEventListener(
      "error",
      (handleErrorMessage as unknown) as EventListenerOrEventListenerObject
    )
    window.logsEnabled = true
  },
  disable: function () {
    window.removeEventListener(
      "error",
      (handleErrorMessage as unknown) as EventListenerOrEventListenerObject
    )
    window.logsEnabled = false
  },
  setFormat: function (format = "json") {
    window.logsFormat = format
  },
  exportLogs: function () {
    const format = window.logsFormat || "json"
    const logs = window.logs
    let content = "[\n"
    for (let i = 0; i < logs.length; ++i) {
      let args = logs[i]
      content += JSON.stringify(args) + `${i < logs.length - 1 ? "," : ""}\n`
    }
    content += "]"

    let filename = `jina-dashboard-debug-output-${new Date()}.${format}`
    let blob = new Blob([content], { type: "text,plain;charset=utf-8" })
    saveAs(blob, filename)
  },
}

export default logger
