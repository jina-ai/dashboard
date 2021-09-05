import React, { useState } from "react"

import { advancedOptions, baseOptions } from "./options"
import FormItem from "./FormItem"
import { SettingName, SettingUpdate } from "../../redux/settings/settings.types"
import { useDispatch, useSelector } from "react-redux"
import { updateSettings } from "../../redux/settings/settings.actions"
import { selectSettings } from "../../redux/settings/settings.selectors"
import { ToggleButton } from "./ToggleButton"

const SettingsCard = () => {
  const [updates, setUpdates] = useState<SettingUpdate>({})
  const [isToggleButtonExpanded, setIsToggleButtonExpanded] = useState(false)
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

  function handleToggleButtonClick() {
    setIsToggleButtonExpanded(!isToggleButtonExpanded)
  }

  const renderBaseOptions = baseOptions.map(({ label, placeholder, value }) => (
    <FormItem
      key={value as string}
      label={label}
      placeholder={placeholder}
      value={
        (value in updates ? updates[value] : settings[value]) as SettingName
      }
      onChange={(e) => changeSetting(value, e.target.value)}
    />
  ))

  const renderAdvancedOptions = advancedOptions.map(
    ({ label, placeholder, value }) => (
      <FormItem
        key={value}
        label={label}
        placeholder={placeholder}
        value={
          (value in updates ? updates[value] : settings[value]) as SettingName
        }
        onChange={(e) => changeSetting(value as SettingName, e.target.value)}
      />
    )
  )

  return (
    <div className=" bg-white  rounded-md">
      <h6 className="p-4 border-b text-gray-600">Connection Preferences</h6>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">{renderBaseOptions}</div>
        <div className="flex mb-4 justify-between items-center">
          <ToggleButton
            isExpanded={isToggleButtonExpanded}
            onToggleButtonClick={handleToggleButtonClick}
          />
          <button
            className="bg-primary text-white text-xs py-2 px-4 rounded hover:shadow-lg active:shadow-inner"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
        <div
          style={{ height: isToggleButtonExpanded ? "290px" : "0px" }}
          className={`pb-2 relative transition transition-height overflow-hidden duration-300 ease-in-out`}
        >
          {isToggleButtonExpanded && (
            <>
              <strong className="font-medium inline-block text-gray-400  mb-3">
                Endpoints
              </strong>
              <div className="grid grid-cols-2 gap-4">
                {renderAdvancedOptions}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsCard
