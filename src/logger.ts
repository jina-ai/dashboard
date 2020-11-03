import { saveAs } from "file-saver";

function handleErrorMessage(msg: any, url: any, line: any) {
  // @ts-ignore
  logger.log("window.onerror - ERROR", msg, url, `line: ${line}`);
}

function pushLog(data: any) {
  (window as any).logs.push(data);
}

function clearLogs() {
  (window as any).logs = [];
}

const logger = {
  log: function (...arg: any) {
    if (!(window as any).logsEnabled) return;
    let args = [...(arguments as any)];
    console.log(...args);
    pushLog(args);
  },
  isEnabled: function () {
    return (window as any).logsEnabled;
  },
  enable: function () {
    const _navigator: any = {};
    for (let i in window.navigator)
      _navigator[i] = (window as any).navigator[i];
    clearLogs();
    pushLog(_navigator);
    window.addEventListener("error", handleErrorMessage as any);
    (window as any).logsEnabled = true;
  },
  disable: function () {
    window.removeEventListener("error", handleErrorMessage as any);
    (window as any).logsEnabled = false;
  },
  setFormat: function (format = "json") {
    (window as any).logsFormat = format;
  },
  exportLogs: function () {
    const format = (window as any).logsFormat || "json";
    const logs = (window as any).logs;
    let content = "[\n";
    for (let i = 0; i < logs.length; ++i) {
      let args = logs[i];
      content += JSON.stringify(args) + `${i < logs.length - 1 ? "," : ""}\n`;
    }
    content += "]";

    let filename = `jina-dashboard-debug-output-${new Date()}.${format}`;
    let blob = new Blob([content], { type: "text,plain;charset=utf-8" });
    saveAs(blob, filename);
  },
};

export default logger;
