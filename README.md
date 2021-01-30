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

**Dashboard** allows you to build, run, monitor, and manage flows using a graphical UI.

<p align="center">
<img src=".github/.README_images/logs-demo.gif?raw=true" alt="flow demo" width="80%">
</p>

🌟 **Features:**

- Start and terminate flows
- Log streaming, real-time chart on log-level.
- Grouping logs by Pods, Executors, Levels. Full text search on logs.
- Drag & drop flow design, setting properties of each Pod via a webform.
- Prebuilt pod menu for easy flow design.
- Flow can be imported from/exported to YAML.
- Browse hub images, use your GitHub account to rate and review images.

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [1. Start Jina Daemon](#1-start-jina-daemon)
  - [2. Connect the Dashboard to Jina Daemon](#2-connect-the-dashboard-to-jina-daemon)
- [Self-host Dashboard](#self-host-dashboard)
  - [Run in debug mode](#run-in-debug-mode)
  - [Run in the live mode](#run-in-the-live-mode)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

### 1. Start Jina Daemon

#### Using Docker

`docker run -d -p 8000:8000 jinaai/jina:latest-daemon`

This will run the daemon and expose it at `http://localhost:8000`

#### Using Python

`jinad`


### 2. Connect the Dashboard to Jina Daemon

Go to: [https://dashboard.jina.ai](https://dashboard.jina.ai)

Make sure your [settings](https://dashboard.jina.ai/#/settings) are configured correctly to point to your Jina instance.

If you have a running Jina instance and your settings configured, it should connect automatically.

If you start a new Jina instance, click "try again" and it will connect.

Connection status will be indicated by the globe icon. A red X means the dashboard is not connected to any Jina instance, a green checkmark means there is an active connection.

<p align="center">
<img src=".github/.README_images/2859cc17.png?raw=true" alt="log server settings" width="80%">
</p>

You should now see the log stream and flow visualization.

## Self-host Dashboard

One can self-host a dashboard locally.

1. `git clone https://github.com/jina-ai/dashboard.git && cd dashboard`.
2. Install dependencies using command `npm i`.
3. Run dashboard via the following ways .

Note: features like the hub and GitHub login will not work when running locally as they are restricted to the `dashboard.jina.ai` origin. They are not necessary to view logs or interact with flows. If you would like to browse the hub do so from [dashboard.jina.ai](https://dashboard.jina.ai/).

### Run in debug mode

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
