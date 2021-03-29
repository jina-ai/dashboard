import ReactModal, { Styles } from "react-modal"
import { ModalParams } from "../redux/global/global.types"
import React from "react"
import jinad from "../services/jinad"

const style: Styles = {
  overlay: {
    backgroundColor: "rgba(38, 50, 56, 0.5)",
  },
  content: {
    border: "none",
    bottom: "auto",
    left: "50%",
    position: "fixed",
    right: "auto",
    top: "50%", // start from center
    transform: "translate(-50%,-50%)", // adjust top "up" based on height
    maxWidth: "30rem",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

type Props = {
  open: boolean
  closeModal: () => void
  modalParams: ModalParams
}

function ConfigFileUpload({ open, closeModal }: Props) {
  function handleChange(selectorFiles: FileList | null) {
    if (selectorFiles) {
      const blobArray = Array.from(selectorFiles) as Blob[]
      jinad.createWorkspace(blobArray)
    }
  }

  const handleSubmission = () => {}

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={open}
      contentLabel="Action Modal"
      className="modal-content tiny-modal px-4 pt-3 pb-4"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      closeTimeoutMS={100}
      style={style}
    >
      <input
        type="file"
        multiple
        onChange={(e) => handleChange(e.target.files)}
      />
      <button onClick={handleSubmission}>Submit</button>
    </ReactModal>
  )
}

export default ConfigFileUpload
