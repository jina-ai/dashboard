/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from "react"
import   Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import queryString from "querystring"
import { GithubCode } from "../redux/global/global.types"
import { loginGithub } from "../services/github"

function Login() {
  const client_id = process.env.REACT_APP_CLIENT_ID

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search)
    const code = queryParams["?code"] as GithubCode
    if (code) loginGithub(code)
  })

  return (
    <Container className="main-content-container px-0">
      <Grid container className="h-100">
        <Grid item lg={3} md={5} className="auth-form mx-auto">
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
