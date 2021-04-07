import AxiosMockAdapter from "axios-mock-adapter"
import { jinadInstance } from "../../services/jinad"
import thunk, { ThunkDispatch } from "redux-thunk"

import * as actions from "./flows.actions"
import { testFiles, testFlowYAML } from "./flows.testData"

import configureMockStore from "redux-mock-store"

import { FlowState } from "./flows.types"
import { AnyAction } from "redux"
import { State } from "../index"

const mockJinadClient = new AxiosMockAdapter(jinadInstance)

const middlewares = [thunk]
type DispatchExts = ThunkDispatch<State, void, AnyAction>
const mockFlowStore = configureMockStore<FlowState, DispatchExts>(middlewares)

describe("flow actions", () => {
  const workspaceDaemonId = "workspace_daemon_id"
  const flowDaemonId = "flow_daemon_id"
  const store = mockFlowStore()

  describe("creating a workspace", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store.clearActions()
    })
    it("should succesfully create a workspace", () => {
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)

      const expectedActions = [
        {
          type: "UPDATE_SELECTED_WORKSPACE",
          payload: { daemon_id: workspaceDaemonId },
        },
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "success",
            message: "Successfully created workspace",
          },
        },
      ]
      store.dispatch(actions.createWorkspaceInDaemon()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it("should show an error when failing to create a workspace", () => {
      mockJinadClient.onPost("/workspaces").reply(400)

      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "error",
            message: "Failed to create a workspace",
          },
        },
      ]
      store.dispatch(actions.createWorkspaceInDaemon()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe("starting a flow", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store.clearActions()
    })

    it("should create a workspace first when no workspace provided", () => {
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)

      const expectedActions = [
        {
          type: "UPDATE_SELECTED_WORKSPACE",
          payload: { daemon_id: workspaceDaemonId },
        },
      ]
      store.dispatch(actions.startFlow(testFlowYAML)).then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })
    })

    it("should throw an error when unable to automatically create a workspace", () => {
      mockJinadClient.onPost("/workspaces").reply(400)

      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: { theme: "error", message: "Failed to create a workspace" },
        },
      ]

      store.dispatch(actions.startFlow(testFlowYAML)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it("should create a workspace and then successfully start a flow when no workspace provided", () => {
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)
      mockJinadClient.onPost("/flows").reply(201, flowDaemonId)

      const expectedActions = [
        {
          type: "UPDATE_SELECTED_WORKSPACE",
          payload: { daemon_id: workspaceDaemonId },
        },
        {
          type: "UPDATE_SELECTED_FLOW",
          payload: { daemon_id: flowDaemonId },
        },
        {
          type: "SHOW_BANNER",
          payload: { theme: "success", message: "Successfully started flow" },
        },
      ]
      store.dispatch(actions.startFlow(testFlowYAML)).then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0])
      })
    })

    it("should successfully start a flow when workspace provided", () => {
      mockJinadClient.onPost("/flows").reply(201, flowDaemonId)

      const expectedActions = [
        {
          type: "UPDATE_SELECTED_FLOW",
          payload: { daemon_id: flowDaemonId },
        },
        {
          type: "SHOW_BANNER",
          payload: { theme: "success", message: "Successfully started flow" },
        },
      ]

      store
        .dispatch(actions.startFlow(testFlowYAML, workspaceDaemonId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it("should show an error when failed to start a flow", () => {
      mockJinadClient.onPost("/flows").reply(400)

      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: { theme: "error", message: "Failed to start flow" },
        },
      ]

      store
        .dispatch(actions.startFlow(testFlowYAML, workspaceDaemonId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe("stopping a flow", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store.clearActions()
    })

    it("should successfully stop a flow", () => {
      mockJinadClient.onDelete(`/flows/${flowDaemonId}`).reply(200)

      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "success",
            message: "Successfully terminated flow",
          },
        },
        {
          type: "UPDATE_SELECTED_FLOW",
          payload: {
            daemon_id: null,
          },
        },
      ]

      store.dispatch(actions.stopFlow(flowDaemonId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it("should show an error when unable to stop flow", () => {
      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "error",
            message: "Failed to terminate flow",
          },
        },
      ]

      store.dispatch(actions.stopFlow(flowDaemonId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe("uploading files to a workspace", () => {
    const filenames = ["testFile1", "testFile2"]

    beforeEach(() => {
      mockJinadClient.reset()
      store.clearActions()
    })

    it("should create a workspace and upload files when no workspace provided", () => {
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)
      mockJinadClient
        .onGet(`/workspaces/${workspaceDaemonId}`)
        .reply(200, { arguments: filenames })

      const expectedActions = [
        {
          type: "UPDATE_SELECTED_WORKSPACE",
          payload: { daemon_id: workspaceDaemonId, files: filenames },
        },
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "success",
            message: "Successfully uploaded files to workspace",
          },
        },
      ]
      store.dispatch(actions.uploadFilesToWorkspace(testFiles)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it("should show an error message if no daemon connected", () => {
      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: { theme: "error", message: "Failed to create a workspace" },
        },
      ]
      store.dispatch(actions.uploadFilesToWorkspace(testFiles)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it("should show an error message if cannot create workspace", () => {
      mockJinadClient.onGet(`/workspaces/${workspaceDaemonId}`).reply(400)
      const expectedActions = [
        {
          type: "SHOW_BANNER",
          payload: { theme: "error", message: "Failed to create a workspace" },
        },
      ]
      store.dispatch(actions.uploadFilesToWorkspace(testFiles)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe("initializing a network flow", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store.clearActions()
    })

    it("should show an error if unable to initialize", () => {
      const expectActions = [
        {
          type: "SHOW_BANNER",
          payload: {
            theme: "error",
            message: `Could not get flow\nFlowId:${flowDaemonId}`,
          },
        },
      ]

      store.dispatch(actions.initNetworkFlow(flowDaemonId)).then(() => {
        expect(store.getActions()).toEqual(expectActions)
      })
    })

    it("should not show any errors if log able to initialize", () => {
      mockJinadClient
        .onGet(`/flows/${flowDaemonId}`)
        .reply(200, { workspace_id: workspaceDaemonId })

      store.dispatch(actions.initNetworkFlow(flowDaemonId)).then(() => {
        expect(store.getActions()).toEqual([])
      })
    })
  })
})
