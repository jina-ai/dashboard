import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlowChart,
  selectSelectedFlowId,
} from "../redux/flows/flows.selectors"
import React from "react"
import { ModalParams } from "../redux/global/global.types"
import ReactModal, { Styles } from "react-modal"
import {
  deleteFlow,
  rerender,
  updateFlow,
  updateFlowProperties,
} from "../redux/flows/flows.actions"
import { Button } from "react-bootstrap"
import { FlowArgument } from "../redux/flows/flows.types"

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

const FlowSettingsContainer = styled.div`
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

type GlobalArguments = {
  [key: string]: FlowArgument
}

const globalArguments: GlobalArguments = {
  port_expose: {
    name: "port_expose",
    description: "Which port to expose gRPC or REST interface",
    type: "integer",
  },
  rest_api: {
    name: "rest_api",
    description: "Whether to enable REST interface",
    type: "boolean",
  },
}

function FlowSettingsComponent({ open, closeModal }: Props) {
  const flowId = useSelector(selectSelectedFlowId)
  const flowChart = useSelector(selectFlowChart)
  const dispatch = useDispatch()

  const _updateFlowName = (name: string) => {
    const flowUpdate = { ...flowChart, name }
    dispatch(updateFlowProperties(flowUpdate))
    dispatch(rerender())
  }

  const _updateFlowWith = (key: string, value: string) => {
    const flowUpdate = { ...flowChart.flow }
    if (!flowUpdate.with) flowUpdate.with = {}
    flowUpdate.with[key] = value
    dispatch(updateFlow(flowUpdate))
  }

  const _deleteFlow = () => {
    dispatch(deleteFlow(flowId))
    closeModal()
    dispatch(rerender())
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
      <FlowSettingsContainer>
        <Header1>Flow Name</Header1>

        <Input
          value={flowChart.name}
          onChange={(e: { target: { value: string } }) =>
            _updateFlowName(e.target.value)
          }
          className="pod-name-input"
        />
        <Header1>Settings</Header1>
        <PropertyTable>
          {Object.values(globalArguments).map((argument, idx) => {
            const { name, type } = argument
            return (
              <div key={idx}>
                <Header2>{name}</Header2>
                <Input
                  placeholder={type}
                  type={type === "integer" ? "number" : "text"}
                  value={flowChart.flow.with ? flowChart.flow.with[name] : ""}
                  onChange={(e) => _updateFlowWith(name, e.target.value)}
                  className="property-value-input"
                />
              </div>
            )
          })}
        </PropertyTable>

        <DeleteButton variant="danger" onClick={_deleteFlow}>
          Delete Flow
        </DeleteButton>
      </FlowSettingsContainer>
    </ReactModal>
  )
}

export default FlowSettingsComponent
