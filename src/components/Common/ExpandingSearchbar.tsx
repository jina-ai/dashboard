import React from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
  value: string | number;
  onChange: (newValue: string) => void;
};

function ExpandingSearchbar({ value, onChange }: Props) {
  return (
    <div className="expanding-searchbar">
      <InputGroup>
        <InputGroup.Prepend className="ml-auto">
          <InputGroup.Text>
            <i className="material-icons">search</i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type="text" placeholder="Search logs.." />
      </InputGroup>
    </div>
  );
}

export { ExpandingSearchbar };
