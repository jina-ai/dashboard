
module.exports = {
  updateStatusInterval: 1000,
  jina_version: "0.9.18",
  emitter: {
    port: 5000,
    endpoints: {
      home: {
        path: "/",
        method: "GET",
      },
      status: {
        path: "/status",
        method: "GET",
      },
      getFlows: {
        path: "/flows",
        method: "GET"
      }
    },
    messageInterval: 100,
    messageLoops:100,
    source: "../cypress/fixtures/sample-output.json"
  },
  recorder: {
    url: "http://localhost:5000",
    saveDir: "recordings",
    endpoints: {
      log: {
        path: "/stream/log",
        type: "stream",
      },
      profile: {
        path: "/stream/profile",
        type: "stream",
      },
      yaml: {
        path: "/data/yaml",
        type: "static",
      },
    },
  },
  probe: {
    url: "http://localhost:5555",
    request: {
      interval: 1000,
      route: "api/index",
      method: "post",
      data: { "data": ["hello"] }
    }
  }
};
