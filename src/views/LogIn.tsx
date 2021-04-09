/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from "react"
import { Container, Row, Col, Card, CardBody } from "shards-react"
import { useDispatch } from "react-redux"
import queryString from "querystring"
import { GithubCode } from "../redux/global/global.types"
import { loginGithub } from "../redux/global/global.actions"

function Login() {
  const client_id = process.env.REACT_APP_CLIENT_ID

  const dispatch = useDispatch()
  useEffect(() => {
    const parsed = queryString.parse(window.location.search)
    const code = parsed["?code"] as GithubCode
    if (code) {
      dispatch(loginGithub(code))
      window.location.href = "/"
    }
  })

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
