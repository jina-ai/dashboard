import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Form,
} from "shards-react";
import { Collapse } from "react-bootstrap";

import { Store, Dispatcher, Constants } from "../../flux";
import { baseOptions, advancedOptions } from "./options";
import BaseFormTextInput from "components/Common/BaseFormTextInput";

type Settings = {
  host: string;
  port: string | number;
  log: string;
  profile: string;
  yaml: string;
  ready: string;
  shutdown: string;
};

type AnyObj = {
  [key: string]: any;
};

function SettingsCard() {
  const [original, setOriginal] = useState<AnyObj>(Store.getSettings());
  const [updates, setUpdates] = useState<AnyObj>({});
  const [expanded, setExpanded] = useState(false);

  function getData() {
    const original = Store.getSettings();
    setOriginal(original);
    setUpdates({});
  }

  useEffect(() => {
    Store.on("update-settings", getData);

    return function cleanup() {
      Store.removeListener("update-settings", getData);
    };
  }, []);

  function updateSetting(setting: string, value: string) {
    const newUpdates: { [key: string]: string } = { ...updates };
    newUpdates[setting] = value;
    setUpdates(newUpdates);
  }

  function saveChanges() {
    const settings = { ...original, ...updates };

    Dispatcher.dispatch({
      actionType: Constants.SAVE_SETTINGS,
      payload: settings,
    });
  }

  function toggleExpand() {
    setExpanded(!expanded);
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
              <BaseFormTextInput
                key={value}
                label={label}
                placeholder={placeholder}
                value={value in updates ? updates[value] : original[value]}
                onChange={(e) => updateSetting(value, e.target.value)}
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
                  <BaseFormTextInput
                    key={value}
                    label={label}
                    placeholder={placeholder}
                    value={value in updates ? updates[value] : original[value]}
                    onChange={(e) => updateSetting(value, e.target.value)}
                  />
                ))}
              </Row>
            </div>
          </Collapse>
        </Form>
      </CardBody>
    </Card>
  );
}

export default SettingsCard;
