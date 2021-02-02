import axios from "axios";
import logger from "../logger";
import { timeout } from "./config";
import { Message } from "../redux/logStream/logStream.types";
import { TaskEvent } from "../redux/task/task.types";

let logStream: EventSource;
let taskStream: EventSource;

type Settings = {
  host: string;
  port: string | number;
  log: string;
  profile: string;
  yaml: string;
  ready: string;
  shutdown: string;
};

type ConnectionUpdate = (messageType: string, message: string) => void;

type TaskEventHandler = (taskEvent: TaskEvent) => void;

type HandleNewLog = (message: Message) => void;

const api = {
  connect: (
    settings: Settings,
    connectionUpdate: ConnectionUpdate,
    logUpdate: HandleNewLog,
    taskEventHandler: TaskEventHandler
  ) => {
    logger.log("api - connect - settings", settings);

    const logString = `${settings.host}:${settings.port}${
      settings.log.startsWith("/") ? settings.log : "/" + settings.log
    }`;
    logger.log("api - connect - logString", logString);
    if (logStream) logStream.close();

    logStream = new EventSource(logString);

    logStream.onopen = () => {
      logger.log("api - logStream.onopen called");
      connectionUpdate(
        "connected",
        `Logserver connection established at ${settings.host}:${settings.port}`
      );
    };

    logStream.onmessage = (m) => {
      logUpdate({ data: JSON.parse(m.data) });
    };

    logStream.onerror = (data) => {
      logger.log("api - logStream.onerror - ERROR", data);
      connectionUpdate(
        "failed",
        `Could not connect to logserver at ${settings.host}:${settings.port}`
      );
      logStream.close();
    };

    const taskString = `${settings.host}:${settings.port}${
      settings.profile.startsWith("/")
        ? settings.profile
        : "/" + settings.profile
    }`;
    logger.log("api - connect - taskString", taskString);

    if (taskStream) taskStream.close();
    taskStream = new EventSource(taskString);

    taskStream.onopen = () => {
      logger.log(
        "api - taskStream.onopen called",
        `Task connection established at ${taskString}`
      );
    };

    taskStream.onmessage = (m) => {
      taskEventHandler(JSON.parse(m.data));
    };

    taskStream.onerror = (data) => {
      logger.log(
        "api - taskStream.onerror - ERROR",
        data,
        `Could not get profile data from ${taskString}`
      );
      taskStream.close();
    };
  },
  getYAML: async (settings: Settings) => {
    const connectionString = `${settings.host}:${settings.port}${
      settings.yaml.startsWith("/") ? settings.yaml : "/" + settings.yaml
    }`;
    logger.log("api - getYAML - connectionString", connectionString);
    const result = await axios.get(connectionString, { timeout });
    return result.data;
  },
};

export default api;
