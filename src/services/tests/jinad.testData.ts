import { DaemonArgumentsResponse } from "../services.types"

export const daemonArgumentsResponse: DaemonArgumentsResponse = {
  name: {
    title: "Name",
    description:
      "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
    type: "string",
  },
  hide_exc_info: {
    title: "Hide Exc Info",
    description:
      "If set, then exception stack information to be added to the logging message, useful in debugging",
    default: false,
    type: "boolean",
  },
  port_ctrl: {
    default: 39399,
    title: "Port Ctrl",
    description:
      "The port for controlling the runtime, default a random port between [49152, 65535]",
    example: 51801,
    type: "integer",
  },
  py_modules: {
    title: "Py Modules",
    description:
      "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
    type: "array",
    items: { type: "string" },
  },
  pod_role: {
    title: "Pod Role",
    description: "The role of this pod in the flow",
    type: "string",
  },
}

export const parsedDaemonArgumentResponse = [
  {
    description:
      "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
    name: "name",
    type: "string",
  },
  {
    defaultValue: false,
    description:
      "If set, then exception stack information to be added to the logging message, useful in debugging",
    name: "hide_exc_info",
    type: "boolean",
  },
  {
    defaultValue: 39399,
    description:
      "The port for controlling the runtime, default a random port between [49152, 65535]",
    name: "port_ctrl",
    type: "integer",
  },
  {
    description:
      "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
    name: "py_modules",
    type: "string",
  },
  {
    description: "The role of this pod in the flow",
    name: "pod_role",
    type: "string",
  },
]

export const settings = {
  host: "http://localhost",
  port: "5000",
  log: "",
  profile: "",
  yaml: "",
  ready: "",
  shutdown: "",
}

export const workspace_id = "test_workspace_id"

export const flow_id = "test_flow_id"

export const sample_logs = `{"host":"b05865bcb249","process":"309","type":"INFO","name":"pod1","uptime":"2021-01-28T22:37:46.377569","context":"pod1/ZEDRuntime","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"input \u001B[33mtcp://0.0.0.0:36909\u001B[0m (PULL_BIND) output \u001B[33mtcp://0.0.0.0:38619\u001B[0m (PUSH_CONNECT) control over \u001B[33mtcp://0.0.0.0:45171\u001B[0m (PAIR_BIND)"}
{"host":"b05865bcb249","process":"309","type":"INFO","name":"pod1","uptime":"2021-01-28T22:37:46.377569","context":"pod1","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"starting jina.peapods.runtimes.zmq.zed.ZEDRuntime..."}
{"host":"b05865bcb249","process":"1","type":"SUCCESS","name":"pod1","uptime":"2021-01-28T22:37:46.377569","context":"pod1","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"ready and listening"}
{"host":"b05865bcb249","process":"316","type":"INFO","name":"pod2","uptime":"2021-01-28T22:37:46.377569","context":"pod2","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"starting jina.peapods.runtimes.zmq.zed.ZEDRuntime..."}
{"host":"b05865bcb249","process":"316","type":"INFO","name":"pod2","uptime":"2021-01-28T22:37:46.377569","context":"pod2/ZEDRuntime","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"input \u001B[33mtcp://0.0.0.0:38619\u001B[0m (PULL_BIND) output \u001B[33mtcp://0.0.0.0:35817\u001B[0m (PUSH_CONNECT) control over \u001B[33mtcp://0.0.0.0:47221\u001B[0m (PAIR_BIND)"}
{"host":"b05865bcb249","process":"1","type":"SUCCESS","name":"pod2","uptime":"2021-01-28T22:37:46.377569","context":"pod2","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"ready and listening"}
{"host":"b05865bcb249","process":"323","type":"INFO","name":"pod3","uptime":"2021-01-28T22:37:46.377569","context":"pod3/ZEDRuntime","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"input \u001B[33mtcp://0.0.0.0:35817\u001B[0m (PULL_BIND) output \u001B[33mtcp://0.0.0.0:48103\u001B[0m (PUSH_BIND) control over \u001B[33mtcp://0.0.0.0:48321\u001B[0m (PAIR_BIND)"}
{"host":"b05865bcb249","process":"323","type":"INFO","name":"pod3","uptime":"2021-01-28T22:37:46.377569","context":"pod3","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"starting jina.peapods.runtimes.zmq.zed.ZEDRuntime..."}
{"host":"b05865bcb249","process":"1","type":"SUCCESS","name":"pod3","uptime":"2021-01-28T22:37:46.377569","context":"pod3","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"ready and listening"}
{"host":"b05865bcb249","process":"330","type":"INFO","name":"gateway","uptime":"2021-01-28T22:37:46.377569","context":"gateway","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"starting jina.peapods.runtimes.asyncio.rest.RESTRuntime..."}
{"host":"b05865bcb249","process":"1","type":"SUCCESS","name":"gateway","uptime":"2021-01-28T22:37:46.377569","context":"gateway","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"ready and listening"}
{"host":"b05865bcb249","process":"1","type":"INFO","name":"Flow","uptime":"2021-01-28T22:37:46.377569","context":"Flow","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"4 Pods (i.e. 4 Peas) are running in this Flow"}
{"host":"b05865bcb249","process":"1","type":"SUCCESS","name":"Flow","uptime":"2021-01-28T22:37:46.377569","context":"Flow","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"🎉 Flow is ready to use, accepting \u001B[1mREST request\u001B[0m"}
{"host":"b05865bcb249","process":"1","type":"INFO","name":"Flow","uptime":"2021-01-28T22:37:46.377569","context":"Flow","workspace_path":"/tmp/jinad/32aeb2f0-8eb2-4c9d-8105-229743aa3418","log_id":"666184d9-428e-42cc-a43f-144b371e9ab9","message":"\n\t🖥️ Local access:\t\u001B[4m\u001B[36mhttp://0.0.0.0:5555\u001B[0m\n\t🔒 Private network:\t\u001B[4m\u001B[36mhttp://172.17.0.2:5555\u001B[0m\n\t🌐 Public address:\t\u001B[4m\u001B[36mhttp://70.142.50.58:5555\u001B[0m"}`
