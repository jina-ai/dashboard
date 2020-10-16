# Development Resources
This directory includes a variety of development resources to make it easier to build dashboard features in a controlled environment without having to run any Jina instances.

## testserver
The test server has two functions:
1. Record jina flows
2. Simulate jina flows

### Recording Flows
To record, start a Jina flow and make sure the logserver is enabled. The recorder will connect to the corresponding `url` and store the data received from `yaml`, `profile`, and `log` endpoints as defined in `config.js`. To end the recording, type `ctrl+c` and the recorder will generate a JSON file with the data of the session.

To start recording, run:
```bash
node testserver --record
```

You can override config and point to a specific URL using:
```bash
node testserver --record=<CUSTOM_URL>
```

### Simulating Flows
Once you have a valid recorded flow, you can play it back via SSE. A local server is started and transmission begins when a request arrives. Events are scheduled for transmission by their `received` property to simulate order and frequency.

To start a flow simulation, run:
```bash
node testserver
```
You can override config and specify a source by using:
```bash
node testserver --source=<PATH_TO_SOURCE>
```
To specify a port:
```bash
node testserver --port=<PORT_NUMBER>
```