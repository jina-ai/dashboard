import axios from "axios"
import store from "../redux"
import { setUser, showError } from "../redux/global/global.actions"
import logger from "../logger"
import { User } from "../redux/global/global.types"

export async function loginGithub(code: string) {
  await _getAccessToken(code)
}

async function _getAccessToken(code: string) {
  const lambdaUrl = process.env.REACT_APP_GITHUB_LAMBDA
  if (lambdaUrl === "undefined") {
    store.dispatch(showError("No lambda found"))
  } else {
    try {
      const response = await axios.get(`${lambdaUrl}?ghcode=${code}`)
      await _getUserInfo(response.data.access_token)
    } catch (e) {
      logger.log(e)
    }
  }
}

async function _getUserInfo(accessToken: string) {
  const config = {
    headers: { Authorization: "bearer " + accessToken },
  }
  const gitHubApi = process.env.REACT_APP_GITHUB_API

  if (gitHubApi) {
    try {
      const response = await axios.get(gitHubApi, config)

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
    } catch (e) {
      logger.log(e)
    }
  } else store.dispatch(showError("No GithubApi Token found"))
}
