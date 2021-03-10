import React from "react"
import { Container } from "shards-react"

export default function OAuthTestView() {
  const client_id = process.env.REACT_APP_CLIENT_ID
  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <h1>This is the OAuthTEst</h1>

        <p>Well, hello there!</p>

        <p>We're going to now talk to the GitHub API. Ready?</p>

        <p>`This is the clientId {client_id}`</p>

        <a
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`}
        >
          Click here
        </a>

        <p>
          If that link doesn't work, remember to provide your own{" "}
          <a href="/apps/building-oauth-apps/authorizing-oauth-apps/">
            Client ID
          </a>
          !
        </p>
      </div>
    </Container>
  )
}
