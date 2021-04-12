import reducer from "./global.reducer"
import {
  HIDE_BANNER_TIMEOUT,
  getInitialGlobalState,
  GITHUBLOGIN,
  SHOW_ERROR,
} from "./global.constants"
import { handleNewLog } from "../logStream/logStream.actions"
import { testMessage } from "../logStream/logStream.testData"
import logger from "../../logger"
import {
  closeModal,
  _handleConnectionStatus,
  _hideBanner,
  _showBanner,
  showError,
  showModal,
  toggleSidebar,
  showBanner,
  handleConnectionStatus,
  loginGithub,
  logout,
} from "./global.actions"
import {
  apiArgumentsURL,
  testDaemonResponseFlowsArguments,
  testDaemonResponsePodsArguments,
  testDaemonResponsePeasArguments,
  testDaemonResponseStatus,
  testError,
  testJinaApiResponse,
  testMessage_0,
  testModal,
  testModalParams,
  testTheme,
} from "./global.testData"
import configureMockStore from "redux-mock-store"
import axios from "axios"
import { jinadInstance } from "../../services/jinad"
import AxiosMockAdapter from "axios-mock-adapter"
import thunk, { ThunkDispatch } from "redux-thunk"
import { GlobalState } from "./global.types"
import { AnyAction } from "redux"
import { State } from "../index"

const mockAxios = new AxiosMockAdapter(axios)
const mockJinadClient = new AxiosMockAdapter(jinadInstance)

const middlewares = [thunk]
type DispatchExts = ThunkDispatch<State, void, AnyAction>
const mockGlobalStore = configureMockStore<GlobalState, DispatchExts>(
  middlewares
)
const mockStore = configureMockStore<State, DispatchExts>(middlewares)
const initialGlobalState = getInitialGlobalState()

describe("global reducer", () => {
  describe("when a new log is submitted", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      handleNewLog(testMessage)
    )
    const numberOldProcesses = Object.keys(initialGlobalState.processes).length
    const numberNewProcesses = Object.keys(newGlobalState.processes).length

    it(" should add a new process", () => {
      expect(numberNewProcesses - numberOldProcesses).toEqual(1)
      expect(newGlobalState.processes[testMessage.process]).toEqual(
        testMessage.name
      )
    })
  })

  describe("when handling connection", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      _handleConnectionStatus(true, testMessage_0)
    )

    it("should be able to connect", () => {
      expect(newGlobalState.connected).toBe(true)
    })

    it("should disable loading", () => {
      const newGlobalState = reducer(
        initialGlobalState,
        _handleConnectionStatus(true, testMessage_0)
      )
      expect(newGlobalState.loading).toBe(false)
    })

    it("should log the connection", () => {
      const loggerSpy = jest.spyOn(logger, "log")
      reducer(initialGlobalState, _handleConnectionStatus(true, testMessage_0))
      expect(loggerSpy).toHaveBeenNthCalledWith(
        1,
        "handleLogConnectionStatus - status",
        true
      )
      expect(loggerSpy).toHaveBeenNthCalledWith(
        2,
        "handleLogConnectionStatus - message",
        testMessage_0
      )
    })

    it("should be able to disconnect", () => {
      const disconnectedState = reducer(
        newGlobalState,
        _handleConnectionStatus(false, testMessage_0)
      )
      expect(disconnectedState.connected).toBe(false)
    })
  })

  describe("when toggling the sidebar", () => {
    const newGlobalState = reducer(initialGlobalState, toggleSidebar())
    it("should set the sidebarStatus to the opposite of the former", () => {
      expect(newGlobalState.menuVisible).toBe(!initialGlobalState.menuVisible)
    })
  })

  describe("when showing the banner", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      _showBanner(testMessage_0, testTheme)
    )
    it("should set the banner", () => {
      expect(newGlobalState.banner).toEqual({
        message: testMessage_0,
        theme: testTheme,
      })
    })
  })

  describe("when hiding the banner", () => {
    const newGlobalState = reducer(initialGlobalState, _hideBanner())

    it("should set the banner to empty", () => {
      expect(newGlobalState.banner).toEqual(null)
    })
  })

  describe("when showing an error", () => {
    const newGlobalState = reducer(initialGlobalState, showError(testError))
    it("should set the banner to error object", () => {
      expect(newGlobalState.banner).toEqual({
        message: testError,
        theme: "error",
      })
    })
  })

  describe("when showing a modal", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      showModal(testModal, testModalParams)
    )
    it("should set the modal and modalParams", () => {
      expect(newGlobalState.modal).toEqual(testModal)
      expect(newGlobalState.modalParams).toEqual(testModalParams)
    })
  })

  describe("when closing  a modal", () => {
    const newGlobalState = reducer(initialGlobalState, closeModal())
    it("should set the modal and modalParams to empty", () => {
      expect(newGlobalState.modal).toEqual(null)
      expect(newGlobalState.modalParams).toEqual(null)
    })
  })
})

describe("global actions", () => {
  describe("when calling showBanner", () => {
    it("should open and close the banner after HIDE_BANNER_TIMEOUT", () => {
      const store = mockGlobalStore(initialGlobalState)
      jest.useFakeTimers()
      store.dispatch(showBanner(testMessage_0, testTheme))
      expect(store.getActions()).toEqual([
        _showBanner(testMessage_0, testTheme),
      ])
      jest.runTimersToTime(HIDE_BANNER_TIMEOUT)
      expect(store.getActions()).toEqual([
        _showBanner(testMessage_0, testTheme),
        _hideBanner(),
      ])
    })
  })

  describe("when connection fails to establish with daemon", () => {
    it("should fetch flow arguments from api.jina.ai", () => {
      const store = mockStore()
      mockAxios.onGet(apiArgumentsURL).reply(200, testJinaApiResponse)

      const expectedAction = { type: "FETCH_ARGUMENTS_FROM_API" }

      store.dispatch(handleConnectionStatus(false, "test_message"))
      expect(
        store.getActions().find((action) => action.type === expectedAction.type)
      ).toEqual(expectedAction)
    })
  })

  describe("when connection is successfully established with daemon", () => {
    it("should fetch flow arguments from daeomon", () => {
      const store = mockStore()
      const expectedAction = { type: "FETCH_ARGUMENTS_FROM_DAEMON" }
      mockJinadClient.onGet("/status").reply(200, testDaemonResponseStatus)
      mockJinadClient
        .onGet("/flows/arguments")
        .reply(200, testDaemonResponseFlowsArguments)
      mockJinadClient
        .onGet("/pods/arguments")
        .reply(200, testDaemonResponsePodsArguments)
      mockJinadClient
        .onGet("/peas/arguments")
        .reply(200, testDaemonResponsePeasArguments)

      store.dispatch(handleConnectionStatus(true, "test_message"))
      expect(
        store.getActions().find((action) => action.type === expectedAction.type)
      ).toEqual(expectedAction)
    })
  })

  describe("when using login", () => {
    const lambdaUrl = process.env.REACT_APP_GITHUB_LAMBDA

    const user = {
      displayName: "dummy",
      username: "dummyUser",
      emails: ["dummy@dummy.com"],
      id: "1234sadf4234",
      nodeId: "dsfs234asdf",
    }
    it("erases user data when logging out", () => {
      const loggedInState: GlobalState = { ...initialGlobalState, user }
      expect(loggedInState.user).toBeDefined()
      const loggedOutState = reducer(loggedInState, logout())
      expect(loggedOutState.user).toBeNull()
    })
    it("dispatches _login when fetching github user data", () => {
      const githubCode = "abcd1234"
      const githubUser = {
        ...user,
        githubCode,
      }
      const expectedActions = [
        {
          type: GITHUBLOGIN,
          payload: { user: githubUser },
        },
      ]
      const store = mockStore()
      mockAxios
        .onGet(`/${lambdaUrl}?githubCode=${githubCode}`)
        .reply(200, { user: githubUser })

      store.dispatch(loginGithub(githubCode))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it("dispatches showError when a network error gets thrown", () => {
      const githubCode = "abcd1234"
      const expectedActions = [
        {
          type: SHOW_ERROR,
          payload: { message: new Error("Network Error") },
        },
      ]
      const store = mockStore()
      mockAxios.onGet(`/${lambdaUrl}?githubCode=${githubCode}`).networkError()

      store.dispatch(loginGithub(githubCode))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it("dispatches showError when no lambda is set", () => {
      const githubCode = "abcd1234"
      const githubUser = {
        ...user,
        githubCode,
      }
      process.env.REACT_APP_GITHUB_LAMBDA = undefined
      const expectedActions = [
        {
          type: SHOW_ERROR,
          payload: { message: "No lambda found" },
        },
      ]
      const store = mockStore()
      mockAxios
        .onGet(`/${lambdaUrl}?githubCode=${githubCode}`)
        .reply(200, { user: githubUser })

      store.dispatch(loginGithub(githubCode))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
