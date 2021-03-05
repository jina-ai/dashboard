import React, { useState } from "react"
import { Collapse } from "react-bootstrap"
import logger from "../../logger"
import { Levels } from "../../redux/logStream/logStream.types"

type IconState = "success" | "pending" | "warning" | "failed"
type Icons = {
  [iconState in IconState]: {
    name: string
    color: string
  }
}

const _icons: Icons = {
  success: {
    name: "check_circle",
    color: "success",
  },
  pending: {
    name: "pending",
    color: "muted",
  },
  warning: {
    name: "error",
    color: "warning",
  },
  failed: {
    name: "cancel",
    color: "critical",
  },
}

type StatusString = "success" | "pending" | "warning" | "failed"

type CountSummaryProps = {
  levels?: Levels
  numItems: number
  title: string
}

function CountSummary({ levels, numItems }: CountSummaryProps) {
  logger.log("levels:", levels)
  return <span className="ml-2 text-muted">({numItems})</span>
}

function getStatusFromLevels(levels: Levels): StatusString {
  const keys = Object.keys(levels)
  if (
    keys.find((k) => k.toLowerCase() === "critical") ||
    keys.find((k) => k.toLowerCase() === "error")
  )
    return "failed"
  if (keys.find((k) => k.toLowerCase() === "warning")) return "warning"
  return "success"
}

function StatusIcon({ levels }: { levels: Levels }) {
  const status = getStatusFromLevels(levels)
  const icon = _icons[status]
  return (
    <i className={`no-select material-icons log-${icon.color} mr-2`}>
      {icon.name}
    </i>
  )
}

type ExpandIndicator = {
  expanded: boolean
}

function ExpandController({ expanded }: ExpandIndicator) {
  return (
    <i
      className={`no-select material-icons text-muted cursor-pointer ${
        expanded ? "rotate-90" : ""
      } mr-2`}
    >
      arrow_forward_ios
    </i>
  )
}

type Props = {
  title: string
  body: string
  numItems: number
  group: string
  levels?: Levels
}

function LogGroup({ title, body, levels, numItems, group }: Props) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={`log-group-item m-2 ${expanded ? "bg-light" : ""}`}>
      <div
        className="log-group-header cursor-pointer p-2"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <ExpandController expanded={expanded} />
        {levels && <StatusIcon levels={levels} />}
        <span
          className={
            group === "group-level" ? `log-${title.toLowerCase()}` : ""
          }
        >
          {title}
        </span>
        {!levels && (
          <CountSummary levels={levels} numItems={numItems} title={title} />
        )}
      </div>
      <Collapse in={expanded} timeout={100}>
        <div className="log-group-body p-3">
          <div className="bg-white border">{body}</div>
        </div>
      </Collapse>
    </div>
  )
}

export { LogGroup }
