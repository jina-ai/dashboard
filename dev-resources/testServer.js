const express = require("express");
const cors = require("cors");
const axios = require("axios");
const symbols = require("log-symbols");
const cliCursor = require("cli-cursor");
const chalk = require("chalk");
const EventSource = require("eventsource");
const fs = require("fs-extra");
const { nanoid } = require("nanoid");
const { argv } = require("yargs");
const readline = require('readline')

const config = require("./config");

const app = express();

app.use(cors());

cliCursor.hide();

//Global Variables
let statusInterval;
let currentSpeed = 0;
//

//Emitter Variables
let initialStreamStart;
let activeStreams = 0;
let messagesSent = 0;
let lastMessagesSent = 0;
let flowTemplate;
//

//Recorder Variables
let messagesReceived = 0;
let lastMessagesReceived = 0;
let logsActive = false;
let profileActive = false;
let yaml;
let logData = [];
let profileData = [];
//

//ENDPOINTS
const logEndpoint = config.emitter.endpoints.log;
app.get(logEndpoint, (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");
  startStreamSimulation(flowTemplate.logs, req, res);
});

const profileEndpoint = config.emitter.endpoints.profile;
app.get(profileEndpoint, (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");
  startStreamSimulation(flowTemplate.profile, req, res);
});

const yamlEndpoint = config.emitter.endpoints.yaml;
app.get(yamlEndpoint, (req, res) => {
  return res.send(flowTemplate.yaml);
});
//

//CONSOLE OUTPUT
function printEmitterStatus() {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  process.stdout.write(
    `Active Streams: ${
      activeStreams ? chalk.green(activeStreams) : chalk.gray(activeStreams)
    } | Messages Sent: ${
      messagesSent ? messagesSent : chalk.gray(messagesSent)
    } | Current Speed: ${
      currentSpeed
        ? `${currentSpeed} msg/s`
        : chalk.gray(`${currentSpeed} msg/s`)
    }`
  );
}

function updateEmitterStatus() {
  currentSpeed = messagesSent - lastMessagesSent;
  lastMessagesSent = messagesSent;
  printEmitterStatus();
}

function printRecorderStatus() {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  let logsReceived = logData.length;
  let profileReceived = profileData.length;
  process.stdout.write(
    `Connected: ${
      logsActive || profileActive ? symbols.success : symbols.error
    } | Logs : ${
      logsReceived ? logsReceived : chalk.gray(logsReceived)
    } | Profile : ${
      profileReceived ? profileReceived : chalk.gray(profileReceived)
    } | YAML : ${yaml ? symbols.success : symbols.error} | Current Speed: ${
      currentSpeed
        ? `${currentSpeed} msg/s`
        : chalk.gray(`${currentSpeed} msg/s`)
    }`
  );
}

function updateRecorderStatus() {
  currentSpeed = messagesReceived - lastMessagesReceived;
  lastMessagesReceived = messagesReceived;
  printRecorderStatus();
}
//

function startStreamSimulation(items, req, res) {
  let itemId = 0;
  let connected = true;
  let timeouts = [];

  activeStreams++;

  items.forEach(({ data, received }) => {
    let delay = received - initialStreamStart;
    let timeout = setTimeout(() => {
      if (!connected) return;
      data.created = new Date() / 1000;
      res.write(`id: ${itemId}\n`);
      res.write(`data:${JSON.stringify(data)}\n\n`);
      itemId++;
      messagesSent++;
      printEmitterStatus();
    }, delay);
    timeouts.push(timeout);
  });

  req.on("close", () => {
    connected = false;
    activeStreams--;
    clearTimeouts(timeouts);
  });
}

async function startRecorder(endpoint) {
  const logserver = axios.create({
    baseURL: endpoint,
  });

  const { endpoints } = config.recorder;

  try {
    yaml = (await logserver.get(endpoints.yaml.path)).data;
  } catch (e) {
    yaml = undefined;
  }

  const logStream = new EventSource(`${endpoint}${endpoints.log.path}`);
  const profileStream = new EventSource(`${endpoint}${endpoints.profile.path}`);

  logStream.onopen = () => {
    logsActive = true;
  };

  logStream.onmessage = (m) => {
    messagesReceived++;
    let received = +new Date();
    let data = JSON.parse(m.data);
    logData.push({ received, data });
    printRecorderStatus();
  };

  logStream.onerror = () => {
    logsActive = false;
    logStream.close();
  };

  profileStream.onopen = () => {
    profileActive = true;
  };

  profileStream.onmessage = (m) => {
    messagesReceived++;
    let received = +new Date();
    let data = JSON.parse(m.data);
    profileData.push({ received, data });
    printRecorderStatus();
  };

  profileStream.onerror = () => {
    profileActive = false;
    profileStream.close();
  };
}

async function endRecording() {
  clearInterval(statusInterval);
  let totalLogs = logData.length;
  let totalProfile = profileData.length;
  if (!(totalLogs || totalProfile || yaml)) {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0, null)
    console.log(chalk.redBright("No data recorded"));
    return process.exit();
  }
  const filepath = `${config.recorder.saveDir}/${nanoid()}.json`;

  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  console.log(chalk.yellow("Recording stopped"));
  console.log();
  console.log(chalk.underline("Summary"));
  console.log(
    `Logs: ${totalLogs ? totalLogs : chalk.gray(totalLogs)} | Profile: ${
      totalProfile ? totalProfile : chalk.gray(totalProfile)
    } | YAML: ${yaml ? symbols.success : symbols.error}`
  );
  console.log();
  console.log(chalk.italic("Saving recording..."));
  const data = {
    logs: logData,
    profile: profileData,
    yaml,
  };

  await fs.ensureDir(config.recorder.saveDir);

  try {
    await fs.writeJSON(filepath, data);
    console.log(`Recording saved to ${filepath}`, symbols.success);
  } catch (e) {
    console.log(chalk.red("Error saving file:"), e);
  }

  process.exit();
}

function initRecorder() {
  let endpoint;
  if (typeof argv.record === "boolean") endpoint = config.recorder.url;
  else endpoint = argv.record;

  console.clear();
  console.log(chalk.bgYellow(" Logserver Recorder "));
  console.log();
  console.log("Recording URL:", chalk.underline(endpoint));
  console.log();
  console.log(chalk.underline("Recording Endpoints"));
  Object.values(config.recorder.endpoints).map((e) =>
    console.log(
      e.type === "stream"
        ? chalk.bgMagenta(` ${e.type} `)
        : chalk.bgBlue(` ${e.type} `),
      e.path
    )
  );
  console.log();
  printRecorderStatus();
  statusInterval = setInterval(
    updateRecorderStatus,
    config.updateStatusInterval
  );
  startRecorder(endpoint);

  process.once("SIGINT", endRecording);
}

function initEmitter() {
  const PORT = argv.port || config.emitter.port;
  const flowTemplatePath = argv.source || config.emitter.source;
  flowTemplate = require(`./${flowTemplatePath}`);

  let logsStart = flowTemplate.logs[0].received;
  let profileStart = flowTemplate.profile[0].received;
  initialStreamStart = Math.min(logsStart, profileStart);

  app.listen(PORT, () => {
    console.clear();
    console.log(chalk.bgCyan(" Logserver Simulator "));
    console.log();
    console.log("Using template", chalk.italic(flowTemplatePath));
    console.log();
    console.log("Listening on port", PORT);
    console.log();
    console.log(chalk.underline("Available Endpoints"));
    Object.values(config.emitter.endpoints).map((e) => console.log(e));
    console.log();
    printEmitterStatus();
    statusInterval = setInterval(
      updateEmitterStatus,
      config.updateStatusInterval
    );
  });
}

function clearTimeouts(timeouts) {
  timeouts.forEach((id) => clearTimeout(id));
}

if (argv.record) initRecorder();
else initEmitter();
