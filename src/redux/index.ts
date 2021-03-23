import { combineReducers, createStore, applyMiddleware, Action } from "redux"
import flowReducer from "./flows/flows.reducer"
import { FlowState } from "./flows/flows.types"
import { HubState } from "./hub/hub.types"
import hubReducer from "./hub/hub.reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { SettingsState } from "./settings/settings.types"
import settingsReducer from "./settings/settings.reducer"
import { LogStreamState } from "./logStream/logStream.types"
import logStreamReducer from "./logStream/logStream.reducer"
import { GlobalState } from "./global/global.types"
import globalReducer from "./global/global.reducer"
import thunk, { ThunkAction } from "redux-thunk"
import { handleJinadConnectionStatus } from "./global/global.actions"
import taskReducer from "./task/task.reducer"
import { TaskState } from "./task/task.types"
import jinadClient from "../services/jinad"
import { combineReducers, createStore, applyMiddleware, Action } from "redux"
import flowReducer from "./flows/flows.reducer"
import { FlowState } from "./flows/flows.types"
import { HubState } from "./hub/hub.types"
import hubReducer from "./hub/hub.reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { SettingsState } from "./settings/settings.types"
import settingsReducer from "./settings/settings.reducer"
import { LogStreamState } from "./logStream/logStream.types"
import logStreamReducer from "./logStream/logStream.reducer"
import { GlobalState } from "./global/global.types"
import globalReducer from "./global/global.reducer"
import thunk, { ThunkAction } from "redux-thunk"
import { handleConnectionStatus } from "./global/global.actions"
import taskReducer from "./task/task.reducer"
import { TaskState } from "./task/task.types"
import jinadClient from "../services/jinad"
import gatewayClient from "../services/tests/gatewayClient"

export type State = {
  flowState: FlowState
  hubState: HubState
  settingsState: SettingsState
  logStreamState: LogStreamState
  globalState: GlobalState
  taskState: TaskState
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Action<string>
>

const rootReducer = combineReducers({
  flowState: flowReducer,
  hubState: hubReducer,
  settingsState: settingsReducer,
  logStreamState: logStreamReducer,
  globalState: globalReducer,
  taskState: taskReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

function _handleLogConnectionStatus({
  connected,
  message,
}: {
  connected: boolean
  message: string
}) {
  store.dispatch<any>(handleJinadConnectionStatus(connected, message))
}

jinadClient.connect(
  store.getState().settingsState.settings,
  _handleLogConnectionStatus
)

export default store
