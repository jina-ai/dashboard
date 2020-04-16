# Dashboard (beta)

![CD](https://github.com/jina-ai/dashboard/workflows/CD/badge.svg)

The dashboard helps you get more insights of a running Jina flow. You can analyze logs, design flows and view Jina Hub images.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Features](#features)
- [Getting started](#getting-started)
- [Development Mode](#development-mode)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Features

- Log streaming, real-time chart on log-level.
- Grouping logs by Pods, Executors. Full text search on logs.
- Drag & drop flow design, setting properties of each Pod via a webform.
- Flow can be imported from/exported to YAML.

## Getting started

### 1. Start the log server

Log server is a helper thread in Jina flow. It exposes HTTP endpoints to the public which the dashboard can use to fetch logs, visualize the flow.    



<table>
<tr>
<td> If you use Flow API in Python, </td>
<td>

```python
from jina.flow import Flow

f = (Flow(logserver=True)
        .add(...)
        .add(...))

with f.build() as fl:
    fl.index(...)
```

</td>
</tr>
<tr>
<td> ...or write a Flow from YAML </td>
<td>

```yaml
# myflow.yml

!Flow
with:
  logserver: true
pods:
  ...
```

```python
f = Flow.load_config('myflow.yml')

with f.build() as fl:
    fl.index(...)
```

</td>
</tr>

<tr>
<td>...or start a Flow from CLI</td>
<td>

```bash
jina flow --logserver --yaml-path myflow.yml
```


</td>
</tr>
</table>


Either way, if you see the following logs show up in the console, then your log server is successfully running. You can now move to the next step.

<p align="center">
<img src=".github/logserver.png?raw=true" alt="logserver success started" width="80%">
</p>

### 2. Connect the Dashboard to your log server

Go to: [https://jina-ai.github.io/dashboard/](https://jina-ai.github.io/dashboard/)

If it has a red cross, click on the globe icon on the top-left corner to connect to the log server.

It should turn into a green check mark, which means the connection is success.

<p align="center">
<img src=".github/.README_images/2859cc17.png?raw=true" alt="log server settings" width="80%">
</p>

You should now see the log-streaming and flow visualization.

### Customize the endpoints

By default the configurations of the log server is as follows:

```yaml
host: 0.0.0.0
port: 5000
endpoints:
  log: /stream/log  # fetching log in SSE stream
  profile: /stream/profile  # fetching profiling log in SSE stream
  yaml: /data/yaml  # get the YAML spec of a flow
  shutdown: /action/shutdown  # shutdown the log server
  ready: /status/ready  # tell if the log server is ready, return 200 if yes
```

You can customize the endpoints of the log server via a YAML, say `mylogserver.yml`. Then pass it to the Flow API via 




<table>
<tr>
<td> If you use Flow API in Python, </td>
<td>

```python
f = Flow(logserver=True, logserver_config='mylogserver.yml')
```

</td>
</tr>
<tr>
<td> ...or write a Flow from YAML </td>
<td>

```yaml
!Flow
with:
  logserver: true
  logserver_config: mylogserver.yml 
```

</td>
</tr>

<tr>
<td>...or start a Flow from CLI</td>
<td>

```bash
jina flow --logserver --logserver-config mylogserver.yml ...
```


</td>
</tr>
</table>







Don't forget to update endpoint in the dashboard accordingly.

<p align="center">
<img src=".github/.README_images/35e39bdd.png?raw=true" alt="log server settings" width="80%">
</p>

## Development Mode

1. Install dependencies using command `yarn`
2. Run dashboard

### Debugging

1. `node testServer`
2.  testServer will be running on `http://localhost:5000` by default
3. `yarn start`
4.  dashboard will be served on `http://localhost:3000` by default

### Live Mode

1. `yarn build`
2. `node dashboard`
3. dashboard will be served on `http://localhost:3030` by default


## Contributing

## License

