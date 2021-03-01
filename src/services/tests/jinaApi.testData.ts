import { JinaApiMethodOption } from "../services.types"

export const apiMethodOptions: JinaApiMethodOption[] = [
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
]

export const parsedArguments = [
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
]
