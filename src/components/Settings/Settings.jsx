import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  FormInput,
  Button,
} from "shards-react";

import { Store, Dispatcher, Constants } from "../../flux";

class SettingsCard extends React.Component {
  state = {
    original: Store.getSettings(),
    updates: {},
  };

  componentWillMount = () => {
    Store.on("update-settings", this.getData);
  };

  componentWillUnmount = () => {
    Store.removeListener("update-settings", this.getData);
  };

  getData = () => {
    const original = Store.getSettings();
    this.setState({ original, updates: {} });
  };

  updateSetting = (setting, value) => {
    this.setState((prevState) => {
      let { updates } = prevState;
      updates[setting] = value;
      return { updates };
    });
    console.log("updates: ", this.state.updates);
  };

  saveChanges = () => {
    const { original, updates } = this.state;

    const settings = { ...original, ...updates };

    Dispatcher.dispatch({
      actionType: Constants.SAVE_SETTINGS,
      payload: settings,
    });
  };

  render = () => {
    const { original, updates } = this.state;
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
            <strong class="text-muted d-block mb-3">Endpoints</strong>
            <Row form>
              {/* Email */}
              <Col md="6" className="form-group">
                <label>Log</label>
                <FormInput
                  placeholder="/stream/log"
                  value={"log" in updates ? updates.log : original.log}
                  onChange={(e) => this.updateSetting("log", e.target.value)}
                />
              </Col>
              {/* Password */}
              <Col md="6" className="form-group">
                <label>Profile</label>
                <FormInput
                  placeholder="/stream/profile"
                  value={
                    "profile" in updates ? updates.profile : original.profile
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
                  onChange={(e) => this.updateSetting("yaml", e.target.value)}
                />
              </Col>
              <Col md="6" className="form-group">
                <label>Shutdown</label>
                <FormInput
                  placeholder="/action/shutdown"
                  value={
                    "shutdown" in updates ? updates.shutdown : original.shutdown
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
                  value={"ready" in updates ? updates.ready : original.ready}
                  onChange={(e) => this.updateSetting("ready", e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          <Button theme="primary" onClick={this.saveChanges}>
            Save Settings
          </Button>
        </CardBody>
      </Card>
    );
  };
}

export default SettingsCard;
