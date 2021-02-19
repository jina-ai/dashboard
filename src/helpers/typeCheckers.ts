import { NodeConnection, DeleteLinkProps } from "../redux/flows/flows.types"

export function isNodeConnection(
  deleteLinkProps: DeleteLinkProps
): deleteLinkProps is ConnectedNodes {
  return (deleteLinkProps as NodeConnection).source !== undefined
}
