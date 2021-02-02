import styled from "@emotion/styled";
import { PROPERTY_LIST } from "../redux/logStream/logStream.constants";
import { useDispatch, useSelector } from "react-redux";
import { selectFlowChart } from "../redux/flows/flows.selectors";
import React, { useEffect, useState } from "react";
import { ModalParams } from "../redux/global/global.types";
import ReactModal, { Styles } from "react-modal";
import { deleteNode, rerender, updateNode } from "../redux/flows/flows.actions";
import { Button } from "react-bootstrap";

const style: Styles = {
  overlay: {
    backgroundColor: "rgba(38, 50, 56, 0.5)",
  },
  content: {
    border: "none",
    bottom: "auto",
    minHeight: "40rem", // set height
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

const PodEdit = styled.div`
  width: 25rem;
  font-family: Montserrat;
`;

const PodEditContainer = styled.div`
  margin: 2rem 1.5rem;
  width: 100%;
`;

const Header1 = styled.header`
  font-weight: 600;
  font-size: 30px;
  color: #009999;
  margin-bottom: 0.5rem;
`;

const Header2 = styled.header`
  font-weight: 600;
  font-size: 20px;
  color: #009999;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 97%;
  background: #f1f3f4;
  border-radius: 5px;
  padding: 0.5em;
  border: 0;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled(Button)`
  width: 97%;
`;

type Props = {
  open: boolean;
  closeModal: () => void;
  modalParams: ModalParams;
};

function PodEditComponent({ open, closeModal, modalParams }: Props) {
  const nodeId = modalParams?.nodeId || "";

  const flowChart = useSelector(selectFlowChart);
  const [node, setNode] = useState(flowChart.flow.nodes[nodeId]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(PROPERTY_LIST);
  const dispatch = useDispatch();

  useEffect(() => {
    const results = PROPERTY_LIST.filter((property: any) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(results);
  }, [searchQuery]);

  const _updateLabel = (label: string) => {
    const nodeUpdate = { label };
    dispatch(updateNode(node.id, nodeUpdate));
    setNode({ ...node, ...nodeUpdate });
    dispatch(rerender());
  };
  const _updateNodeProp = (name: string, value: string) => {
    const newNode = { ...node };
    newNode.properties[name] = value;
    dispatch(updateNode(node.id, newNode));
    setNode(newNode);
  };
  const _deleteNode = () => {
    dispatch(deleteNode(node.id));
    closeModal();
    dispatch(rerender());
  };

  const label = node.label || node.properties.name;

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
      <PodEdit>
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
          <div className="property-table d-flex flex-column flex-fill ">
            {filteredProperties.map((property) => {
              const { name, type } = property;

              return (
                <>
                  <Header2>{name}</Header2>
                  <Input
                    placeholder={type}
                    type={type === "int" ? "number" : "text"}
                    value={node.properties[name] || ""}
                    onChange={(e) => _updateNodeProp(name, e.target.value)}
                    className="property-value-input"
                  />
                </>
              );
            })}
          </div>

          <DeleteButton variant="danger" onClick={_deleteNode}>
            Delete Pod
          </DeleteButton>
        </PodEditContainer>
      </PodEdit>
    </ReactModal>
  );
}

export default PodEditComponent;
