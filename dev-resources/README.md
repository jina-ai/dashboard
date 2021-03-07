# Development Resources
This directory includes a variety of development resources to make it easier to build dashboard features in a controlled environment without having to run any Jina instances.

## testserver
The test server is designed to mock a jinad instance.

### Simulating Flows

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