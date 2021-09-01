import React, { useState } from "react"

import { advancedOptions, baseOptions } from "./options"
import FormItem from "./FormItem"
import { SettingName, SettingUpdate } from "../../redux/settings/settings.types"
import { useDispatch, useSelector } from "react-redux"
import { updateSettings } from "../../redux/settings/settings.actions"
import { selectSettings } from "../../redux/settings/settings.selectors"
import Button from "../Common/Button"

function SettingsCard() {
  const [updates, setUpdates] = useState<SettingUpdate>({})
  const [expanded, setExpanded] = useState(false)

  const settings = useSelector(selectSettings)

  const dispatch = useDispatch()

  function changeSetting(setting: SettingName, value: string) {
    const newUpdates: SettingUpdate = { ...updates }
    newUpdates[setting] = value
    setUpdates(newUpdates)
  }

  function saveChanges() {
    dispatch(updateSettings(updates))
  }

  function toggleExpand() {
    setExpanded(!expanded)
  }

  return (
    <div className="mb-4">
      <div className="border-bottom">
        <h6 className="m-0">Connection Preferences</h6>
      </div>
      <div>
        <div>
          <div>
            {baseOptions.map(({ label, placeholder, value }) => (
              <FormItem
                key={value as string}
                label={label}
                placeholder={placeholder}
                value={
                  (value in updates
                    ? updates[value]
                    : settings[value]) as SettingName
                }
                onChange={(e) => changeSetting(value, e.target.value)}
              />
            ))}
          </div>
          <div>
            <div>
              <strong
                aria-controls="collapsed-form"
                aria-expanded={expanded}
                onClick={toggleExpand}
                className="text-primary d-inline-block mb-3 cursor-pointer"
              >
                Advanced{" "}
                <i className="material-icons">
                  {expanded ? "arrow_drop_up" : "arrow_drop_down"}
                </i>
              </strong>
            </div>
            <div className="text-right">
              <Button onClick={saveChanges}>Save Changes</Button>
            </div>
          </div>
          <div>
            <div id="collapsed-form">
              <strong className="text-muted d-block mb-3">Endpoints</strong>
              <div>
                {advancedOptions.map(({ label, placeholder, value }) => (
                  <FormItem
                    key={value}
                    label={label}
                    placeholder={placeholder}
                    value={
                      (value in updates
                        ? updates[value]
                        : settings[value]) as SettingName
                    }
                    onChange={(e) =>
                      changeSetting(value as SettingName, e.target.value)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsCard
