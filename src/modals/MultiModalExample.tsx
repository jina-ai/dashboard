import ConfigFileUpload from "./ConfigFileUpload"
import { useDispatch, useSelector } from "react-redux"
import { selectConnectionStatus } from "../redux/global/global.selectors"
import { showError } from "../redux/global/global.actions"
import { ModalParams } from "../redux/global/global.types"

type Props = {
  open: boolean
  closeModal: () => void
  modalParams: ModalParams
}
function MultiModalExample({ open, closeModal, modalParams }: Props) {
  const dispatch = useDispatch()
  const connected = useSelector(selectConnectionStatus)
  if (connected) dispatch(showError("Please connect to JinaD"))
  else {
    return ConfigFileUpload
  }
}

export default MultiModalExample
