import React from "react";
import { Col, FormInput } from "shards-react";
import { SettingName } from "../../redux/settings/settings.types";

type Props = {
  colSpan?: number;
  label: string;
  value: SettingName;
  placeholder: string;
  onChange: (e: any) => void;
};

export default function BaseFormTextInput({
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
