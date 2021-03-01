import { parseFlowMethodOption } from "../jinaApi"
import { apiMethodOptions, parsedArguments } from "./jinaApi.testData"

describe(parseFlowMethodOption, () => {
  it("should output correctly formatted arguments", () => {
    const result = parseFlowMethodOption(apiMethodOptions)
    expect(result).toEqual(parsedArguments)
  })
})
