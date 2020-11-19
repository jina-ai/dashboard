import React from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
  value: string | number;
  placeholder?:string;
  variant?:string;
  onChange: (newValue: string) => void;
};

function ExpandingSearchbar({ value, onChange,placeholder,variant }: Props) {
  return (
    <div className={`expanding-searchbar expanding-searchbar-${variant||"default"}`}>
      <InputGroup>
        <InputGroup.Prepend className="ml-auto">
          <InputGroup.Text>
            <i className="material-icons">search</i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
        />
        <InputGroup.Append>
          <InputGroup.Text>
            <i className={`cursor-pointer text-muted material-icons mr-3 ${!value?'d-invisible':""}`} onClick={()=>onChange("")}>cancel</i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export { ExpandingSearchbar };
