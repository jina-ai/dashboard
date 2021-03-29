import ConfigFileUpload from "./ConfigFileUpload"
import { useDispatch, useSelector } from "react-redux"
import { selectConnectionStatus } from "../redux/global/global.selectors"
import { showError } from "../redux/global/global.actions"
import React from "react"
import jinad from "../services/jinad"
import indexFlow from "../data/multi-modal-index-flow"
type Props = {
  open: boolean
  closeModal: () => void
}

function MultiModalExample({ open, closeModal }: Props) {
  const dispatch = useDispatch()
  const connected = useSelector(selectConnectionStatus)

  async function startIndexFlow() {
    const workspaces = (await jinad.getWorkspaces()).workspaces
    const workspaceId = Object.keys(workspaces.items)[0]
    await jinad.startFlow(indexFlow, workspaceId)
  }

  async function indexData() {}

  async function startQueryFlow() {}

  async function startScript() {
    await startIndexFlow()
    await indexData()
    await startQueryFlow()
  }

  if (connected) {
    dispatch(showError("Please connect to JinaD"))
    return <></>
  } else {
    return (
      <ConfigFileUpload
        open={open}
        closeModal={closeModal}
        startScript={startScript}
      />
    )
  }
}

export default MultiModalExample
