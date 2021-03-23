import ReactModal, { Styles } from "react-modal"
import { ModalParams } from "../redux/global/global.types"
import React, { useState } from "react"
import gatewayClient from "../services/tests/gatewayClient"

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

function CRUD({ open, closeModal, modalParams }: Props) {
  const [searchText, setSearchText] = useState("")
  const [indexText, setIndexText] = useState("")

  function search() {
    gatewayClient.search(searchText)
  }

  function index() {
    gatewayClient.index(indexText)
  }

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
      <textarea
        onChange={(event) => setSearchText(event.target.value)}
      ></textarea>
      <button onClick={search}>Search</button>
      <textarea
        onChange={(event) => setIndexText(event.target.value)}
      ></textarea>
      <button onClick={index}>Index</button>
    </ReactModal>
  )
}

export default CRUD
