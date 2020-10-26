const fs = require("fs-extra");
const { argv } = require("yargs");

const DEFAULT_DELAY = 250;
const DEFAULT_FILE = "examples/hello-world.json"
const DEFAULT_FILETYPE = "JSON"

async function runConverter() {
  let newData = {
    logs: [],
    profile: [],
    yaml: "",
	};

	const delay = parseInt(argv.delay)|| DEFAULT_DELAY
	const input = argv.input || DEFAULT_FILE;
	const output = `${argv.output||input.split('.').slice(0, -1).join('.')}-gradual.${argv.outputType||DEFAULT_FILETYPE}`
  const initial = JSON.parse(await fs.readFile(input));

	let start = +new Date()
  newData.logs = initial.logs.map((item) => {
    item.received = start += delay;
    return item;
	});

	start = +new Date()
	newData.profile = initial.profile.map((item) => {
    item.received = start += delay;
    return item;
	});

	newData.yaml = initial.yaml;

	fs.writeFile(output,JSON.stringify(newData))
}

runConverter();
