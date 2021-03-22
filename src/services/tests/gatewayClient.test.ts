import { status_success_response, settings } from "./gatewayClient.testData"
import AxiosMockAdapter from "axios-mock-adapter"
import gatewayClient, { gatewayInstance } from "./gatewayClient"

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
})
