import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

const _icons = {
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
};

type Status = "success" | "pending" | "warning" | "failed";

type StatusProps = {
  status: Status;
};

function StatusIcon({ status }: StatusProps) {
  const icon = _icons[status];
  return (
    <i className={`no-select material-icons log-${icon.color} mr-2`}>
      {icon.name}
    </i>
  );
}

type ExpandIndicator = {
  expanded: boolean;
};

function ExpandController({ expanded }: ExpandIndicator) {
  return (
    <i
      className={`no-select material-icons text-muted cursor-pointer ${
        expanded ? "rotate-90" : ""
      } mr-2`}
    >
      arrow_forward_ios
    </i>
  );
}

function getStatusFromLevels(levels: string[]): Status {
  if (levels.find((l:string) => l.toLowerCase() === "critical") || levels.find((l:string) => l.toLowerCase() === "error"))
    return "failed";
  if (levels.find((l:string) => l.toLowerCase() === "warning")) return "warning";
  return "success";
}

type Props = {
  title: string;
  body: any;
  levels: string[];
};

function LogGroup({ title, body, levels }: Props) {
  const status = getStatusFromLevels(Object.keys(levels));
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`log-group-item m-2 ${expanded ? "bg-light" : ""}`}>
      <div
        className="log-group-header cursor-pointer p-2"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <ExpandController expanded={expanded} />
        <StatusIcon status={status} />
        {title}
      </div>
      <Collapse in={expanded} timeout={100}>
        <div className="log-group-body p-3">
          <div className="bg-white border">{body}</div>
        </div>
      </Collapse>
    </div>
  );
}

export { LogGroup };
