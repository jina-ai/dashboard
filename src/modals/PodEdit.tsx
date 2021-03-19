import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlowArguments,
  selectSelectedFlow,
} from "../redux/flows/flows.selectors"
import React, { useEffect, useState } from "react"
import { ModalParams } from "../redux/global/global.types"
import ReactModal, { Styles } from "react-modal"
import { deleteNode, updateNodeData } from "../redux/flows/flows.actions"
import { Button } from "react-bootstrap"
import { NodeDataUpdate } from "../redux/flows/flows.types"
import logger from "../logger"

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

const PodEditContainer = styled.div`
  width: 25rem;
  margin-right: -1rem;
`

const Header1 = styled.header`
  font-weight: 600;
  font-size: 30px;
  color: #009999;
  margin-bottom: 0.5rem;
`

const Header2 = styled.header`
  font-weight: 600;
  font-size: 20px;
  color: #009999;
  margin-bottom: 0.5rem;
`

const PropertyTable = styled.div`
  width: 104%;
  margin-bottom: 1rem;
  border: 0;
  overflow: hidden;
  overflow-y: scroll;
  height: 20rem;
  border-radius: 0.25em;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar * {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #099 !important;
    border-radius: 1rem;
  }
`
const Input = styled.input`
  width: 97%;
  background: #f1f3f4;
  border-radius: 5px;
  padding: 0.5em;
  border: 0;
  margin-bottom: 0.5rem;
`

const DeleteButton = styled(Button)`
  width: 97%;
`

type Props = {
  open: boolean
  closeModal: () => void
  modalParams: ModalParams
}

function PodEditComponent({ open, closeModal, modalParams }: Props) {
  const nodeId = modalParams?.nodeId || ""
  const flowChart = useSelector(selectSelectedFlow)
  const flowArguments = useSelector(selectFlowArguments)
  const node = flowChart.flowChart.elements.find(
    (element) => element.id === nodeId
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArguments, setFilteredArguments] = useState(flowArguments.pod)
  const dispatch = useDispatch()

  useEffect(() => {
    const results = flowArguments.pod.filter((argument) =>
      argument.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredArguments(results)
  }, [searchQuery, flowArguments])

  const _updateLabel = (label: string) => {
    if (node?.id) {
      const nodeUpdate: NodeDataUpdate = { label }
      dispatch(updateNodeData(node.id, nodeUpdate))
    }
  }
  const _updateNodeProp = (name: string, value: string) => {
    if (node?.id) {
      const nodePropertiesUpdate: NodeDataUpdate = { [name]: value }
      dispatch(updateNodeData(node.id, nodePropertiesUpdate))
    }
  }
  const _deleteNode = () => {
    if (node?.id) {
      dispatch(deleteNode(node.id))
      closeModal()
    }
  }

  const label = node?.data?.label || node?.data?.name || "Empty Pod"
  logger.log("PodEdit node", node)

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
      <PodEditContainer>
        <Header1>pods name</Header1>

        <Input
          value={label}
          onChange={(e: { target: { value: string } }) =>
            _updateLabel(e.target.value)
          }
          className="pod-name-input"
        />

        <Header1>properties</Header1>

        <Input
          placeholder="search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <PropertyTable>
          {filteredArguments.map((argument) => {
            const { name, type } = argument
            return (
              <>
                <Header2>{name}</Header2>
                <Input
                  placeholder={type}
                  type={type === "integer" ? "number" : "text"}
                  value={node?.data ? node?.data[name] : ""}
                  onChange={(e) => _updateNodeProp(name, e.target.value)}
                  className="property-value-input"
                />
              </>
            )
          })}
        </PropertyTable>

        <DeleteButton variant="danger" onClick={_deleteNode}>
          Delete Pod
        </DeleteButton>
      </PodEditContainer>
    </ReactModal>
  )
}

export default PodEditComponent
