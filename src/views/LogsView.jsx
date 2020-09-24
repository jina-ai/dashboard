import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store } from "../flux";
import { saveAs } from "file-saver";

function downloadLogs(format, logs) {
  let content = "";
  if (format === "json") content = "[\n";
  else if (format === "csv")
    content =
      "created,formatted timestamp,name,process,level name,message,filename,line number,module,funcname,pathname\n";

  for (let i = 0; i < logs.length; ++i) {
    let log = logs[i];
    if (format === "json")
      content +=
        JSON.stringify(logs[i]) + `${i < logs.length - 1 ? "," : ""}\n`;
    else if (format === "csv")
      content += `${log.created},"${log.formattedTimestamp}",${log.name},${log.process},${log.levelname},"${log.msg}",${log.filename},${log.lineno},${log.module},${log.funcname},${log.pathname}\n`;
    else
      content += `${log.formattedTimestamp} ${log.name}@${log.process} [${log.levelname}]: ${log.msg}\n`;
  }
  if (format === "json") content += "]";

  let filename = `jina-logs-${new Date()}.${format}`;
  let blob = new Blob([content], { type: "text,plain;charset=utf-8" });
  saveAs(blob, filename);
}

function LogsView() {
  const [logs, setLogs] = useState([]);
  const [flowPods, setFlowPods] = useState();
  function getData() {
    const newLogs = Store.getLogs();
    const { nodes } = Store.getFlowchart();
    setLogs(newLogs);
    setFlowPods(Object.keys(nodes));
  }
  useEffect(() => {
    Store.on("update-logs", getData);
    return () => Store.removeListener("update-logs");
  }, []);
  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Log Stream"
            subtitle="Network"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col md="10" className="mb-4">
            <LogLevelSummaryChart />
          </Col>
          <Col md="2" className="mb-4">
            <LogLevelPieChart />
          </Col>
        </Row>
        <LogsTable downloadLogs={downloadLogs} pods={flowPods} data={logs} />
      </div>
    </Container>
  );
}

export { LogsView };
