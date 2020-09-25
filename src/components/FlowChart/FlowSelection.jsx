import React from "react";
import { Dropdown } from "react-bootstrap";

export default function FlowSelection(props) {
  return (
    <Dropdown className="flow-selection">
      <Dropdown.Toggle>Default Flow</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.loadExample("pokedex")}>
          New Flow
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.loadExample("pokedex")}>
          Current Flow
        </Dropdown.Item>
        <Dropdown.Header>Examples</Dropdown.Header>
        <Dropdown.Item onClick={() => props.loadExample("pokedex")}>
          Pokedex Query
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.loadExample("southpark")}>
          South Park Query
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.loadExample("flower")}>
          Flower Search Query
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
