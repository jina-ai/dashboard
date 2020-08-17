import axios from "axios";
import { hubURL } from "./config";
import { logger } from "../logger";

const moduleLogger = logger.child({ module: "api.js" });

let logStream;
let taskStream;

const hub = axios.create({
  baseURL: hubURL,
  withCredentials: true,
  timeout: 30000, // 30 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default {
  checkConnection: (settings) => {
    moduleLogger.info("checking connection");
    let connectionString = `${settings.host}:${settings.port}${
      settings.ready.startsWith("/") ? settings.ready : "/" + settings.ready
    }`;
    moduleLogger.info("checkConnection string:", connectionString);
    return axios.get(connectionString);
  },
  connect: (settings, logUpdate, taskUpdate) => {
    const logString = `${settings.host}:${settings.port}${
      settings.log.startsWith("/") ? settings.log : "/" + settings.log
    }`;
    moduleLogger.info("logs connectionString: ", logString);
    if (logStream) logStream.close();
    logStream = new EventSource(logString);

    logStream.onopen = () => {
      logUpdate({
        type: "connect",
        data: `Log connection established at ${logString}`,
      });
    };
    logStream.onmessage = (m) => {
      logUpdate({ type: "log", data: JSON.parse(m.data) });
    };
    logStream.onerror = (data) => {
      logUpdate({
        type: "error",
        data: `Could not get log data from ${logString}`,
      });
      logStream.close();
    };

    const taskString = `${settings.host}:${settings.port}${
      settings.profile.startsWith("/")
        ? settings.profile
        : "/" + settings.profile
    }`;
    moduleLogger.info("task connectionString:", taskString);
    if (taskStream) taskStream.close();
    taskStream = new EventSource(taskString);

    taskStream.onopen = () => {
      taskUpdate({
        type: "connect",
        data: `Task connection established at ${taskString}`,
      });
    };
    taskStream.onmessage = (m) => {
      taskUpdate({ type: "event", data: JSON.parse(m.data) });
    };
    taskStream.onerror = (data) => {
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
  getYAML: async (connectionString) => {
    moduleLogger.info("YAML connectionString: ", connectionString);
    const result = await axios.get(connectionString);
    return result.data;
  },
  getImages: async () => {
    moduleLogger.info("get images...");
    const result = await hub.get("images");
    return result.data;
  },
  getImage: async (id) => {
    moduleLogger.info("get image", id);
    const result = await hub.get(`/images/${id}`);
    return result.data;
  },
  postRating: async (imageId, stars) => {
    moduleLogger.info("post rating", imageId, stars);
    const result = await hub.post(`/images/${imageId}/ratings`, { stars });
    return result.data;
  },
  postReview: async (imageId, content) => {
    moduleLogger.info("post review", imageId, content);
    const result = await hub.post(`/images/${imageId}/reviews`, { content });
    return result.data;
  },
  searchHub: async (category, q, sort) => {
    moduleLogger.info("search hub", category, q, sort);
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
