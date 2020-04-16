# Dashboard (beta)

The dashboard helps you get more insights of a running Jina flow. You can analyze logs, design flows and view Jina Hub images.

## Features

- Log streaming, real-time chart on log-level.
- Grouping logs by Pods, Executors. Full text search on logs.
- Drag & drop flow design, setting properties of each Pod via a webform.
- Flow can be imported from/exported to YAML.

## Getting started

### 1. Start the log server

Log server is a helper thread in Jina flow. It exposes HTTP endpoints to the public which the dashboard can use to fetch logs, visualize the flow.    

#### If you use Flow API in Python,

```python
from jina.flow import Flow

f = (Flow(logserver=True)
        .add(...)
        .add(...))

with f.build() as fl:
    fl.index(...)
```

#### ...or write a Flow from YAML

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

#### ...or start a Flow from CLI

```bash
jina flow --logserver --yaml-path myflow.yml 
```

![logserver](.github/logserver.svg)


### 2. Opening t


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

