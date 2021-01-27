import axios, { AxiosInstance } from "axios";
import logger from "../logger";
import { timeout } from "./config";
import { RawLog } from "./tranformLog";

let jinad: AxiosInstance;

type Settings = {
  host: string;
  port: string | number;
  log: string;
  profile: string;
  yaml: string;
  ready: string;
  shutdown: string;
};

type ConnectionCallback = (data: { connected: boolean; msg?: string }) => void;

type LogHandler = (log: RawLog) => void;

type Args = { [key: string]: string | number | boolean };

export default {
  connect: async (settings: Settings, callback: ConnectionCallback) => {
    logger.log("api - connect - settings", settings);

    const baseURL = `${settings.host}:${settings.port}`;

    jinad = axios.create({ baseURL, timeout });

    let result;
    try {
      result = await jinad.get("/");
      if (result.status === 200) {
        logger.log("api - connect successfully connected to jinad");
        return callback({
          connected: true,
          msg: `Successfully connected to Jina at ${baseURL}`,
        });
      }
    } catch (e) {
      logger.log("api - connect could not connect to jinad:", e);
    }
    return callback({ connected: false });
  },
  getDaemonStatus: async () => {
    try {
      const result = await jinad.get("/status");
      if (result.status === 200)
        return { status: "success", daemonStatus: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  getWorkspaces: async () => {
    try {
      const result = await jinad.get("/workspaces");
      if (result.status === 200)
        return { status: "success", workspaces: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  createWorkspace: async (files: (string | Blob)[]) => {
    const formData = new FormData();
    files.forEach((file: string | Blob) => {
      if (typeof file === "string") formData.append("files", new Blob([file]));
      else formData.append("files", file);
    });
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const result = await jinad.post("/workspaces", formData, options);
      if (result.status === 201)
        return { status: "success", workspace: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  deleteWorkspace: async (workspace_id: string) => {
    try {
      const result = await jinad.delete(`/workspaces/${workspace_id}`);
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - deleteWorkspace ${workspace_id} error: `, e);
    }
    return { status: "error" };
  },
  deleteAllWorkspaces: async () => {
    try {
      const result = await jinad.delete(`/workspaces/all`);
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - deleteAllWorkspaces error: `, e);
    }
    return { status: "error" };
  },
  getFlowArguments: async () => {
    try {
      const result = await jinad.get("/flows/arguments");
      if (result.status === 200)
        return { status: "success", arguments: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  getFlow: async (flow_id: string) => {
    try {
      const result = await jinad.get(`/flows/${flow_id}`);
      if (result.status === 200)
        return { status: "success", flow: result.data };
    } catch (e) {
      logger.log("api - getFlow error getting flow: ", e);
    }
    return { status: "error" };
  },
  startFlow: async (yaml: string, workspace_id?: string) => {
    const formData = new FormData();
    formData.append("flow", new Blob([yaml]));
    if (workspace_id) formData.append("workspace_id", workspace_id);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const result = await jinad.post(`/flows`, formData, options);
      if (result.status === 201)
        return { status: "success", flow: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  terminateFlow: async (flow_id: string) => {
    try {
      const result = await jinad.delete(`/flows/${flow_id}`);
      console.log("terminate result", result);
      if (result.status === 200)
        return { status: "success", flow: result.data };
    } catch (e) {
      logger.log("api - terminateFlow error: ", e);
    }
    return { status: "error" };
  },
  terminateAllFlows: async () => {
    try {
      const result = await jinad.delete("/flows/all");
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log("api - terminateAllFlows error: ", e);
    }
    return { status: "error" };
  },
  getLogs: async (workspace_id: string, flow_id: string) => {
    try {
      const result = await jinad.get(`/logs/${workspace_id}/${flow_id}`);
      if (result.status === 200) {
        const logs = result.data
          .split("\n")
          .filter((line: string) => line !== "")
          .map(JSON.parse);
        return { status: "success", logs };
      }
    } catch (e) {
      logger.log("api - getLogs error: ", e);
    }
    return { status: "error" };
  },
  listenForLogs: async (
    workspace_id: string,
    flow_id: string,
    settings: Settings,
    callback: ConnectionCallback,
    handleLog: LogHandler
  ) => {
    let origin = settings.host
      .replace("http://", "ws://")
      .replace("https://", "wss://");
    const baseURL = `${origin}:${settings.port}/logstream/${workspace_id}/${flow_id}`;
    logger.log("api - listenForLogs - baseURl:", baseURL);
    let socket: WebSocket;
    try {
      socket = new WebSocket(baseURL);
    } catch (e) {
      return callback({ connected: false, msg: e });
    }

    socket.addEventListener("open", () => {
      callback({ connected: true });
      socket.send(JSON.stringify({ from: 0 }));
    });
    socket.addEventListener("message", function (event) {
      logger.log("api - logstream - message received: ", event);
      const log: RawLog = JSON.parse(event.data);
      handleLog(log);
    });
    socket.addEventListener("close", function (event) {
      callback({ connected: false, msg: "Connection closed" });
    });
    socket.addEventListener("error", function (event) {
      callback({ connected: false, msg: "Socket error" });
    });
  },
  getPodArguments: async () => {
    try {
      const result = await jinad.get("/pods/arguments");
      if (result.status === 200)
        return { status: "success", arguments: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  getPod: async (podId: string) => {
    try {
      const result = await jinad.get(`/pods/${podId}`);
      if (result.status === 200) return { status: "success", pod: result.data };
    } catch (e) {
      logger.log(`api - getPod ${podId} error: `, e);
    }
    return { status: "error" };
  },
  startPod: async (podArgs: Args) => {
    try {
      const result = await jinad.post(`/pods`, podArgs);
      if (result.status === 201) return { status: "success", pod: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  terminatePod: async (podId: string) => {
    try {
      const result = await jinad.delete(`/pods/${podId}`);
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - terminatePod ${podId} error: `, e);
    }
    return { status: "error" };
  },
  terminateAllPods: async () => {
    try {
      const result = await jinad.delete(`/pods/all`);
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - terminateAllPods error: `, e);
    }
    return { status: "error" };
  },
  getPeaArguments: async () => {
    try {
      const result = await jinad.get("/peas/arguments");
      if (result.status === 200)
        return { status: "success", arguments: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  getPea: async (peaId: string) => {
    try {
      const result = await jinad.get(`/peas/${peaId}`);
      if (result.status === 200) return { status: "success", pea: result.data };
    } catch (e) {
      logger.log(`api - getPea error getting pea ${peaId}: `, e);
    }
    return { status: "error" };
  },
  startPea: async (peaArgs: Args) => {
    try {
      const result = await jinad.post(`/peas`, peaArgs);
      if (result.status === 201) return { status: "success", pea: result.data };
      return { status: "error", msg: result.data };
    } catch (e) {
      return { status: "error", msg: e };
    }
  },
  terminatePea: async (peaId: string) => {
    try {
      const result = await jinad.delete(`/peas/${peaId}`);
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - terminatePea ${peaId} error: `, e);
    }
    return { status: "error" };
  },
  terminateAllPeas: async () => {
    try {
      const result = await jinad.delete("/peas/all");
      if (result.status === 200) return { status: "success", msg: result.data };
    } catch (e) {
      logger.log(`api - terminateAllPeas error: `, e);
    }
    return { status: "error" };
  },
};
