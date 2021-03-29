import ConfigFileUpload from "./ConfigFileUpload"
import { useDispatch, useSelector } from "react-redux"
import { selectConnectionStatus } from "../redux/global/global.selectors"
import { showError } from "../redux/global/global.actions"
import React from "react"

type Props = {
  open: boolean
  closeModal: () => void
}

function MultiModalExample({ open, closeModal }: Props) {
  const dispatch = useDispatch()
  const connected = useSelector(selectConnectionStatus)
  if (connected) {
    dispatch(showError("Please connect to JinaD"))
    return <></>
  } else {
    return (
      <ConfigFileUpload open={open} closeModal={closeModal} next={() => {}} />
    )
  }
}

export default MultiModalExample
