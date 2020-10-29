import React from "react";
import { Col, FormInput } from "shards-react";

type Props = {
  colSpan?: number;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: any) => void;
};

export default function FormItem({
  colSpan = 6,
  label,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <Col md={colSpan} className="form-group">
      <label>{label}</label>
      <FormInput placeholder={placeholder} value={value} onChange={onChange} />
    </Col>
  );
}
