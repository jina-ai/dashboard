import React from "react";
import { Col, FormInput } from "shards-react";

export default function FormItem({
  colSpan = 6,
  label,
  value,
  placeholder,
  onChange,
}) {
  return (
    <Col md={colSpan} className="form-group">
      <label>{label}</label>
      <FormInput placeholder={placeholder} value={value} onChange={onChange} />
    </Col>
  );
}
