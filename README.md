# Dashboard (beta)

![CD](https://github.com/jina-ai/dashboard/workflows/CD/badge.svg)

**Dashboard** offers the insight of running tasks in Jina. With dashboard, one can analyze logs, design flows and view Jina Hub images.

<p align="center">
<img src=".github/.README_images/flow-demo.gif?raw=true" alt="flow demo" width="80%">
</p>

 🌟 **Features:**

- Log streaming, real-time chart on log-level.
- Grouping logs by Pods, Executors. Full text search on logs.
- Drag & drop flow design, setting properties of each Pod via a webform.
- Flow can be imported from/exported to YAML.


## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [1. Start the log server](#1-start-the-log-server)
  - [2. Connect the Dashboard to your log server](#2-connect-the-dashboard-to-your-log-server)
  - [Customize the endpoints](#customize-the-endpoints)
- [Self-host Dashboard](#self-host-dashboard)
  - [Run in the debug mode](#run-in-the-debug-mode)
  - [Run in the live mode](#run-in-the-live-mode)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Monitor Jina "Hello, World!" with Dashboard

Jina "Hello, World" is a simple demo of image neural search for Fashion-MNIST.

1. Run the following command in the console
   - `jina hello-world` (Python 3.7 required)
   - ...or if you use Docker `docker run -p 5000:5000 jinaai/jina:devel hello-world --logserver`
2. Open https://dashboard.jina.ai in your browser

It should start streaming. If not, please refer to [this step](#2-connect-the-dashboard-to-your-log-server).


## Getting started

### 1. Start the log server

Log server is a helper thread in Jina flow. It exposes HTTP endpoints to the public which the dashboard can use to fetch logs, visualize the flow. 

By default the log server is disabled. To enable it you can,

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

<tr>
<td>...or start a Flow with Docker Container</td>
<td>

```bash
docker run -p 5000:5000 jina flow --logserver ...
```
</td>
</tr>
</table>


Either way, if you see the following logs show up in the console, then your log server is successfully running. You can now move to the next step.

<p align="center">
<img src=".github/.README_images/logserver.png?raw=true" alt="logserver success started" width="80%">
</p>

### 2. Connect the Dashboard to your log server

Go to: [https://jina-ai.github.io/dashboard/](https://jina-ai.github.io/dashboard/)

Click on the globe icon on the top-left corner to connect to the log server.

It should turn into a green check mark, which means the connection is success.

<p align="center">
<img src=".github/.README_images/2859cc17.png?raw=true" alt="log server settings" width="80%">
</p>

You should now see the log-streaming and flow visualization. 

If it has a red cross, it means the connection is lost or the endpoint is not set correctly. Please move to the next step for instruction.

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

<tr>
<td>...or start a Flow with Docker Container</td>
<td>

```bash
docker run -p PORT:PORT -v "$(PWD)/mylogserver.yml:/mylogserver.yml" jina flow --logserver --logserver-config /mylogserver.yml ...
```

where `PORT` is the folow defined in your YAML config
</td>
</tr>
</table>







Don't forget to update endpoint in the dashboard accordingly.

<p align="center">
<img src=".github/.README_images/35e39bdd.png?raw=true" alt="log server settings" width="80%">
</p>

## Self-host Dashboard

One can self-host a dashboard locally.

1. `git clone https://github.com/jina-ai/dashboard.git && cd dashboard`.
2. Install dependencies using command `yarn`.
3. Run dashboard via the following ways .

### Run in the debug mode

1. `node testServer`
2.  testServer will be running on `http://localhost:5000` by default
3. `yarn start`
4.  dashboard will be served on `http://localhost:3000` by default

### Run in the live mode

1. `yarn build`
2. `node dashboard`
3. dashboard will be served on `http://localhost:3030` by default

## Contributing

## License

