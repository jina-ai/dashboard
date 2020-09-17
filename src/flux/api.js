import axios from "axios";
import logger from "../logger";
import { hubURL, timeout } from "./config";
let logStream;
let taskStream;

const hub = axios.create({
  baseURL: hubURL,
  withCredentials: true,
  timeout, // 30 secs
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default {
  connect: (settings, connectionUpdate, logUpdate, taskUpdate) => {
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
      logUpdate({ type: "log", data: JSON.parse(m.data) });
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
  getYAML: async (connectionString) => {
    logger.log("api - getYAML - connectionString", connectionString);
    const result = await axios.get(connectionString, { timeout });
    return result.data;
  },
  getImages: async () => {
    const result = await hub.get("images");
    return result.data;
  },
  getImage: async (id) => {
    const result = await hub.get(`/images/${id}`);
    return result.data;
  },
  postRating: async (imageId, stars) => {
    const result = await hub.post(`/images/${imageId}/ratings`, { stars });
    return result.data;
  },
  postReview: async (imageId, content) => {
    const result = await hub.post(`/images/${imageId}/reviews`, { content });
    return result.data;
  },
  searchHub: async (category, q, sort) => {
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
