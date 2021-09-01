import React from "react"
import ReactModal, { Styles } from "react-modal"
import Button from "../components/Common/Button"
const style: Styles = {
  overlay: {
    backgroundColor: "rgba(38, 50, 56, 0.5)",
  },
  content: {
    border: "none",
    bottom: "auto",
    maxHeight: "80%", // set height
    left: "50%",
    padding: "2rem",
    position: "fixed",
    right: "auto",
    top: "50%", // start from center
    transform: "translate(-50%,-50%)", // adjust top "up" based on height
    width: "90%",
    maxWidth: "800px",
    overflow: "hidden",
  },
}

type Props = {
  open: boolean
  closeModal: () => void
  importYAML: (yamlString: string) => void
}

const PasteYAML = ({ open, closeModal, importYAML }: Props) => {
  let inputRef: HTMLTextAreaElement
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={open}
      contentLabel="Action Modal"
      className="modal-content tiny-modal px-4 pt-3 pb-4"
      shouldCloseOnOverlayClick={true}
      style={style}
      onRequestClose={closeModal}
      closeTimeoutMS={100}
    >
      <div className="modal-header p-0">
        <h4>
          <b>Import YAML</b>
        </h4>
        <h4>
          <span className="float-right close-icon">
            <i className="material-icons" onClick={closeModal}>
              close
            </i>
          </span>
        </h4>
      </div>
      <div className="modal-body px-0 pb-0">
        <div>
          <span>Custom YAML:</span>
          <textarea
            placeholder="Paste Here"
            ref={(ref: HTMLTextAreaElement) => (inputRef = ref)}
            rows={10}
          />
        </div>
      </div>
      <Button
        className="btn-primary"
        onClick={() => importYAML(inputRef.value)}
      >
        Continue
      </Button>
    </ReactModal>
  )
}

export default PasteYAML
