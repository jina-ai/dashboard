import React from "react";
import ReactModal, { Styles } from "react-modal";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../redux/global/global.actions";
import { createNewFlow, duplicateFlow } from "../redux/flows/flows.actions";
import { selectExampleFlowsKeyEntryPairs } from "../redux/flows/flows.selectors";

const style: Styles = {
  overlay: {
    backgroundColor: "rgba(38, 50, 56, 0.5)",
  },
  content: {
    backgroundColor: "#EBE8E8",
    border: "none",
    bottom: "auto",
    maxHeight: "80%", // set height
    left: "50%",
    padding: "2rem",
    position: "fixed",
    right: "auto",
    top: "50%", // start from center
    transform: "translate(-50%,-50%)", // adjust top "up" based on height
    maxWidth: "30rem",
    overflow: "hidden",
  },
};

type Props = {
  open: boolean;
};

type NewFlowAction =
  | "close"
  | "create empty"
  | "create from yaml"
  | "create from template";

const NewFlow = ({ open }: Props) => {
  const dispatch = useDispatch();

  const exampleFlowsKeyEntryPairs = useSelector(
    selectExampleFlowsKeyEntryPairs
  );

  const handleAction = (action: NewFlowAction, yaml?: string) => {
    switch (action) {
      case "close":
        dispatch(closeModal());
        break;
      case "create from yaml":
        dispatch(showModal("import"));
        break;
      case "create from template":
        if (yaml) dispatch(duplicateFlow(yaml));
        dispatch(closeModal());
        break;
      case "create empty":
        dispatch(createNewFlow());
        dispatch(closeModal());
        break;
    }
  };

  const CloseModal = styled.div`
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 2rem;
    color: #ffffff;
    float: right;
    line-height: 100%;
  `;
  const CreateOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
  `;

  const CreateOption = styled.div`
    cursor: pointer;
    background-color: #ffffff;
    width: 7.5rem;
    height: 6.875rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  const CreateOptionAdd = () => {
    return (
      <i
        style={{
          fontSize: "6rem",
          color: "#C4C4C4",
          marginBottom: "-1rem",
        }}
        className="material-icons"
      >
        add
      </i>
    );
  };

  const OptionName = styled.span`
    color: black;
    font-size: 14px;
    font-weight: 600;
  `;

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={open}
      contentLabel="Action Modal"
      className="modal-content tiny-modal px-4 pt-3 pb-4"
      shouldCloseOnOverlayClick={true}
      style={style}
      onRequestClose={() => handleAction("close")}
      closeTimeoutMS={100}
    >
      <div>
        <CloseModal onClick={() => handleAction("close")}>
          <i className="material-icons" onClick={closeModal}>
            close
          </i>
        </CloseModal>
      </div>

      <CreateOptionsContainer>
        <CreateOption onClick={() => handleAction("create empty")}>
          <CreateOptionAdd />
          <OptionName>empty flow</OptionName>
        </CreateOption>

        <CreateOption onClick={() => handleAction("create from yaml")}>
          <CreateOptionAdd />
          <OptionName>from yaml</OptionName>
        </CreateOption>

        {exampleFlowsKeyEntryPairs.map((exampleFlowsKeyEntryPair) => (
          <CreateOption
            onClick={() =>
              handleAction(
                "create from template",
                exampleFlowsKeyEntryPair[1].yaml
              )
            }
          >
            <OptionName>{exampleFlowsKeyEntryPair[1].name}</OptionName>
          </CreateOption>
        ))}
      </CreateOptionsContainer>
    </ReactModal>
  );
};

export default NewFlow;
