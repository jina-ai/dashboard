import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { loginGithub } from "../github"
import store from "../../redux"
import { User } from "../../redux/global/global.types"

describe("when logging in", () => {
  it("should set a user", () => {
    const mockAxios = new MockAdapter(axios)
    const code = "abcd1234"

    const _json = {
      login: "testUser",
      name: "testUserName",
      email: "testEmail",
      id: "testId",
    }

    const user: User = {
      username: _json.login,
      displayName: _json.name,
      emails: [_json.email],
      id: _json.id,
      _json,
    }

    mockAxios
      .onGet(`${process.env.REACT_APP_GITHUB_LAMBDA}?ghcode=${code}`)
      .reply(200, { access_token: "1234abcd" })

    mockAxios.onGet(process.env.REACT_APP_GITHUB_API).reply(200, _json)

    loginGithub(code).then(() => {
      expect(store.getState().globalState.user).toEqual(user)
    })
  })
})
