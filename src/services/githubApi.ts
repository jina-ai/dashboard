import axios from "axios"

export function getUserInfo(accessToken: string) {
  const config = {
    headers: { Authorization: "bearer " + accessToken },
  }
  const gitHubApi = process.env.REACT_APP_GITHUB_API

  if (gitHubApi) return axios.get(gitHubApi, config)
  else throw new Error("No GithubApi Token found")
}
