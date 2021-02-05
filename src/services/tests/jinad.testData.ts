import { DaemonArgumentsResponse } from "../services.types";

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
};

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
];
