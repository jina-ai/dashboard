import React, { ChangeEvent } from "react"
import { SettingName } from "../../redux/settings/settings.types"

type Props = {
  colSpan?: number
  label: string
  value: SettingName
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function FormItem({
  label,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className="form-group flex flex-col">
      <div className="text-gray-400 mb-2" id={label}>
        {label}
      </div>
      <input
        className="border rounded-md py-2 px-3 text-gray-500 text-sm"
        aria-labelledby={label}
        aria-label={label}
        data-name={label.replace(/ /g, "")}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
