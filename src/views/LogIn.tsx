/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react"
import { Container, Row, Col, Card, CardBody } from "shards-react"

function Login() {
  const client_id = process.env.REACT_APP_CLIENT_ID

  return (
    <Container fluid className="main-content-container px-0">
      <Row noGutters className="h-100">
        <Col lg="3" md="5" className="auth-form mx-auto">
          <Card>
            <CardBody>
              <img
                className="auth-form__logo d-table mx-auto mb-3"
                src="/jina-light.svg"
                style={{ maxWidth: "100px" }}
                alt="Jina"
              />
              <h5 className="auth-form__title text-center mb-4">Log in</h5>
              <a
                id="github-button"
                className="btn btn-block btn-social btn-github"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`}
              >
                <i className="fab fa-github"></i> Sign in with GitHub
              </a>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
