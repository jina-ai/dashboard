import styled from "@emotion/styled/macro"
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
import { globalArguments } from "../data/globalArguments"

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
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
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
  margin-bottom: 0.5rem;
`

const PropertyTable = styled.div`
  margin-bottom: 1rem;
  overflow-y: auto;
  height: 20rem;
  border-radius: 0.25em;
`
const PropertyItem = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  background: #f1f3f4;
  border-radius: 5px;
  padding: 0.5em;
  border: 0;
  margin-bottom: 0.5rem;
`

const DeleteButton = styled(Button)`
  width: 100%;
`

const CheckBoxWrapper = styled.div`
  position: relative;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 41px;
  height: 22px;
  border-radius: 20px;
  background: #a6a6a6;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 2px;
    background: #ffffff;
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #32c8cd;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`

type Props = {
  open: boolean
  closeModal: () => void
  modalParams: ModalParams
}

type SwitchInputProps = {
  checked: boolean
  setChecked: (checked: boolean) => void
}

function SwitchInput({ checked, setChecked }: SwitchInputProps) {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  )
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
              <PropertyItem key={idx}>
                <Header2>{name}</Header2>
                {type === "boolean" ? (
                  <SwitchInput
                    checked={
                      flowChart.flow.with ? flowChart.flow.with[name] : false
                    }
                    setChecked={(checked: any) =>
                      _updateFlowWith(name, checked)
                    }
                  />
                ) : (
                  <Input
                    placeholder={type}
                    type={type === "integer" ? "number" : "text"}
                    value={flowChart.flow.with ? flowChart.flow.with[name] : ""}
                    onChange={(e) => _updateFlowWith(name, e.target.value)}
                    className="property-value-input"
                  />
                )}
              </PropertyItem>
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
