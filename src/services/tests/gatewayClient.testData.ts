import { Settings } from "../../redux/settings/settings.types"

export const status_success_response = {
  jina: {
    jina: "1.0.13",
    "jina-proto": "0.0.79",
    "jina-vcs-tag": "",
    libzmq: "4.3.4",
    pyzmq: "1.20.1",
    protobuf: "3.15.6",
    "proto-backend": "cpp",
    grpcio: "1.36.1",
    pyyaml: "5.4.1",
    python: "3.7.10",
    platform: "Linux",
    "platform-release": "4.19.121-linuxkit",
    "platform-version": "#1 SMP Thu Jan 21 15:36:34 UTC 2021",
    architecture: "x86_64",
    processor: "",
    "jina-resources": "/usr/local/lib/python3.7/site-packages/jina/resources",
  },
  envs: {
    JINA_ARRAY_QUANT: "(unset)",
    JINA_BINARY_DELIMITER: "(unset)",
    JINA_CONTRIB_MODULE: "(unset)",
    JINA_CONTRIB_MODULE_IS_LOADING: "(unset)",
    JINA_CONTROL_PORT: "(unset)",
    JINA_DEFAULT_HOST: "(unset)",
    JINA_DISABLE_UVLOOP: "(unset)",
    JINA_EXECUTOR_WORKDIR: "(unset)",
    JINA_FULL_CLI: "(unset)",
    JINA_IPC_SOCK_TMP: "(unset)",
    JINA_LOG_CONFIG: "(unset)",
    JINA_LOG_ID: "(unset)",
    JINA_LOG_LEVEL: "(unset)",
    JINA_LOG_NO_COLOR: "(unset)",
    JINA_LOG_WORKSPACE: "/tmp/jinad/7238f764-d238-4645-9136-530cc3feccc6",
    JINA_POD_NAME: "(unset)",
    JINA_RAISE_ERROR_EARLY: "(unset)",
    JINA_RANDOM_PORTS: "(unset)",
    JINA_RANDOM_PORT_MAX: "(unset)",
    JINA_RANDOM_PORT_MIN: "(unset)",
    JINA_SOCKET_HWM: "(unset)",
    JINA_VCS_VERSION: "",
    JINA_WARN_UNNAMED: "(unset)",
    JINA_WORKSPACE: "(unset)",
  },
  used_memory: "62.0 KB",
}

export const search_success_response = {
  requestId: "5a63bf5e-7d53-4bd6-af69-cfd76979cf10",
  search: {
    docs: [
      {
        id: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
        weight: 1.0,
        matches: [
          {
            id: "84f67f5a-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Sent From Heaven.\n",
            score: {
              value: 0.012693336,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "545903388e4253a5",
          },
          {
            id: "851c0dc4-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Youd (John Christopher).\n",
            score: {
              value: 0.01274774,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "dbae13ebc76f70b2",
          },
          {
            id: "84563d2e-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "But soon returned to Venice.\n",
            score: {
              value: 0.014065004,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "51ec43514756db4c",
          },
          {
            id: "84c1adde-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Not to be confused with Epperson.\n",
            score: {
              value: 0.014362291,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "451f5c86788f4685",
          },
          {
            id: "8778e20e-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Suchet then focused on crushing Murray.\n",
            score: {
              value: 0.015057244,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "604b7348bb4d9bc4",
          },
          {
            id: "85c35b24-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "She's good (New Zealand).\n",
            score: {
              value: 0.015181756,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "5cb2c5808ed0bff2",
          },
          {
            id: "854c8d78-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Brooks P. Coleman, Sr.\n",
            score: {
              value: 0.015435603,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "e53bb5d81dfc93a9",
          },
          {
            id: "84d23172-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "When Angels Shed Their Wings Vol.\n",
            score: {
              value: 0.015491426,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "3b6f5f190fad0e6d",
          },
          {
            id: "86ecf780-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Another term used is Newcastle Circle.\n",
            score: {
              value: 0.015650136,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "b1ca3e8defa56ff1",
          },
          {
            id: "85a86f12-8722-11eb-afe1-dc1ba1a7eaa4",
            weight: 1.0,
            length: 100,
            mimeType: "text/plain",
            text: "Don't work for Americans.\n",
            score: {
              value: 0.015672252,
              opName: "NumpyIndexer",
              refId: "6dcdd4ee-8bbf-11eb-950c-0242ac110003",
            },
            adjacency: 1,
            contentHash: "d3bced60e396ce38",
          },
        ],
        mimeType: "text/plain",
        text: "Josef Stalin",
        contentHash: "84e80d558e8fb464",
      },
    ],
  },
  status: {},
  queryset: [
    {
      name: "SliceQL",
      parameters: {
        end: 10.0,
      },
      priority: 1,
    },
    {
      name: "VectorSearchDriver",
      parameters: {
        top_k: 10.0,
      },
      priority: 1,
    },
  ],
  routes: [
    {
      pod: "gateway",
      podId: "e7439abb-82c8-4364-ab7f-af367ba25f9c",
      startTime: "2021-03-23T10:06:26.215873Z",
      endTime: "2021-03-23T10:06:26.591515Z",
    },
    {
      pod: "encoder/ZEDRuntime",
      podId: "38d7385f-a5a3-4c4d-aecc-21e65ba9a59e",
      startTime: "2021-03-23T10:06:26.218222Z",
      endTime: "2021-03-23T10:06:26.253017Z",
    },
    {
      pod: "indexer/ZEDRuntime",
      podId: "e13d69d3-aa55-400a-a7be-53681eab7b26",
      startTime: "2021-03-23T10:06:26.254524Z",
      endTime: "2021-03-23T10:06:26.590354Z",
    },
    {
      pod: "gateway",
      podId: "a930b4c2-37e8-4abc-927e-1172a528c7ea",
      startTime: "2021-03-23T10:06:26.591492Z",
    },
  ],
}

export const index_success_response = {
  requestId: "01250e01-6769-48da-b8fc-e6784f762979",
  index: {
    docs: [
      {
        id: "e2088a52-8bbf-11eb-950c-0242ac110003",
        weight: 1.0,
        mimeType: "text/plain",
        text: "Josef Stalin",
        embedding: {
          dense: {
            buffer:
              "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",
            shape: [768],
            dtype: "<f4",
          },
        },
        contentHash: "84e80d558e8fb464",
      },
    ],
  },
  status: {
    code: "ERROR",
    description:
      "AttributeError(\"'NoneType' object has no attribute 'write'\")",
  },
  queryset: [
    {
      name: "SliceQL",
      parameters: {
        end: 10.0,
      },
      priority: 1,
    },
    {
      name: "VectorSearchDriver",
      parameters: {
        top_k: 10.0,
      },
      priority: 1,
    },
  ],
  routes: [
    {
      pod: "gateway",
      podId: "e7439abb-82c8-4364-ab7f-af367ba25f9c",
      startTime: "2021-03-23T10:09:41.216074Z",
      endTime: "2021-03-23T10:09:41.258417Z",
    },
    {
      pod: "encoder/ZEDRuntime",
      podId: "38d7385f-a5a3-4c4d-aecc-21e65ba9a59e",
      startTime: "2021-03-23T10:09:41.217414Z",
      endTime: "2021-03-23T10:09:41.249616Z",
    },
    {
      pod: "indexer/ZEDRuntime",
      podId: "e13d69d3-aa55-400a-a7be-53681eab7b26",
      startTime: "2021-03-23T10:09:41.251683Z",
      endTime: "2021-03-23T10:09:41.254253Z",
      status: {
        code: "ERROR",
        description:
          "AttributeError(\"'NoneType' object has no attribute 'write'\")",
        exception: {
          name: "AttributeError",
          args: ["'NoneType' object has no attribute 'write'"],
          stacks: [
            "Traceback (most recent call last):\n",
            '  File "/opt/conda/lib/python3.7/site-packages/jina/peapods/runtimes/zmq/zed.py", line 159, in _msg_callback\n    self._zmqlet.send_message(self._callback(msg))\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/peapods/runtimes/zmq/zed.py", line 148, in _callback\n    self._pre_hook(msg)._handle(msg)._post_hook(msg)\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/peapods/runtimes/zmq/zed.py", line 141, in _handle\n    self._executor(self.request_type)\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/executors/__init__.py", line 433, in __call__\n    d()\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/drivers/__init__.py", line 301, in __call__\n    self._traverse_apply(self.docs, *args, **kwargs)\n',
            "  File \"/opt/conda/lib/python3.7/site-packages/jina/drivers/__init__.py\", line 306, in _traverse_apply\n    self._apply_root(docs, 'docs', *args, **kwargs)\n",
            '  File "/opt/conda/lib/python3.7/site-packages/jina/drivers/__init__.py", line 279, in _apply_root\n    return self._apply_all(docs, None, field, *args, **kwargs)\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/drivers/index.py", line 41, in _apply_all\n    self.exec_fn(keys, np.stack(embed_vecs))\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/executors/decorators.py", line 40, in arg_wrapper\n    f = func(self, *args, **kwargs)\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/executors/indexers/vector.py", line 131, in add\n    self._add(np_keys, vectors)\n',
            '  File "/opt/conda/lib/python3.7/site-packages/jina/executors/indexers/vector.py", line 135, in _add\n    self.write_handler.write(vectors.tobytes())\n',
            "AttributeError: 'NoneType' object has no attribute 'write'\n",
          ],
          executor: "CompoundIndexer",
        },
      },
    },
    {
      pod: "gateway",
      podId: "a930b4c2-37e8-4abc-927e-1172a528c7ea",
      startTime: "2021-03-23T10:09:41.258343Z",
    },
  ],
}

export const settings: Settings = {
  jinadHost: "http://localhost",
  jinadPort: "5000",
  gatewayHost: "http://localhost",
  gatewayPort: "8000",
  log: "/stream/log",
  profile: "/stream/profile",
  yaml: "/data/yaml",
  shutdown: "/action/shutdown",
  ready: "/status/ready",
}
