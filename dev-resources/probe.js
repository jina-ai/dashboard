const axios = require("axios");
const config = require("./config").probe;
const { argv } = require("yargs");

const baseURL = argv.url || config.url;

console.log("probing daemon at",baseURL);

const flow = axios.create({
	baseURL
});

function startProbe() {
	const { interval, method, route, data } = config.request;
	setInterval(() => flow[method](route, data ? JSON.stringify(data) : undefined), interval)
}

startProbe();