import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Form } from "shards-react";
import { Collapse } from "react-bootstrap";

import {
  Store,
  /* Dispatcher,
  Constants, */
} from "../../flux";
import { baseOptions, advancedOptions } from "./options";
import FormItem from "./FormItem";

function SettingsCard() {
  const [original, setOriginal] = useState(Store.getSettings());
  const [updates, setUpdates] = useState({});
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

  function updateSetting(setting, value) {
    const newUpdates = { ...updates };
    newUpdates[setting] = value;
    setUpdates(newUpdates);
  }

  /** unused function 
  function saveChanges(){
    const settings = { ...original, ...updates };

    Dispatcher.dispatch({
      actionType: Constants.SAVE_SETTINGS,
      payload: settings,
    });
  }
  */

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
              <FormItem
                key={value}
                label={label}
                placeholder={placeholder}
                value={value in updates ? updates[value] : original[value]}
                onChange={(e) => updateSetting(value, e.target.value)}
              />
            ))}
          </Row>
          <strong
            aria-controls="collapsed-form"
            aria-expanded={expanded}
            onClick={toggleExpand}
            className="text-primary d-block mb-3 cursor-pointer"
          >
            Advanced{" "}
            <i className="material-icons">
              {expanded ? "arrow_drop_up" : "arrow_drop_down"}
            </i>
          </strong>
          <Collapse in={expanded}>
            <div id="collapsed-form">
              <strong className="text-muted d-block mb-3">Endpoints</strong>
              <Row form>
                {advancedOptions.map(({ label, placeholder, value }) => (
                  <FormItem
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
=======
  render = () => {
    const { original, updates, expanded } = this.state;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Connection Preferences</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md="6" className="form-group">
                <label>Host</label>
                <FormInput
                  placeholder="0.0.0.0"
                  value={"host" in updates ? updates.host : original.host}
                  onChange={(e) => this.updateSetting("host", e.target.value)}
                />
              </Col>
              <Col md="6" className="form-group">
                <label>Port</label>
                <FormInput
                  placeholder="5000"
                  value={"port" in updates ? updates.port : original.port}
                  onChange={(e) => this.updateSetting("port", e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <strong
                  aria-controls="collapsed-form"
                  aria-expanded={expanded}
                  onClick={this.toggleExpand}
                  className="text-primary d-inline-block mb-3 cursor-pointer"
                >
                  Advanced{" "}
                  <i className="material-icons">
                    {expanded ? "arrow_drop_up" : "arrow_drop_down"}
                  </i>
                </strong>
              </Col>
              <Col xs="6" className="text-right">
                <Button onClick={this.saveChanges}>Save Changes</Button>
              </Col>
            </Row>
            <Collapse in={expanded}>
              <div id="collapsed-form">
                <strong className="text-muted d-block mb-3">Endpoints</strong>
                <Row form>
                  <Col md="6" className="form-group">
                    <label>Log</label>
                    <FormInput
                      placeholder="/stream/log"
                      value={"log" in updates ? updates.log : original.log}
                      onChange={(e) =>
                        this.updateSetting("log", e.target.value)
                      }
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label>Profile</label>
                    <FormInput
                      placeholder="/stream/profile"
                      value={
                        "profile" in updates
                          ? updates.profile
                          : original.profile
                      }
                      onChange={(e) =>
                        this.updateSetting("profile", e.target.value)
                      }
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label>YAML</label>
                    <FormInput
                      placeholder="/data/yaml"
                      value={"yaml" in updates ? updates.yaml : original.yaml}
                      onChange={(e) =>
                        this.updateSetting("yaml", e.target.value)
                      }
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label>Shutdown</label>
                    <FormInput
                      placeholder="/action/shutdown"
                      value={
                        "shutdown" in updates
                          ? updates.shutdown
                          : original.shutdown
                      }
                      onChange={(e) =>
                        this.updateSetting("shutdown", e.target.value)
                      }
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label>Ready</label>
                    <FormInput
                      placeholder="/status/isready"
                      value={
                        "ready" in updates ? updates.ready : original.ready
                      }
                      onChange={(e) =>
                        this.updateSetting("ready", e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </div>
            </Collapse>
          </Form>
        </CardBody>
      </Card>
    );
  };

export default SettingsCard;
