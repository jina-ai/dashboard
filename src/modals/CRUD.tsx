import ReactModal, { Styles } from "react-modal"
import { ModalParams } from "../redux/global/global.types"
import React, { useState } from "react"
import gatewayClient from "../services/tests/gatewayClient"
import store from "../redux"
import { useDispatch } from "react-redux"
import { handleGatewayConnectionStatus } from "../redux/global/global.actions"

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

  const [result, setResult] = useState("rsult")

  async function search() {
    const searchResult = await gatewayClient.search(searchText)
    if (searchResult) {
      setResult(JSON.stringify(searchResult.data))
    }
  }

  async function index() {
    const indexResult = await gatewayClient.index(indexText)
    if (indexResult) {
      setResult(JSON.stringify(indexResult.data))
    }
  function index() {
    gatewayClient.index(indexText)
  const dispatch = useDispatch()
  const [result, setResult] = useState("rsult")

  function connect() {
    gatewayClient.connect(
      store.getState().settingsState.settings,
      ({ connected, message }) =>
        dispatch(handleGatewayConnectionStatus(connected, message))
    )
  }

  async function search() {
    const searchResult = await gatewayClient.search(searchText)
    if (searchResult) {
      setResult(JSON.stringify(searchResult.data))
    }
  }

  async function index() {
    const indexResult = await gatewayClient.index(indexText)
    if (indexResult) {
      setResult(JSON.stringify(indexResult.data))
    }
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
      <button onClick={connect}>connect</button>
      <textarea
        onChange={(event) => setSearchText(event.target.value)}
      ></textarea>
      <button onClick={search}>Search</button>
      <textarea
        onChange={(event) => setIndexText(event.target.value)}
      ></textarea>
      <button onClick={index}>Index</button>

      <textarea value={result}></textarea>
    </ReactModal>
  )
}

export default CRUD
