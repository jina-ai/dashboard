import React from "react";
import ReactModal from "react-modal";
import { Row, Col } from "react-bootstrap";
const style = {
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
};

export default ({ open, closeModal, modalParams }) => {
  const log = modalParams.log || {};
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
          <b>Log Details</b>
        </h4>
        <h4>
          <span className="float-right close-icon">
            <i className="material-icons" onClick={closeModal}>
              close
            </i>
          </span>
        </h4>
      </div>
      <div className="modal-body px-0 pb-0 pt-1">
        <Row className="border-bottom pb-1">
          <Col xs="3">
            <span className="text-bold">msg</span>
          </Col>
          <Col xs="9">{log.msg}</Col>
        </Row>
        {Object.entries(log).map(([key, value]) =>
          key === "msg" ? (
            ""
          ) : (
            <Row className="border-bottom pb-1">
              <Col xs="3">
                <span className="text-bold">{key}</span>
              </Col>
              <Col xs="9">{JSON.stringify(value)}</Col>
            </Row>
          )
        )}
      </div>
    </ReactModal>
  );
};
