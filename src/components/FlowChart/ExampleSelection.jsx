import React from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

class ExampleSelection extends React.Component {
  render = () => {
    return (
      <div className="example-selection">
        <DropdownButton
          as={ButtonGroup}
          title="Load Example"
          id="bg-nested-dropdown"
        >
          <Dropdown.Item onClick={() => this.props.loadExample("pokedex")}>
            Pokedex
          </Dropdown.Item>
          <Dropdown.Item onClick={() => this.props.loadExample("southpark")}>
            South Park
          </Dropdown.Item>
          <Dropdown.Item onClick={() => this.props.loadExample("flower")}>
            Flower Search
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  };
}

export default ExampleSelection;
