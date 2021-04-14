import React, { ChangeEvent } from "react"
import { Col, FormInput } from "shards-react"
import { SettingName } from "../../redux/settings/settings.types"

type Props = {
  colSpan?: number
  label: string
  value: SettingName
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FormItem({
  colSpan = 6,
  label,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <Col md={colSpan} className="form-group">
      <label>{label}</label>
      <FormInput placeholder={placeholder} value={value} onChange={onChange} />
    </Col>
  )
}
