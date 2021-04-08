import React, { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
} from "shards-react"
import { Collapse } from "react-bootstrap"

import { advancedOptions, baseOptions } from "./options"
import FormItem from "./FormItem"
import { SettingName, SettingUpdate } from "../../redux/settings/settings.types"
import { useDispatch, useSelector } from "react-redux"
import { updateSettings } from "../../redux/settings/settings.actions"
import { selectSettings } from "../../redux/settings/settings.selectors"

function SettingsCard() {
  const [updates, setUpdates] = useState<SettingUpdate>({})
  const [expanded, setExpanded] = useState(false)

  const settings = useSelector(selectSettings)

  const dispatch = useDispatch()

  function changeSetting(setting: SettingName, value: string) {
    console.log(setting)
    console.log(value)
    const newUpdates: SettingUpdate = { ...updates }
    console.log(newUpdates)

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
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Connection Preferences</h6>
      </CardHeader>
      <CardBody>
        <Form>
          <Row form>
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
          </Row>
          <Row>
            <Col xs="6">
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
            </Col>
            <Col xs="6" className="text-right">
              <Button onClick={saveChanges}>Save Changes</Button>
            </Col>
          </Row>
          <Collapse in={expanded}>
            <div id="collapsed-form">
              <strong className="text-muted d-block mb-3">Endpoints</strong>
              <Row form>
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
              </Row>
            </div>
          </Collapse>
        </Form>
      </CardBody>
    </Card>
  )
}

export default SettingsCard
