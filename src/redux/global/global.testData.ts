export const testMessage_0 = "testMessage_0";
export const testTheme = "testTheme";
export const testError = "testError";
export const testModal = "logDetails";
export const testModalParams = { param1: "something" };

export const apiArgumentsURL = "https://api.jina.ai/latest.json";

export const testJinaApiResponse = {
  authors: "dev-team@jina.ai",
  description:
    "Jina is the cloud-native neural search solution powered by state-of-the-art AI and deep learning technology",
  docs: "https://docs.jina.ai",
  license: "Apache 2.0",
  methods: [
    {
      name: "hello-world",
      options: [
        {
          choices: null,
          default: "5232ea7b-527d-4782-8958-f665ab236315",
          default_factory: "random_identity",
          default_random: true,
          help:
            "The workdir for hello-world demoall data, indices, shards and outputs will be saved there",
          name: "workdir",
          option_strings: ["--workdir"],
          required: false,
          type: "str",
        },
        {
          choices: null,
          default: 2,
          default_random: false,
          help: "The number of shards when index and query",
          name: "shards",
          option_strings: ["--shards"],
          required: false,
          type: "int",
        },
      ],
    },
    {
      name: "pod",
      options: [
        {
          choices: null,
          default: null,
          default_random: false,
          help:
            "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
          name: "name",
          option_strings: ["--name"],
          required: false,
          type: "str",
        },
        {
          choices: null,
          default: false,
          default_random: false,
          help:
            "If set, then exception stack information to be added to the logging message, useful in debugging",
          name: "hide_exc_info",
          option_strings: ["--hide-exc-info"],
          required: false,
          type: "bool",
        },
        {
          choices: null,
          default: 39399,
          default_factory: "random_port",
          default_random: true,
          help:
            "The port for controlling the runtime, default a random port between [49152, 65535]",
          name: "port_ctrl",
          option_strings: ["--port-ctrl"],
          required: false,
          type: "int",
        },
        {
          choices: null,
          default: null,
          default_random: false,
          help:
            "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
          name: "py_modules",
          option_strings: ["--py-modules"],
          required: false,
          type: "typing.List[str]",
        },
      ],
    },
    {
      name: "flow",
      options: [
        {
          choices: null,
          default: null,
          default_random: false,
          help:
            "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
          name: "name",
          option_strings: ["--name"],
          required: false,
          type: "str",
        },
        {
          choices: null,
          default: false,
          default_random: false,
          help:
            "If set, then exception stack information to be added to the logging message, useful in debugging",
          name: "hide_exc_info",
          option_strings: ["--hide-exc-info"],
          required: false,
          type: "bool",
        },
        {
          choices: null,
          default: null,
          default_random: false,
          help: "The YAML file represents a flow",
          name: "uses",
          option_strings: ["--uses"],
          required: false,
          type: "str",
        },
        {
          choices: ["HANG", "REMOVE", "COLLECT"],
          default: "COLLECT",
          default_random: false,
          help:
            "\nThe strategy on those inspect pods in the flow.\n\nIf `REMOVE` is given then all inspect pods are removed when building the flow.\n",
          name: "inspect",
          option_strings: ["--inspect"],
          required: false,
          type: "str",
        },
      ],
    },
    {
      name: "pea",
      options: [
        {
          choices: null,
          default: null,
          default_random: false,
          help:
            "\nThe name of this object.\n\nThis will be used in the following places:\n- how you refer to this object in Python/YAML/CLI\n- log message\n- ...\n\nWhen not given, then the default naming strategy will apply.\n                    ",
          name: "name",
          option_strings: ["--name"],
          required: false,
          type: "str",
        },
        {
          choices: null,
          default: false,
          default_random: false,
          help:
            "If set, then exception stack information to be added to the logging message, useful in debugging",
          name: "hide_exc_info",
          option_strings: ["--hide-exc-info"],
          required: false,
          type: "bool",
        },
        {
          choices: null,
          default: 35113,
          default_factory: "random_port",
          default_random: true,
          help:
            "The port for controlling the runtime, default a random port between [49152, 65535]",
          name: "port_ctrl",
          option_strings: ["--port-ctrl"],
          required: false,
          type: "int",
        },
        {
          choices: null,
          default: null,
          default_random: false,
          help:
            "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
          name: "py_modules",
          option_strings: ["--py-modules"],
          required: false,
          type: "typing.List[str]",
        },
        {
          choices: [
            "PULL_BIND",
            "PULL_CONNECT",
            "PUSH_BIND",
            "PUSH_CONNECT",
            "SUB_BIND",
            "SUB_CONNECT",
            "PUB_BIND",
            "PUB_CONNECT",
            "PAIR_BIND",
            "PAIR_CONNECT",
            "ROUTER_BIND",
            "DEALER_CONNECT",
          ],
          default: "PULL_BIND",
          default_random: false,
          help: "The socket type for input port",
          name: "socket_in",
          option_strings: ["--socket-in"],
          required: false,
          type: "str",
        },
      ],
    },
  ],
  name: "Jina",
  revision: null,
  source: "https://github.com/jina-ai/jina/tree/master",
  url: "https://jina.ai",
  vendor: "Jina AI Limited",
  version: "0.9.28",
};

export const testDaemonResponseFlowsArguments = {
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
  uses: {
    title: "Uses",
    description: "The YAML file represents a flow",
    type: "string",
  },
  inspect: {
    title: "Inspect",
    description:
      "\nThe strategy on those inspect pods in the flow.\n\nIf `REMOVE` is given then all inspect pods are removed when building the flow.\n",
    default: "COLLECT",
    type: "string",
  },
};

export const testDaemonResponsePodsArguments = {
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
    title: "Port Ctrl",
    description:
      "The port for controlling the runtime, default a random port between [49152, 65535]",
    example: 58537,
    type: "integer",
  },
  py_modules: {
    title: "Py Modules",
    description:
      "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
    type: "array",
    items: { type: "string" },
  },
};

export const testDaemonResponsePeasArguments = {
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
    title: "Port Ctrl",
    description:
      "The port for controlling the runtime, default a random port between [49152, 65535]",
    example: 55791,
    type: "integer",
  },
  py_modules: {
    title: "Py Modules",
    description:
      "\nThe customized python modules need to be imported before loading the executor\n\nNote, when importing multiple files and there is a dependency between them, then one has to write the dependencies in \nreverse order. That is, if `__init__.py` depends on `A.py`, which again depends on `B.py`, then you need to write: \n\n--py-modules __init__.py --py-modules B.py --py-modules A.py\n\n",
    type: "array",
    items: { type: "string" },
  },
  socket_in: {
    title: "Socket In",
    description: "The socket type for input port",
    default: "PULL_BIND",
    type: "string",
  },
};

export const testDaemonResponseStatus = {
  jina: {
    jina: "0.9.28",
    "jina-proto": "0.0.77",
    "jina-vcs-tag": "",
    libzmq: "4.3.4",
    pyzmq: "1.20.0",
    protobuf: "3.14.0",
    "proto-backend": "cpp",
    grpcio: "1.35.0",
    pyyaml: "5.4.1",
    python: "3.7.9",
    platform: "Linux",
    "platform-release": "4.19.121-linuxkit",
    "platform-version": "#1 SMP Tue Dec 1 17:50:32 UTC 2020",
    architecture: "x86_64",
    processor: "",
    "jina-resources": "/usr/local/lib/python3.7/site-packages/jina/resources",
  },
  envs: {
    JINA_ARRAY_QUANT: "(unset)",
    JINA_BINARY_DELIMITER: "(unset)",
    JINA_CONTRIB_MODULE: "(unset)",
    JINA_CONTRIB_MODULE_IS_LOADING: "(unset)",
    JINA_CONTROL_PORT: "(unset)",
    JINA_DEFAULT_HOST: "(unset)",
    JINA_DISABLE_UVLOOP: "(unset)",
    JINA_EXECUTOR_WORKDIR: "(unset)",
    JINA_FULL_CLI: "(unset)",
    JINA_IPC_SOCK_TMP: "(unset)",
    JINA_LOG_CONFIG: "(unset)",
    JINA_LOG_ID: "(unset)",
    JINA_LOG_LEVEL: "(unset)",
    JINA_LOG_NO_COLOR: "(unset)",
    JINA_LOG_WORKSPACE: "(unset)",
    JINA_POD_NAME: "(unset)",
    JINA_RAISE_ERROR_EARLY: "(unset)",
    JINA_RANDOM_PORTS: "(unset)",
    JINA_RANDOM_PORT_MAX: "(unset)",
    JINA_RANDOM_PORT_MIN: "(unset)",
    JINA_SOCKET_HWM: "(unset)",
    JINA_VCS_VERSION: "",
    JINA_WARN_UNNAMED: "(unset)",
    JINA_WORKSPACE: "(unset)",
  },
  peas: {
    size: 0,
    time_created: "2021-02-05T15:20:09.910584",
    time_updated: "2021-02-05T15:20:09.910584",
    num_add: 0,
    num_del: 0,
    items: {},
  },
  pods: {
    size: 0,
    time_created: "2021-02-05T15:20:09.915375",
    time_updated: "2021-02-05T15:20:09.915375",
    num_add: 0,
    num_del: 0,
    items: {},
  },
  flows: {
    size: 0,
    time_created: "2021-02-05T15:20:09.906398",
    time_updated: "2021-02-05T15:20:09.906398",
    num_add: 0,
    num_del: 0,
    items: {},
  },
  workspaces: {
    size: 0,
    time_created: "2021-02-05T15:20:09.920050",
    time_updated: "2021-02-05T15:20:09.920050",
    num_add: 0,
    num_del: 0,
    items: {},
  },
  used_memory: "74.2 KB",
};
