import {
  status_success_response,
  settings,
  search_success_response,
  index_success_response,
} from "./gatewayClient.testData"
import AxiosMockAdapter from "axios-mock-adapter"
import gatewayClient, { gatewayInstance } from "./gatewayClient"
import logger from "../../logger"

let mockGatewayClient: AxiosMockAdapter
const mockConnectionCallback = jest.fn()

describe("when connecting to gateway", () => {
  beforeAll(() => {
    mockGatewayClient = new AxiosMockAdapter(gatewayInstance)
  })

  beforeEach(() => {
    mockGatewayClient.reset()
  })

  it("should trigger a success messsage when connceted successfully", async () => {
    mockGatewayClient.onGet("/status").reply(200, status_success_response)

    await gatewayClient.connect(settings, mockConnectionCallback)

    expect(mockConnectionCallback.mock.calls[0][0]).toEqual({
      connected: true,
      message: `Successfully connected to Jina at ${settings.gatewayHost}:${settings.gatewayPort}`,
    })
  })

  it("should trigger a success log when searched successfully", async () => {
    mockGatewayClient.onPost("/search").reply(200, search_success_response)
    const loggerSpy = jest.spyOn(logger, "log")
    await gatewayClient.search("Josef Stalin")
    expect(loggerSpy).toHaveBeenNthCalledWith(1, "search - successful")
  })

  it("should trigger a error log when searched unsuccessfully", async () => {
    mockGatewayClient.onPost("/search").reply(500)
    const error = new Error("Request failed with status code 500")
    const loggerSpy = jest.spyOn(logger, "log")
    await gatewayClient.search("Josef Stalin")
    expect(loggerSpy).toHaveBeenNthCalledWith(1, "search - error", error)
  })

  it("should trigger a success log when indexed successfully", async () => {
    mockGatewayClient.onPost("/index").reply(200, index_success_response)
    const loggerSpy = jest.spyOn(logger, "log")
    await gatewayClient.index("Josef Stalin")
    expect(loggerSpy).toHaveBeenNthCalledWith(1, "index - successful")
  })

  it("should trigger a error log when indexed unsuccessfully", async () => {
    mockGatewayClient.onPost("/index").reply(500)
    const error = new Error("Request failed with status code 500")
    const loggerSpy = jest.spyOn(logger, "log")
    await gatewayClient.index("Josef Stalin")
    expect(loggerSpy).toHaveBeenNthCalledWith(1, "index - error", error)
  })
})
