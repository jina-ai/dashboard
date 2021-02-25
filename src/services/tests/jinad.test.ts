import { parseDaemonFlowMethodOptions } from "../jinad"
import {
  daemonArgumentsResponse,
  flow_id,
  parsedDaemonArgumentResponse,
  sample_logs,
  workspace_id,
} from "./jinad.testData"
import AxiosMockAdapter from "axios-mock-adapter"
import jinad, { jinadInstance } from "../../services/jinad"

let mockJinadClient: AxiosMockAdapter

describe(parseDaemonFlowMethodOptions, () => {
  it("should output correctly formatted arguments", () => {
    const result = parseDaemonFlowMethodOptions(daemonArgumentsResponse)
    expect(result).toEqual(parsedDaemonArgumentResponse)
  })
})

describe("when waiting for flow", () => {
  beforeAll(() => {
    mockJinadClient = new AxiosMockAdapter(jinadInstance)
  })

  beforeEach(() => {
    mockJinadClient.reset()
  })

  it("should return success for existing flow", async () => {
    mockJinadClient
      .onGet(`/logs/${workspace_id}/${flow_id}`)
      .reply(200, sample_logs)

    const result = await jinad.waitForFlow(workspace_id, flow_id, 5, 100)

    expect(result.status).toEqual("success")
  })

  it("should return error if not found flow in time", async () => {
    const NUM_RETRIES = 5
    const RETRY_TIMEOUT = 100

    mockJinadClient
      .onGet(`/logs/${workspace_id}/${flow_id}`)
      .reply(404, "not found")
    const result = await jinad.waitForFlow(
      workspace_id,
      flow_id,
      NUM_RETRIES,
      RETRY_TIMEOUT
    )

    expect(result.status).toEqual("error")
    expect(mockJinadClient.history.get.length).toBe(NUM_RETRIES)
  })
})
