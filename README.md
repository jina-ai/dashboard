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

**Dashboard** allows you to build Jina Flows using a graphical interface. Drag and drop your pods quickly; no code required! Run Flows and monitor by exploring detailed Logs!

Jina Dashboard is a low-code monitoring and management environment for Jina. With the Dashboard, you can build Jina Flows and manage them from a central location. Get detailed insights into the health of the Flow with the use of log stream analysis!

To use the Jina Dashboard visit [the Jina website](https://dashboard.jina.ai/)

<p align="center">
<img src=".github/.README_images/overview.gif?raw=true" alt="log server settings" width="100%">
</p>

# 🌟 Features:

### **Flow Design GUI**
Use Jina easily in the browser; no code required! Building flows within the user-friendly interface is easy, just start dragging pods into the design canvas. View the list of Pod properties and edit them using a visual menu. To create a custom Flow: connect Pods, upload a YAML file, or use an existing Flow template!

<p align="center">
<img src=".github/.README_images/flowCompose.gif?raw=true" alt="log server settings" width="100%">
</p>


### **LogStream and Task Monitoring**
Dig deeper into your Jina Flow using the LogStream, and debug your Flow by viewing your logs in real-time! Jina makes it extremely easy to stay on top of your search deployment by allowing you to filter, group, and search logs based on Pod, log-level, or message!

<p align="center">
<img src=".github/.README_images/logging.gif?raw=true" alt="log server settings" width="100%">
</p>

### **Hub Integration**
Browse Hub images uploaded by other users! Search and filter images according to various tags. Identify all information needed to use the Hub Pods with ease. All you need is a simple Docker pull command. Embrace the power of Open Source and a community-driven codebase!

# Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [1. Start Jina Daemon](#1-start-jina-daemon)
    - [Using Jina Daemon with Docker (Reccommended)](#jinad-docker)
    - [Using Jina Daemon with CLI (Not reccomended)](#jinad-cli)
  - [2. Connect the Dashboard to Jina Daemon](#2-connect-the-dashboard-to-jina-daemon)
- [Self-host Dashboard](#self-host-dashboard)
  - [Set up](#self-set)
  - [Run dashboard](#self-run)
    - [Run in debug mode](#run-in-debug-mode)
    - [Run in the live mode](#run-in-the-live-mode)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting started
## 1. Start Jina Deamon
In order to use the dashboard you will need to install and run a Jina Deamon. You can do this by either using a Docker container that has been pre-packaged for you or manually using a CLI.
### Using Jina Daemon with Docker (Reccommended)

- Install [Docker](https://www.docker.com/) and run Docker Desktop
- Pull the Docker image with
 ```bash
docker pull jinaai/jina:master-daemon
```
- Run the Docker image with
```bash
docker run -p 8000:8000 -p 5555:5555 jinaai/jina:master-daemon
```
<p align="center">
<img src=".github/.README_images/jinaD_run_docker.png?raw=true" alt="log server settings" width="100%">
</p>

### Using Jina Daemon with CLI (Not reccomended)

- Install [JinaD](../remote/jinad.md)
- Run JinaD with
```bash
jinad
```

<p align="center">
<img src=".github/.README_images/jinaD_run_cli.png?raw=true" alt="log server settings" width="100%">
</p>


## 2. Connect the Dashboard to Jina Daemon

- Go to [Settings](https://dashboard.jina.ai/#/settings)
- Set **host** to: `http://localhost`
- Set **port** to: the port specified when running JinaD (8000 in this example)
- Save changes
- Click 'Refresh' in the bottom right corner

<p align="center">
<img src=".github/.README_images/refresh.png?raw=true" alt="log server settings" width="40%">
</p>

  - The globe icon in the top right corner will indicate connection status. A red X means the Dashboard is not connected to any Jina instance; a green checkmark indicates an active connection. The icon should change to green to show Dashboard, and the Jina Deamon are now connected.

<p align="center">
<img src=".github/.README_images/2859cc17.png?raw=true" alt="log server settings" width="80%">
</p>

 - You should now be able to see the log stream and flow visualization.

# Self-host Dashboard
You can also self-host a dashboard instance locally.

Note: features like the Hub will not work when running the Dashboard locally. They are restricted to the `dashboard.jina.ai` origin. They are not necessary to view logs or interact with flows. If you would like to browse the Hub, do so from [dashboard.jina.ai](https://dashboard.jina.ai/).

## Set up
- Clone the GitHub repo
```bash
git clone https://github.com/jina-ai/dashboard.git && cd dashboard
```
- Install dependencies using command
```bash
npm i
```
## Run dashboard

### Run in debug mode

- Start the testServer
```bash
npm run start_dev-server
```
- testServer should now be running on `http://localhost:5000` by default

- Start the dashboard
```bash
npm run start-dashboard
```

- Dashboard should now be served on `http://localhost:3000` by default

### Run in the live mode

- Build dashboard:
```bash
npm run build-dashboard
```
- Run dashboard:
```bash
node dashboard
```
- Dashboard should now be served on `http://localhost:3030` by default

# Contributing

We welcome all kinds of contributions from the open-source community, individuals and partners. Without your active involvement, Jina can't be successful.

The following resources help you to make a good first contribution:

- [Contributing guidelines](https://github.com/jina-ai/jina/blob/master/CONTRIBUTING.md)
- [Release cycles and development stages](https://github.com/jina-ai/jina/blob/master/RELEASE.md)

# License

Copyright (c) 2020 Jina AI Limited. All rights reserved.

Jina is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.
