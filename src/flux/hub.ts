import axios from "axios";
import logger from "../logger";
import { hubURL, timeout } from "./config";

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

export default {
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
  search: async (category: string, q: string, sort: string) => {
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
