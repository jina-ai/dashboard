# Dashboard (beta)

![CD](https://github.com/jina-ai/dashboard/workflows/CD/badge.svg)
[![Jina](https://github.com/jina-ai/jina/blob/master/.github/badges/jina-badge.svg "We fully commit to open-source")](https://jina.ai)
[![Jina License](https://github.com/jina-ai/jina/blob/master/.github/badges/license-badge.svg "Jina is licensed under Apache-2.0")](#license)
[![Jina Docs](https://github.com/jina-ai/jina/blob/master/.github/badges/docs-badge.svg "Checkout our docs and learn Jina")](https://docs.jina.ai)
[![We are hiring](https://github.com/jina-ai/jina/blob/master/.github/badges/jina-corp-badge-hiring.svg "We are hiring full-time position at Jina")](https://jobs.jina.ai)
<a href="https://twitter.com/intent/tweet?text=%F0%9F%91%8DCheck+out+Jina%3A+the+New+Open-Source+Solution+for+Neural+Information+Retrieval+%F0%9F%94%8D%40JinaAI_&url=https%3A%2F%2Fgithub.com%2Fjina-ai%2Fjina&hashtags=JinaSearch&original_referer=http%3A%2F%2Fgithub.com%2F&tw_p=tweetbutton" target="_blank">
<img src="https://github.com/jina-ai/jina/blob/master/.github/badges/twitter-badge.svg"
       alt="tweet button" title="👍Share Jina with your friends on Twitter"></img>
</a>

**console** offers the insight of running tasks in Jina. With dashboard, one can analyze logs, design flows and view Jina Hub images.

<p align="center">
<img src=".github/.README_images/logs-demo.gif?raw=true" alt="flow demo" width="80%">
</p>

🌟 **Features:**

- Log streaming, real-time chart on log-level.
- Grouping logs by Pods, Executors, Levels. Full text search on logs.
- Drag & drop flow design, setting properties of each Pod via a webform.
- Prebuilt pod menu for easy flow design.
- Flow can be imported from/exported to YAML.
- Browse hub images, use your GitHub account to rate and review images.

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Monitor Jina "Hello, World!" with Dashboard](#monitor-jina-hello-world-with-dashboard)
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

Make sure to have Fluentd installed - ```gem install fluentd --no-doc```

Run: ```fluentd -c jina/resources/fluent.conf ``` (file is in https://github.com/jina-ai/jina)

1. Run the following command in the console
   - (Python >=3.7 required)
     ```bash
     JINA_LOG_PROFILING=1 jina hello-world --logserver
     ```
   - ...or if you use Docker (no install required)
     ```
     docker run -e "JINA_LOG_PROFILING=1" -p 5000:5000 jinaai/jina:devel hello-world --logserver
     ```
2. Open https://dashboard.jina.ai in your browser

It should start streaming. If not, please refer to [this step](#2-connect-the-dashboard-to-your-log-server).

## Getting started

### 1. Start the log server

> Set environment variable `JINA_LOG_PROFILING` to `1` to enable Task tab in the dashboard.

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
pods: ...
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

Go to: [https://dashboard.jina.ai](https://dashboard.jina.ai)

Make sure your [settings](https://dashboard.jina.ai/#/settings) are configured correctly to point to your Jina instance.

If you have a running Jina instance, it should connect automatically.

If you start a new Jina instance, click "try again" and it will connect.

Note: make sure you wait for the `logserver` to start before attempting to connect dashboard.

Connection status will be indicated by the globe icon. A red X means the dashboard is not connected to any Jina instance, a green checkmark means there is an active connection.

<p align="center">
<img src=".github/.README_images/2859cc17.png?raw=true" alt="log server settings" width="80%">
</p>

You should now see the log stream and flow visualization.

### Customize the endpoints

By default the configurations of the log server are as follows:

```yaml
host: 0.0.0.0
port: 5000
endpoints:
  log: /stream/log # fetching log in SSE stream
  profile: /stream/profile # fetching profiling log in SSE stream
  yaml: /data/yaml # get the YAML spec of a flow
  shutdown: /action/shutdown # shutdown the log server
  ready: /status/ready # tell if the log server is ready, return 200 if yes
```

You can customize the endpoints of the log server via YAML, say `mylogserver.yml`. Then pass it to the Flow API via

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
2. Install dependencies using command `npm i`.
3. Run dashboard via the following ways .

Note: features like the hub and GitHub login will not work when running locally as they are restricted to the `dashboard.jina.ai` origin. They are not necessary to view logs or interact with flows. If you would like to browse the hub do so from [dashboard.jina.ai](https://dashboard.jina.ai/).

### Run in the debug mode

1. `npm run start_dev-server`

    testServer will be running on `http://localhost:5000` by default
2. `npm run start-dashboard`

    Dashboard will be served on `http://localhost:3000` by default

### Run in the live mode

1. `npm run build-dashboard`
2. `node dashboard`
3. dashboard will be served on `http://localhost:3030` by default

## Contributing

We welcome all kinds of contributions from the open-source community, individuals and partners. Without your active involvement, Jina can't be successful.

The following resources help you to make a good first contribution:

- [Contributing guidelines](https://github.com/jina-ai/jina/blob/master/CONTRIBUTING.md)
- [Release cycles and development stages](https://github.com/jina-ai/jina/blob/master/RELEASE.md)

## License

Copyright (c) 2020 Jina AI Limited. All rights reserved.

Jina is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.
