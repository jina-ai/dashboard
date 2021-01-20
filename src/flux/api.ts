import axios from "axios";
import logger from "../logger";
import { hubURL, timeout } from "./config";
import { Message } from "../redux/logStream/logStream.types";

let logStream: EventSource;
let taskStream: EventSource;

const hub = axios.create({
  baseURL: hubURL,
  withCredentials: true,
  timeout, // 30 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

type UpdateHandler = (update: { type: string; data: string }) => void;

type HandleNewLog = (message: Message) => void;

const api = {
  connect: (
    settings: Settings,
    connectionUpdate: ConnectionUpdate,
    logUpdate: HandleNewLog,
    taskUpdate: UpdateHandler
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
      logger.log("api - taskStream.onopen called");
      taskUpdate({
        type: "connect",
        data: `Task connection established at ${taskString}`,
      });
    };

    taskStream.onmessage = (m) => {
      taskUpdate({ type: "event", data: JSON.parse(m.data) });
    };

    taskStream.onerror = (data) => {
      logger.log("api - taskStream.onerror - ERROR", data);
      taskUpdate({
        type: "error",
        data: `Could not get profile data from ${taskString}`,
      });
      taskStream.close();
    };
  },
  getProfile: async () => {
    const result = await hub.get("profile");
    return result.data;
  },
  getYAML: async (settings: Settings) => {
    const connectionString = `${settings.host}:${settings.port}${
      settings.yaml.startsWith("/") ? settings.yaml : "/" + settings.yaml
    }`;
    logger.log("api - getYAML - connectionString", connectionString);
    const result = await axios.get(connectionString, { timeout });
    return result.data;
  },
  getImages: async () => {
    const result = await hub.get("list");
    return result.data;
  },
  getImage: async (id: string) => {
    const result = await hub.get(`/images/${id}`);
    return result.data;
  },
  postRating: async (imageId: string, stars: any) => {
    const result = await hub.post(`/images/${imageId}/ratings`, { stars });
    return result.data;
  },
  postReview: async (imageId: string, content: any) => {
    const result = await hub.post(`/images/${imageId}/reviews`, { content });
    return result.data;
  },
  searchHub: async (category: string, q: string, sort: string) => {
    const result = await hub.get(
      `/images?category=${category}&q=${q}&sort=${sort}`
    );
    return result.data;
  },
  logOut: async () => {
    const result = await hub.post("/auth/logout");
    return result.data;
  },
};

export default api;
