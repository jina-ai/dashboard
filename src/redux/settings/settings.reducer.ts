import { intialSettings, UPDATE_SETTINGS } from "./settings.constants"
import {
  SettingName,
  Settings,
  SettingsActionTypes,
  SettingsState,
} from "./settings.types"
import logger from "../../logger"
import produce from "immer"
import { PREFERENCES_PREFIX } from "../../services/localStorageKeys"

const settingsReducer = produce(
  (draft: SettingsState, action: SettingsActionTypes) => {
    switch (action.type) {
      case UPDATE_SETTINGS:
        draft.settings = {
          ...draft.settings,
          ...action.payload,
        }
        logger.log("saveSettings - settings", draft.settings)
        _saveSettingsInStore(draft.settings)
    }
  },
  intialSettings
)

function _saveSettingsInStore(settings: Settings) {
  Object.keys(settings).forEach((key) => {
    localStorage.setItem(
      `${PREFERENCES_PREFIX}-${key}`,
      settings[key as SettingName] as string
    )
  })
}

export default settingsReducer
