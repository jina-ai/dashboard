import React from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export default function ExampleSelection(props) {
  return (
    <div className="example-selection">
      <DropdownButton
        as={ButtonGroup}
        title="Load Example"
        id="bg-nested-dropdown"
      >
        <Dropdown.Item onClick={() => props.loadExample("pokedex")}>
          Pokedex Query
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.loadExample("southpark")}>
          South Park Query
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.loadExample("flower")}>
          Flower Search Query
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
