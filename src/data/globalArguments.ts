import { With } from "../redux/flows/flows.types"

type GlobalArguments = {
  [property in keyof Partial<With>]: {
    name: keyof With
    description: string
    type: string
  }
}

export const globalArguments: GlobalArguments = {
  rest_api: {
    name: "rest_api",
    description: "Whether to enable REST interface",
    type: "boolean",
  },
  port_expose: {
    name: "port_expose",
    description: "Which port to expose gRPC or REST interface",
    type: "integer",
  },
}
