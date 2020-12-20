module.exports = {
  updateStatusInterval: 1000,
  emitter: {
    port: 5000,
    endpoints: {
      log: "/stream/log",
      profile: "/stream/profile",
      yaml: "/data/yaml",
    },
    messageInterval: 100,
    source: "examples/hello-world-gradual.json"
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
};
