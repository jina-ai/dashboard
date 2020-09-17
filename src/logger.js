import { saveAs } from "file-saver";

function handleErrorMessage(msg, url, line) {
  logger.log("ERROR", msg, url, `line: ${line}`);
}

const logger = {
  log: function () {
    if (!window.logsEnabled) return;
    let args = [...arguments];
    console.log(...args);
    window.logs.push(args);
  },
  isEnabled: function () {
    return window.logsEnabled;
  },
  enable: function () {
    const _navigator = {};
    for (let i in window.navigator) _navigator[i] = window.navigator[i];
    window.logs = [];
    window.logs.push(_navigator);
    window.addEventListener("error", handleErrorMessage);
    window.logsEnabled = true;
  },
  disable: function () {
    window.removeEventListener("error", handleErrorMessage);
    window.logsEnabled = false;
  },
  setFormat: function (format = "json") {
    window.logsFormat = format;
  },
  exportLogs: function () {
    const format = window.logsFormat || "json";
    const logs = window.logs;
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
