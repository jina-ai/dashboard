import React, { useEffect, useState } from "react"
import { DocumentRequestCard } from "./Request"

type Props = {
  onChange: any
  getComponent: any
  value: string
  defaultValue: string
  errors: any
}

const CustomRequestBodyEditor = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("raw")
  const [value, setValue] = useState(props.value)

  const { errors, getComponent, onChange, defaultValue } = props

  let isInvalid = errors.size > 0 ? true : false
  const TextArea = getComponent("TextArea")

  const onDomChange = (inputValue: string) => {
    setValue(inputValue)
  }

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  return (
    <div className="body-param">
      <div className="tab-header">
        <div
          onClick={() => setCurrentTab("raw")}
          className={`tab-item ${currentTab === "raw" && "active"}`}
        >
          <h4 className="opblock-title">
            <span>Raw</span>
          </h4>
        </div>
        <div
          onClick={() => setCurrentTab("formatted")}
          className={`tab-item ${currentTab === "formatted" && "active"}`}
        >
          <h4 className="opblock-title">
            <span>Formatted Document</span>
          </h4>
        </div>
      </div>
      {currentTab === "raw" ? (
        <TextArea
          className={`body-param__text ${isInvalid ? "invalid" : ""}`}
          title={errors.size ? errors.join(", ") : ""}
          value={value || defaultValue}
          onChange={(e: any) => onDomChange(e.target.value)}
        />
      ) : (
        <DocumentRequestCard
          requestBody={value}
          defaultRequestBody={defaultValue}
          setRequestBody={onDomChange}
        />
      )}
    </div>
  )
}

export default CustomRequestBodyEditor
