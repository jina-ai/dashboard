import axios from "axios"
import store from "../redux"
import { setUser, showError } from "../redux/global/global.actions"
import logger from "../logger"
import { User } from "../redux/global/global.types"

export function loginGithub(code: string) {
  _getAccessToken(code)
}

function _getAccessToken(code: string) {
  const lambdaUrl = process.env.REACT_APP_GITHUB_LAMBDA
  if (lambdaUrl === "undefined") {
    store.dispatch(showError("No lambda found"))
  } else {
    axios
      .get(`${lambdaUrl}?ghcode=${code}`)
      .then((response) => {
        _getUserInfo(response.data.access_token)
      })
      .catch((e) => logger.log(e))
  }
}

function _getUserInfo(accessToken: string) {
  const config = {
    headers: { Authorization: "bearer " + accessToken },
  }
  const gitHubApi = process.env.REACT_APP_GITHUB_API

  if (gitHubApi)
    axios
      .get(gitHubApi, config)
      .then((response) => {
        const _json = response.data
        const user: User = {
          username: _json.login,
          displayName: _json.name,
          emails: [_json.email],
          id: _json.id,
          _json,
        }
        store.dispatch(setUser(user))
        window.location.href = "/"
      })
      .catch((e) => logger.log(e, "fetchUserInfoError"))
  else store.dispatch(showError("No GithubApi Token found"))
}
