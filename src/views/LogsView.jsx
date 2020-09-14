import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store } from "../flux";
import { saveAs } from "file-saver";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";

class LogsView extends React.Component {
  constructor() {
    super();
    this.state = {
      banner: Store.getBanner("logs"),
      logs: Store.getLogs(),
    };
    Store.on("update-ui", this.getData);
    Store.on("update-logs", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
    Store.on("update-logs", this.getData);
  };
  getData = () => {
    const banner = Store.getBanner("logs");
    const logs = Store.getLogs();
    this.setState({ banner, logs });
  };
  downloadLogs = (format) => {
    let logs = this.state.logs;
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
  };
  render = () => {
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
          <LogsTable downloadLogs={this.downloadLogs} data={this.state.logs} />
        </div>
      </Container>
    );
  };
}

export default LogsView;
