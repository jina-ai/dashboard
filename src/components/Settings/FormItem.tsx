import React, { ChangeEvent } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { SettingName } from "../../redux/settings/settings.types"

type Props = {
  colSpan?:  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" 
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
    <Grid item md={colSpan} className="form-group">
      <label>{label}</label>
      <TextField
        data-name={label.replaceAll(" ", "")}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Grid>
  )
}
