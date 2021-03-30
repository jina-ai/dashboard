import AxiosMockAdapter from "axios-mock-adapter"
import { jinadInstance } from "../../services/jinad"
import configureMockStore from "redux-mock-store"
import thunk, { ThunkDispatch } from "redux-thunk"
import { FlowState } from "./flows.types"
import { AnyAction } from "redux"

import * as actions from "./flows.actions"
import { testFlowState } from "./flows.testData"
import { State } from ".."
import flowReducer from "./flows.reducer"

const createState = (testFlowState: any) => (actions: any) =>
  actions.reduce(flowReducer, testFlowState)

const mockJinadClient = new AxiosMockAdapter(jinadInstance)

const middlewares = [thunk]
type DispatchExts = ThunkDispatch<State, void, AnyAction>
const mockStore = configureMockStore<FlowState, DispatchExts>(middlewares)

describe("flow actions", () => {
  let store = mockStore(testFlowState)
  const flowId = "_userFlow"
  const workspaceDaemonId = "workspace_daemon_id"
  const flowDaemonId = "flow_daemon_id"

  describe("when starting a flow", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store = mockStore(testFlowState)
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)
      mockJinadClient.onPost("/flows").reply(201, flowDaemonId)
      mockJinadClient.onDelete(`/flows/${flowId}`).reply(200)
    })
    it("should first automatically create a workspace in daemon", () => {
      const expectedAction = {
        type: "UPDATE_SELECTED_WORKSPACE",
        payload: { daemon_id: workspaceDaemonId },
      }
      store.dispatch(actions.startFlow(flowId)).then(() => {
        const calledActions = store.getActions()
        expect(calledActions[0]).toEqual(expectedAction)
      })
    })

    it("should save the flow_id as daemon_id", () => {
      const expectedAction = {
        type: "UPDATE_SELECTED_FLOW",
        payload: { daemon_id: flowDaemonId },
      }

      store.dispatch(actions.startFlow(flowId)).then(() => {
        const calledActions = store.getActions()
        expect(calledActions[1]).toEqual(expectedAction)
      })
    })

    it("should show a success banner when successfully started flow", () => {
      const expectedAction = {
        type: "SHOW_BANNER",
        payload: {
          message:
            "Successfully started flow Custom Flow 1 in workspace Workspace 1.",
          theme: "success",
        },
      }

      store.dispatch(actions.startFlow(flowId)).then(() => {
        const calledActions = store.getActions()
        expect(calledActions[2]).toEqual(expectedAction)
      })
    })

    it("should show an error banner when failed to start flow", () => {
      mockJinadClient.onPost("/flows").reply(400)
      const expectedAction = {
        type: "SHOW_BANNER",
        payload: {
          message: '"Request failed with status code 400"',
          theme: "error",
        },
      }

      store.dispatch(actions.startFlow(flowId)).then(() => {
        const calledActions = store.getActions()
        expect(calledActions[1]).toEqual(expectedAction)
      })
    })
  })

  describe("when stopping a flow that is not deployed", () => {
    beforeEach(() => {
      mockJinadClient.reset()
      store = mockStore(testFlowState)
      mockJinadClient.onPost("/workspaces").reply(201, workspaceDaemonId)
      mockJinadClient.onPost("/flows").reply(201, flowDaemonId)
      mockJinadClient.onDelete(`/flows/${flowId}`).reply(200)
    })
    it("should show an error banner", () => {
      const expectedAction = {
        type: "SHOW_BANNER",
        payload: {
          message: "Flow is not deployed",
          theme: "error",
        },
      }

      store.dispatch(actions.stopFlow(flowId)).then(() => {
        const calledActions = store.getActions()
        expect(calledActions[0]).toEqual(expectedAction)
      })
    })
  })

  describe("when stopping a running flow", () => {
    beforeEach(() => {
      store = mockStore(createState(testFlowState))
    })
    it("should show a success banner", () => {
      const expectedAction = {
        type: "SHOW_BANNER",
        payload: {
          message: "Flow is not deployed",
          theme: "success",
        },
      }

      store.dispatch(actions.startFlow(flowId)).then(() => {
        store.dispatch(actions.stopFlow(flowId)).then(() => {
          console.log("actions: ", store.getActions())
          console.log("state: ", store.getState())
          const calledActions = store.getActions()
          expect(calledActions[0]).toEqual(expectedAction)
        })
      })
    })
  })
})
