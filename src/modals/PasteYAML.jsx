import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import ReactModal from "react-modal";
import { Dispatcher, Constants, Store } from "../flux";

class PasteYAML extends Component {
  state = {};
  style = {
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

  listenForEnter = (key) => {
    if (key.charCode == 13) {
      this.importYAML();
    }
  };

  importYAML = () => {
    const yamlString = this.inputRef.value;
    Dispatcher.dispatch({
      actionType: Constants.IMPORT_CUSTOM_YAML,
      payload: yamlString,
    });
  };

  close = () => {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_MODAL,
    });
  };

  render = () => {
    const { open } = this.props;
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={open}
        contentLabel="Action Modal"
        className="modal-content tiny-modal px-4 pt-3 pb-4"
        shouldCloseOnOverlayClick={true}
        style={this.style}
        onRequestClose={this.close}
        closeTimeoutMS={100}
      >
        <div className="modal-header p-0">
          <h4>
            <b>Import YAML</b>
          </h4>
          <h4>
            <span className="float-right close-icon">
              <i className="material-icons" onClick={this.close}>
                close
              </i>
            </span>
          </h4>
        </div>
        <div className="modal-body px-0 pb-0">
          <Form.Group>
            <Form.Label>Custom YAML:</Form.Label>
            <Form.Control
              placeholder="Paste Here"
              ref={(ref) => (this.inputRef = ref)}
              as="textarea"
              rows="10"
            />
          </Form.Group>
        </div>
        <Button className="btn-primary" onClick={this.importYAML}>
          Continue
        </Button>
      </ReactModal>
    );
  };
}

export default PasteYAML;
