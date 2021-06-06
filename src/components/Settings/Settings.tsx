import React, { useState } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core"
import styled from "@emotion/styled"

import { advancedOptions, baseOptions } from "./options"
import { SettingName, SettingUpdate } from "../../redux/settings/settings.types"
import { useDispatch, useSelector } from "react-redux"
import { updateSettings } from "../../redux/settings/settings.actions"
import { selectSettings } from "../../redux/settings/settings.selectors"
import { CardWithOutline } from "../Common/Card"

const AlignedGrid = styled(Grid)`
  align-items: center;
`
const Collapse = styled(Accordion)`
  background: transparent;
  box-shadow: none;
  &:before {
    display: none;
  }
`
const CollapseHeader = styled(AccordionSummary)`
  padding: 0;
`
const CollapseBody = styled(AccordionDetails)`
  padding: 0;
`

function SettingsCard() {
  const [updates, setUpdates] = useState<SettingUpdate>({})

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

  return (
    <CardWithOutline>
      <CardHeader title="Connection Preferences" />
      <CardContent>
        <AlignedGrid container spacing={2}>
          {baseOptions.map(({ label, placeholder, value }) => (
            <Grid item key={label}>
              <TextField
                label={label}
                placeholder={placeholder}
                value={
                  (value in updates
                    ? updates[value]
                    : settings[value]) as SettingName
                }
                onChange={(e) => changeSetting(value, e.target.value)}
              />
            </Grid>
          ))}
          <Grid item>
            <Button onClick={saveChanges} variant="contained">
              Save Changes
            </Button>
          </Grid>
        </AlignedGrid>
        <Collapse>
          <CollapseHeader>
            <strong
              aria-controls="collapsed-form"
              className="text-primary d-inline-block mb-3 cursor-pointer"
            >
              Advanced{" "}
            </strong>
          </CollapseHeader>
          <CollapseBody>
            <p>
              <strong className="text-muted d-block mb-3">Endpoints</strong>
            </p>
            <Grid container spacing={2}>
              {advancedOptions.map(({ label, placeholder, value }) => (
                <Grid item key={label}>
                  <TextField
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
                </Grid>
              ))}
            </Grid>
          </CollapseBody>
        </Collapse>
      </CardContent>
    </CardWithOutline>
  )
}

export default SettingsCard
