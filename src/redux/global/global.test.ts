import reducer from "./global.reducer"
import { HIDE_BANNER_TIMEOUT, getInitialGlobalState } from "./global.constants"
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
  handleJinadConnectionStatus,
  logout,
  setUser,
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
import { GlobalState, User } from "./global.types"
import { AnyAction } from "redux"
import { State } from "../index"
import {
  selectProcesses,
  selectMenuState,
  selectSidebarItems,
  selectCurrentTab,
  selectUser,
  selectBanners,
  selectModal,
  selectModalParams,
  selectConnectionStatus,
  selectLoading,
} from "./global.selectors"

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
      expect(newGlobalState.banners).toEqual([
        {
          message: testMessage_0,
          theme: testTheme,
        },
      ])
    })
  })

  describe("when hiding the banner", () => {
    const newGlobalState = reducer(initialGlobalState, _hideBanner())

    it("should set the banner to empty", () => {
      expect(newGlobalState.banners).toEqual([])
    })
  })

  describe("when showing an error", () => {
    const newGlobalState = reducer(initialGlobalState, showError(testError))
    it("should set the banner to error object", () => {
      expect(newGlobalState.banners).toEqual([
        {
          message: testError,
          theme: "error",
        },
      ])
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

      store.dispatch(handleJinadConnectionStatus(false, "test_message"))
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

      store.dispatch(handleJinadConnectionStatus(true, "test_message"))
      expect(
        store.getActions().find((action) => action.type === expectedAction.type)
      ).toEqual(expectedAction)
    })
  })

  describe("login", () => {
    const user = {
      displayName: "dummy",
      username: "dummyUser",
      emails: ["dummy@dummy.com"],
      id: "1234sadf4234",
      nodeId: "dsfs234asdf",
    }
    it("sets a user to null when logged out", () => {
      const loggedInState: GlobalState = { ...initialGlobalState, user }
      expect(loggedInState.user).toBeDefined()
      const loggedOutState = reducer(loggedInState, logout())
      expect(loggedOutState.user).toBeNull()
    })

    it("sets a user", () => {
      expect(initialGlobalState.user).toBeNull()
      const loggedInState = reducer(initialGlobalState, setUser(user))
      expect(loggedInState.user).toEqual(user)
    })
  })
})

describe("global selectors", () => {
  const state = {
    globalState: initialGlobalState,
  }
  it("should select processes", () => {
    expect(selectProcesses(state)).toEqual(initialGlobalState.processes)
  })

  it("should select menu state", () => {
    expect(selectMenuState(state)).toEqual(initialGlobalState.menuVisible)
  })

  it("should select sidebar items", () => {
    expect(selectSidebarItems(state)).toEqual(initialGlobalState.navItems)
  })

  it("should select current tab", () => {
    expect(selectCurrentTab(state)).toEqual(initialGlobalState.currentTab)
  })

  it("should select user", () => {
    expect(selectUser(state)).toEqual(initialGlobalState.user)
  })

  it("should select banner", () => {
    expect(selectBanners(state)).toEqual(initialGlobalState.banners)
  })

  it("should select modal", () => {
    expect(selectModal(state)).toEqual(initialGlobalState.modal)
  })

  it("should select modal params", () => {
    expect(selectModalParams(state)).toEqual(initialGlobalState.modalParams)
  })

  it("should select connection status", () => {
    expect(selectConnectionStatus(state)).toEqual(initialGlobalState.connected)
  })

  it("should select loading status", () => {
    expect(selectLoading(state)).toEqual(initialGlobalState.loading)
  })
})

describe("global constants", () => {
  it("should return a user, that got saved to storage", () => {
    const testUser: User = {
      displayName: "dummy",
      username: "dummyUser",
      emails: ["dummy@dummy.com"],
      id: "1234sadf4234",
      nodeId: "dsfs234asdf",
    }
    localStorage.setItem("user", JSON.stringify(testUser))

    const intialGlobalStateWithUser = getInitialGlobalState()
    expect(intialGlobalStateWithUser.user).toEqual(testUser)
  })
})
