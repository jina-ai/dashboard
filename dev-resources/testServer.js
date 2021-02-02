const express = require("express");
const cors = require("cors");
const cliCursor = require("cli-cursor");
const fs = require("fs");
const chalk = require("chalk");
const { v4: uuid, validate: uuidValidate } = require("uuid");
const { argv } = require("yargs");
const readline = require('readline');

const config = require("./config");
const app = express();
const expressWs = require('express-ws')(app);

const multer = require('multer');
const upload = multer();

app.use(cors());

cliCursor.hide();

let _state;
let _activeStreams = 0;
let _currentSpeed = 0;
let _messagesSent = 0;
let _lastMessagesSent = 0;
let _sampleStreamData;


function initSampleDaemon() {
	_state = require("./sample-data/daemon-status.json");
	_state.workspaces.time_created = new Date();
	_state.workspaces.time_updated = new Date();
	_state.pods.time_created = new Date();
	_state.pods.time_updated = new Date();
	_state.flows.time_created = new Date();
	_state.flows.time_updated = new Date();
}

//ENDPOINTS

app.get("/", (req, res) => {
	return res.json({})
});

app.get("/status", (req, res) => {
	return res.json(_state);
})

app.get("/flows", (req, res) => {
	return res.json(_state.flows);
})

app.post("/flows", upload.single("flow"), (req, res) => {
	const yaml_source = req.file.buffer.toString();
	const flow_id = uuid();
	const workspace_id = req.body.workspace_id || uuid();
	const workdir = `tmp/jinad/${workspace_id}`;
	const time_created = new Date();
	const args = {
		name: null,
		log_config: "/usr/local/lib/python3.7/site-packages/jina/resources/logging.default.yml",
		identity: flow_id,
		show_exec_info: false,
		uses: null,
		inspect: 2,
		optimize_level: 0,
	}
	_state.flows.size++;
	_state.flows.num_add++;
	_state.flows.time_updated = new Date();
	_state.flows.items[flow_id] = { time_created, arguments: args, workspace_id, workdir, yaml_source };
	return res.status(201).json(flow_id);
})

app.get("/flows/arguments", (req, res) => {
	return res.json(require("./sample-data/args-flow.json"))
});

app.get("/flows/:id", validateId, ensureResourceExists, (req, res) => {
	const { id } = req.params;
	return res.json(_state.flows.items[id]);
})

app.get("/pods", (req, res) => {
	return res.json(_state.pods);
})

app.get("/pods/arguments", (req, res) => {
	return res.json(require("./sample-data/args-pod.json"))
});

app.get("/pods/:id", validateId, ensureResourceExists, (req, res) => {
	const { id } = req.params;
	return res.json(_state.pods.items[id]);
})

app.get("/peas", (req, res) => {
	return res.json(_state.pods);
})

app.get("/peas/arguments", (req, res) => {
	return res.json(require("./sample-data/args-pea.json"))
});

app.get("/peas/:id", validateId, ensureResourceExists, (req, res) => {
	const { id } = req.params;
	return res.json(_state.peas.items[id]);
})

app.get("/workspaces", (req, res) => {
	return res.json(_state.pods);
})

app.get("/workspaces/:id", validateId, ensureResourceExists, (req, res) => {
	const { id } = req.params;
	return res.json(_state.workspaces.items[id]);
})

app.get("/logs/:workspace_id/:flow_id", (req, res) => {
	fs.readFile("./sample-data/logs.txt", "utf8", (e, d) => {
		return res.send(d)
	})

})

app.ws("/logstream/:workspace_id/:flow_id", (ws, req) => {
	return startStreamSimulation(ws, _sampleStreamData.logs);
})

function startStreamSimulation(ws, logs) {
	let connected = true;
	let timeouts = [];

	_activeStreams++;

	let items = [];
	for (let i = 0; i < config.emitter.messageLoops; ++i) {
		items = items.concat(logs);
	}

	const { messageInterval } = config.emitter;

	items.forEach((log, idx) => {
		let delay = messageInterval * idx;
		let timeout = setTimeout(() => {
			if (!connected) return;
			log.uptime = (new Date()).toISOString();
			ws.send(JSON.stringify(log));
			_messagesSent++;
			printEmitterStatus();
		}, delay);
		timeouts.push(timeout);
	});

	ws.on("close", () => {
		connected = false;
		_activeStreams--;
		clearTimeouts(timeouts);
	});
}

function validateId(req, res, next) {
	const { id } = req.params;
	if (uuidValidate(id))
		return next()
	return res.status(422).json({
		"detail": [
			{
				"loc": [
					"path",
					"id"
				],
				"msg": "value is not a valid uuid",
				"type": "type_error.uuid"
			}
		]
	})
}

function ensureResourceExists(req, res, next) {
	const resource = req.url.split("/")[1];
	const resourceSingular = resource.slice(0, -1);
	const resourceCapitalized = resourceSingular.charAt(0).toUpperCase() + resourceSingular.slice(1);
	const { id } = req.params;
	if (!_state[resource].items[id])
		return res.status(404).json({
			"detail": `${id} not found in <daemon.stores.${resourceSingular}.${resourceCapitalized}Store object at 0x7f61a0f01d90>`
		})
	next();
}

function clearTimeouts(timeouts) {
	timeouts.forEach((id) => clearTimeout(id));
}

function updateEmitterStatus() {
	_currentSpeed = _messagesSent - _lastMessagesSent;
	_lastMessagesSent = _messagesSent;
	printEmitterStatus();
}

function printEmitterStatus() {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(
		`Active Streams: ${_activeStreams ? chalk.green(_activeStreams) : chalk.gray(_activeStreams)
		} | Messages Sent: ${_messagesSent ? _messagesSent : chalk.gray(_messagesSent)
		} | Current Speed: ${_currentSpeed
			? `${_currentSpeed} msg/s`
			: chalk.gray(`${_currentSpeed} msg/s`)
		}`
	);
}

function init() {
	const port = argv.port || config.emitter.port;
	const templatePath = argv.source || config.emitter.source;
	const streamData = require(`./${templatePath}`);

	_sampleStreamData = streamData;

	app.listen(port, () => {
		console.clear();
		console.log(chalk.bgCyan(" Jina Daemon Simulator "));
		console.log();
		console.log("Using template", chalk.italic(templatePath));
		console.log();
		console.log("Listening on port", port);
		console.log();
		console.log(chalk.underline("Available Endpoints"));
		Object.values(config.emitter.endpoints).map((e) => console.log(e));
		console.log();
		printEmitterStatus();
		setInterval(
			updateEmitterStatus,
			config.updateStatusInterval
		);
		initSampleDaemon();
	});
}

init();