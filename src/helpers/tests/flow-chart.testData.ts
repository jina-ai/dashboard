import { FlowArguments } from "../../redux/flows/flows.types"

export const legacyYAML = `!Flow
pods:
  segmenter:
    uses: pods/segment.yml
    read_only: true
  encoder:
    uses: pods/encode.yml
    polling: any
    timeout_ready: 600000
    read_only: true
  chunk_idx:
    polling: any
    uses: pods/chunk.yml
  doc_idx:
    polling: any
    uses: pods/doc.yml
    needs: gateway
  join_all:
    uses: _merge
    needs: [doc_idx,chunk_idx]
`

export const v1YAML = `!Flow
version: '1'
pods:
  - name: segmenter
    uses: pods/segment.yml
    read_only: true
  - name: encoder
    uses: pods/encode.yml
    polling: any
    timeout_ready: 600000
    read_only: true
  - name: chunk_idx
    polling: any
    uses: pods/chunk.yml
  - name: doc_idx
    polling: any
    uses: pods/doc.yml
    needs: gateway
  - name: join_all
    uses: _merge
    needs: [doc_idx, chunk_idx]
`

export const formattedFlow = {
  elements: [
    {
      id: "gateway",
      type: "gateway",
      position: { y: 150, x: 250 },
      data: {
        name: "gateway",
        label: "gateway",
        depth: 0,
      },
    },
    {
      id: "segmenter",
      type: "pod",
      position: { y: 300, x: 250 },
      data: {
        name: "segmenter",
        label: "segmenter",
        needs: ["gateway"],
        uses: "pods/segment.yml",
        read_only: true,
        depth: 1,
      },
    },
    {
      id: "encoder",
      type: "pod",
      position: { y: 450, x: 250 },
      data: {
        name: "encoder",
        label: "encoder",
        needs: ["segmenter"],
        uses: "pods/encode.yml",
        polling: "any",
        timeout_ready: 600000,
        read_only: true,
        depth: 2,
      },
    },
    {
      id: "chunk_idx",
      type: "pod",
      position: { y: 600, x: 250 },
      data: {
        name: "chunk_idx",
        label: "chunk_idx",
        needs: ["encoder"],
        polling: "any",
        uses: "pods/chunk.yml",
        depth: 3,
      },
    },
    {
      id: "doc_idx",
      type: "pod",
      position: { y: 300, x: 500 },
      data: {
        name: "doc_idx",
        label: "doc_idx",
        needs: ["gateway"],
        polling: "any",
        uses: "pods/doc.yml",
        depth: 1,
      },
    },
    {
      id: "join_all",
      type: "pod",
      position: { y: 750, x: 250 },
      data: {
        name: "join_all",
        label: "join_all",
        needs: ["doc_idx", "chunk_idx"],
        uses: "_merge",
        depth: 4,
      },
    },
    {
      id: "e-gateway-to-segmenter",
      source: "gateway",
      target: "segmenter",
      type: "step",
    },
    {
      id: "e-segmenter-to-encoder",
      source: "segmenter",
      target: "encoder",
      type: "step",
    },
    {
      id: "e-encoder-to-chunk_idx",
      source: "encoder",
      target: "chunk_idx",
      type: "step",
    },
    {
      id: "e-gateway-to-doc_idx",
      source: "gateway",
      target: "doc_idx",
      type: "step",
    },
    {
      id: "e-doc_idx-to-join_all",
      source: "doc_idx",
      target: "join_all",
      type: "step",
    },
    {
      id: "e-chunk_idx-to-join_all",
      source: "chunk_idx",
      target: "join_all",
      type: "step",
    },
  ],
}

export const formattedFlowAsYaml = `!Flow
with:
  board:
    canvas:
      gateway:
        x: 250
        y: 150
      segmenter:
        x: 250
        y: 300
      encoder:
        x: 250
        y: 450
      chunk_idx:
        x: 250
        y: 600
      doc_idx:
        x: 500
        y: 300
      join_all:
        x: 250
        y: 750
pods:
  segmenter:
    needs: gateway
    uses: pods/segment.yml
    read_only: true
  encoder:
    needs: segmenter
    uses: pods/encode.yml
    polling: any
    timeout_ready: 600000
    read_only: true
  chunk_idx:
    needs: encoder
    polling: any
    uses: pods/chunk.yml
  doc_idx:
    needs: gateway
    polling: any
    uses: pods/doc.yml
  join_all:
    needs:
      - doc_idx
      - chunk_idx
    uses: _merge
`

export const flowArguments: FlowArguments = {
  version: "1",
  flow: [],
  pea: [],
  pod: [
    {
      name: "name",
      description:
        "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
      type: "string",
    },
    {
      name: "log_config",
      description: "The YAML config of the logger used in this object.",
      defaultValue:
        "/usr/local/lib/python3.7/site-packages/jina/resources/logging.default.yml",
      type: "string",
    },
    {
      name: "hide_exc_info",
      description:
        "If set, then exception stack information to be added to the logging message, useful in debugging",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "port_ctrl",
      description:
        "The port for controlling the runtime, default a random port between [49152, 65535]",
      type: "integer",
    },
    {
      name: "ctrl_with_ipc",
      description: "If set, use ipc protocol for control socket",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "timeout_ctrl",
      description:
        "The timeout in milliseconds of the control request, -1 for waiting forever",
      defaultValue: 5000,
      type: "integer",
    },
    {
      name: "ssh_server",
      description:
        "The SSH server through which the tunnel will be created, can actually be a fully specified `user@server:port` ssh url.",
      type: "string",
    },
    {
      name: "ssh_keyfile",
      description:
        "This specifies a key to be used in ssh login, default None. regular default ssh keys will be used without specifying this argument.",
      type: "string",
    },
    {
      name: "ssh_password",
      description: "The ssh password to the ssh server.",
      type: "string",
    },
    {
      name: "uses",
      description:
        "\nThe config of the executor, it could be one of the followings: \n- an Executor-level YAML file path (*.yml/yaml) \n- a name of a class inherited from `jina.Executor`\n- a docker image (must start with `docker://`)\n- builtin executors, e.g. `_pass`, `_logforward`, `_merge` \n- the string literal of a YAML config (must start with `!`)\n- the string literal of a JSON config\n- the string literal of a YAML driver config (must start with `- !!`)\n\nWhen use it under Python, one can use the following values additionally:\n- a Python dict that represents the config\n- a text file stream has `.read()` interface\n",
      defaultValue: "_pass",
      type: "string",
    },
    {
      name: "py_modules",
      description:
        "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
      type: "string",
    },
    {
      name: "port_in",
      description:
        "The port for input data, default a random port between [49152, 65535]",
      type: "integer",
    },
    {
      name: "port_out",
      description:
        "The port for output data, default a random port between [49152, 65535]",
      type: "integer",
    },
    {
      name: "host_in",
      description: "The host address for input, by default it is 0.0.0.0",
      defaultValue: "0.0.0.0",
      type: "string",
    },
    {
      name: "host_out",
      description: "The host address for output, by default it is 0.0.0.0",
      defaultValue: "0.0.0.0",
      type: "string",
    },
    {
      name: "socket_in",
      description: "The socket type for input port",
      defaultValue: "PULL_BIND",
      type: "string",
    },
    {
      name: "socket_out",
      description: "The socket type for output port",
      defaultValue: "PUSH_BIND",
      type: "string",
    },
    {
      name: "dump_interval",
      description:
        "Serialize the model in the pod every n seconds if model changes. -1 means --read-only. ",
      defaultValue: 240,
      type: "integer",
    },
    {
      name: "read_only",
      description:
        "If set, do not allow the pod to modify the model, dump_interval will be ignored",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "memory_hwm",
      description:
        "The memory high watermark of this pod in Gigabytes, pod will restart when this is reached. -1 means no restriction",
      defaultValue: -1,
      type: "integer",
    },
    {
      name: "on_error_strategy",
      description:
        "\nThe skip strategy on exceptions.\n\n- IGNORE: Ignore it, keep running all Drivers & Executors logics in the sequel flow\n- SKIP_EXECUTOR: Skip all Executors in the sequel, but drivers are still called\n- SKIP_HANDLE: Skip all Drivers & Executors in the sequel, only `pre_hook` and `post_hook` are called\n- THROW_EARLY: Immediately throw the exception, the sequel flow will not be running at all \n                    \nNote, `IGNORE`, `SKIP_EXECUTOR` and `SKIP_HANDLE` do not guarantee the success execution in the sequel flow. If something \nis wrong in the upstream, it is hard to carry this exception and moving forward without any side-effect.\n",
      defaultValue: "IGNORE",
      type: "string",
    },
    {
      name: "num_part",
      description:
        "the number of messages expected from upstream, 0 and 1 means single part",
      defaultValue: 0,
      type: "integer",
    },
    {
      name: "uses_internal",
      description:
        '\nThe config runs inside the Docker container. \n\nSyntax and function are the same as `--uses`. This is designed when `--uses="docker://..."` this config is passed to \nthe Docker container.\n',
      defaultValue: "BaseExecutor",
      type: "string",
    },
    {
      name: "entrypoint",
      description:
        "The entrypoint command overrides the ENTRYPOINT in Docker image. when not set then the Docker image ENTRYPOINT takes effective.",
      type: "string",
    },
    {
      name: "pull_latest",
      description: "Pull the latest image before running",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "volumes",
      description:
        '\nThe path on the host to be mounted inside the container. \n\nNote, \n- If separated by `:`, then the first part will be considered as the local host path and the second part is the path in the container system. \n- If no split provided, then the basename of that directory will be mounted into container\'s root path, e.g. `--volumes="/user/test/my-workspace"` will be mounted into `/my-workspace` inside the container. \n- All volumes are mounted with read-write mode.\n',
      type: "string",
    },
    {
      name: "host",
      description: "The host address of the runtime, by default it is 0.0.0.0.",
      defaultValue: "0.0.0.0",
      type: "string",
    },
    {
      name: "port_expose",
      description: "The port of the host exposed to the public",
      type: "integer",
    },
    {
      name: "silent_remote_logs",
      description:
        "Do not display the streaming of remote logs on local console",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "upload_files",
      description:
        "\nThe files on the host to be uploaded to the remote\nworkspace. This can be useful when your Pod has more\nfile dependencies beyond a single YAML file, e.g.\nPython files, data files.\n\nNote,\n- currently only flatten structure is supported, which means if you upload `[./foo/a.py, ./foo/b.pp, ./bar/c.yml]`, then they will be put under the _same_ workspace on the remote, losing all hierarchies.\n- by default, `--uses` YAML file is always uploaded.\n- uploaded files are by default isolated across the runs. To ensure files are submitted to the same workspace across different runs, use `--workspace-id` to specify the workspace.\n",
      type: "string",
    },
    {
      name: "workspace_id",
      description:
        "the UUID for identifying the workspace. When not given a random id will be assigned.Multiple Pea/Pod/Flow will work under the same workspace if they share the same `workspace-id`.",
      type: "string",
    },
    {
      name: "daemon",
      description:
        "The Pea attempts to terminate all of its Runtime child processes/threads on existing. setting it to true basically tell the Pea do not wait on the Runtime when closing",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "runtime_backend",
      description: "The parallel backend of the runtime inside the Pea",
      defaultValue: "PROCESS",
      type: "string",
    },
    {
      name: "runtime_cls",
      description: "The runtime class to run inside the Pea",
      defaultValue: "ZEDRuntime",
      type: "string",
    },
    {
      name: "timeout_ready",
      description:
        "The timeout in milliseconds of a Pea waits for the runtime to be ready, -1 for waiting forever",
      defaultValue: 10000,
      type: "integer",
    },
    {
      name: "expose_public",
      description:
        "If set, expose the public IP address to remote when necessary, by default it exposesprivate IP address, which only allows accessing under the same network/subnet. Important to set this to true when the Pea will receive input connections from remote Peas",
      defaultValue: false,
      type: "boolean",
    },
    {
      name: "pea_id",
      description: "defines the suffix for the workspace path of the pea`",
      defaultValue: 0,
      type: "integer",
    },
    {
      name: "pea_role",
      description: "The role of this Pea in a Pod",
      defaultValue: "SINGLETON",
      type: "string",
    },
    {
      name: "uses_before",
      description:
        "The executor attached after the Peas described by --uses, typically before sending to all parallels, accepted type follows `--uses`",
      type: "string",
    },
    {
      name: "uses_after",
      description:
        "The executor attached after the Peas described by --uses, typically used for receiving from all parallels, accepted type follows `--uses`",
      type: "string",
    },
    {
      name: "parallel",
      description:
        "The number of parallel peas in the pod running at the same time, `port_in` and `port_out` will be set to random, and routers will be added automatically when necessary",
      defaultValue: 1,
      type: "integer",
    },
    {
      name: "polling",
      description:
        "\nThe polling strategy of the Pod (when `parallel>1`) \n- ANY: only one (whoever is idle) Pea polls the message\n- ALL: all Peas poll the message (like a broadcast)\n",
      defaultValue: "ANY",
      type: "string",
    },
    {
      name: "scheduling",
      description: "The strategy of scheduling workload among Peas",
      defaultValue: "LOAD_BALANCE",
      type: "string",
    },
    {
      name: "pod_role",
      description: "The role of this pod in the flow",
      type: "string",
    },
  ],
}
