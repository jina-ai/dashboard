import React from "react"

type ToggleButtonProps = {
  isExpanded: boolean
  onClick: () => void
}

export const ToggleButton = ({ isExpanded, onClick }: ToggleButtonProps) => {
  return (
    <button className="bg-transparent" onClick={onClick}>
      <strong
        aria-controls="collapsed-form"
        aria-expanded={isExpanded}
        className="text-primary font-medium d-inline-block"
      >
        Advanced{" "}
        <i className="material-icons align-middle">
          {isExpanded ? "arrow_drop_up" : "arrow_drop_down"}
        </i>
      </strong>
    </button>
  )
}
