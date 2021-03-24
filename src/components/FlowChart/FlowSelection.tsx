import React from "react"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlows,
  selectSelectedFlowId,
} from "../../redux/flows/flows.selectors"
import {
  createNewFlow,
  deleteFlow,
  loadFlow,
} from "../../redux/flows/flows.actions"

export default function FlowSelection() {
  const flows = useSelector(selectFlows)
  const selectedFlowId = useSelector(selectSelectedFlowId)

  const dispatch = useDispatch()

  const TabsContainer = styled.div`
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 24px;
    position: absolute;
    width: 100%;
    background: #90a4ae;
    padding-top: 0.5em;
    z-index: 5;
    border-bottom: 1px solid #cfd8dc;

    &:before {
      z-index: 5;
    }

    &:after {
      position: absolute;
      content: "";
      width: 100%;
      bottom: 0;
      left: 0;
      border-bottom: 5px solid #eceff1;
      z-index: 5;
    }
  `

  const Tab = styled.div`
    margin: 0 10px;
    padding: 5px 10px 10px 10px;
    display: inline-block;
    border-radius: 0.25em 0.25em 0em 0em;
    position: relative;
    cursor: pointer;
    transition: 0.2s;
    width: 15em;
    background: ${(props) =>
      props.className?.includes("selected") ? "#eceff1" : "#b0bec5"};
    z-index: ${(props) => (props.className?.includes("selected") ? "6" : "5")};
  `

  const AddButton = styled.div`
    color: white;
    position: relative;
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px;
  `

  return (
    <TabsContainer>
      {Object.entries(flows).map(([id, flow]) => (
        <Tab
          className={selectedFlowId === id ? "selected" : ""}
          key={id}
          onClick={() => dispatch(loadFlow(id))}
        >
          {flow.name}
          <span
            className="align-self-center float-right"
            onClick={() => dispatch(deleteFlow(id))}
          >
            <i className="material-icons">close</i>
          </span>
        </Tab>
      ))}
      <AddButton onClick={() => dispatch(createNewFlow())}>
        <i className="material-icons">add</i>
      </AddButton>
    </TabsContainer>
  )
}
