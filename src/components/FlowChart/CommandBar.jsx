import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

const CommandBar = (props) => {
  return (
    <div className="command-bar-container">
      <div className="command-bar">
        <ButtonGroup>
          <Button variant="secondary" disabled>
            <i className="material-icons">play_arrow</i>
          </Button>
          <Button variant="secondary" disabled>
            <i className="material-icons">stop</i>
          </Button>
          <Button variant="secondary" disabled>
            <i className="material-icons">schedule</i>
          </Button>
          <Button variant="secondary" onClick={props.importChart}>
            <i className="material-icons">save_alt</i>
          </Button>
          <Button variant="secondary" onClick={props.copyChart}>
            <i className="material-icons">assignment</i>
          </Button>
          <Button variant="secondary" onClick={() => props.exportImage("png")}>
            <i className="material-icons">camera_alt</i>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export { CommandBar };
