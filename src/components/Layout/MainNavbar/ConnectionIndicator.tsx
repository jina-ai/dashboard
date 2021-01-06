import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import { NavItem, NavLink, Badge } from "shards-react";
import { Popover, Overlay } from "react-bootstrap";
import { Row, Col, Button, Form } from "shards-react";
import { Store, Dispatcher, Constants } from "../../../flux";
import BaseFormTextInput from "components/Common/BaseFormTextInput";

type Props = {
  connected?: boolean;
};

type AnyObj = {
  [key: string]: any;
};

function ConnectionIndicator({ connected }: Props) {
  const [original, setOriginal] = useState<AnyObj>(Store.getSettings());
  const [updates, setUpdates] = useState<AnyObj>({});
  const [baseOptionsHost] = useState({
    label: "Host",
    placeholder: "0.0.0.0",
    value: "host",
  });
  const [baseOptionsPort] = useState({
    label: "Port",
    placeholder: "5000",
    value: "port",
  });
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  function updateSetting(setting: string, value: string) {
    const newUpdates: { [key: string]: string } = { ...updates };
    newUpdates[setting] = value;
    setUpdates(newUpdates);
  }
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

  function saveChanges(event: any) {
    const settings = { ...original, ...updates };

    Dispatcher.dispatch({
      actionType: Constants.SAVE_SETTINGS,
      payload: settings,
    });
    setShow(!show);
  }

  return (
    <div ref={ref}>
      <NavItem className="dropdown notifications" onClick={handleClick}>
        <NavLink className="nav-link-icon text-center">
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">language</i>
            {connected ? (
              <Badge pill theme="success" className="connection-indicator p-1">
                <i className="material-icons">done</i>
              </Badge>
            ) : (
              <Badge pill theme="danger" className="connection-indicator p-1">
                <i className="material-icons">close</i>
              </Badge>
            )}
          </div>
        </NavLink>
      </NavItem>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Connection Preferences</Popover.Title>
          <Popover.Content>
            <Form>
              <Row form>
                <BaseFormTextInput
                  label={baseOptionsHost.label}
                  placeholder={baseOptionsHost.placeholder}
                  value={
                    baseOptionsHost.value in updates
                      ? updates[baseOptionsHost.value]
                      : original[`${baseOptionsHost.value}`]
                  }
                  onChange={(e) =>
                    updateSetting(baseOptionsHost.value, e.target.value)
                  }
                />
                <BaseFormTextInput
                  label={baseOptionsPort.label}
                  placeholder={baseOptionsPort.placeholder}
                  value={
                    baseOptionsPort.value in updates
                      ? updates[baseOptionsPort.value]
                      : original[`${baseOptionsPort.value}`]
                  }
                  onChange={(e) =>
                    updateSetting(baseOptionsPort.value, e.target.value)
                  }
                />
              </Row>
              <Row>
                <Col xs="12" className="text-right">
                  <Button onClick={saveChanges}>Save Changes</Button>
                </Col>
              </Row>
            </Form>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}

export { ConnectionIndicator };
