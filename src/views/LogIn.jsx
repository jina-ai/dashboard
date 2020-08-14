/* eslint jsx-a11y/anchor-is-valid: 0 */

import { hubURL } from "../flux/config";

import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "shards-react";

class Login extends React.Component {
  componentDidMount = () => {
    let hash = window.location.href;
    if (hash.indexOf("code") > 0) {
      console.log("hash: ", hash);
      let code = hash.substring(hash.indexOf("code") + 5, hash.length);
      console.log("code:", code);
      window.location = `${hubURL}/auth/github/callback?code=${code}`;
    }
  };
  testAuthentication = () => {
    const xhr = new XMLHttpRequest();
    const connectionString = `${hubURL}/auth/test`;
    console.log("test connectionString: ", connectionString);
    xhr.open("POST", connectionString);
    xhr.timeout = 5000;
    xhr.withCredentials = true;
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        console.log("test: SUCCESS");
      } else {
        console.log("test: FAIL");
      }
    };
    xhr.onerror = function () {
      console.log("test: ERROR");
    };
    xhr.send();
  };
  render = () => {
    return (
      <Container fluid className="main-content-container px-0">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto">
            <Card>
              <CardBody>
                <img
                  onClick={this.testAuthentication}
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/jina-light.svg")}
                  style={{ maxWidth: "100px" }}
                  alt="Jina"
                />
                <h5 className="auth-form__title text-center mb-4">Log in</h5>
                <a
                  href={`${hubURL}/auth/github`}
                  id="github-button"
                  className="btn btn-block btn-social btn-github"
                >
                  <i className="fab fa-github"></i> Sign in with GitHub
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default Login;
