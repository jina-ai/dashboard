import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store } from "../flux";
import { nanoid } from "nanoid";

const init = [
  {
    created: 1586797308.277218,
    filename: "__init__.py",
    funcName: "_get_instance_from_yaml",
    levelname: "SUCCESS",
    lineno: 206,
    module: "__init__",
    msg: "initialize Flow from a yaml config",
    name: "gateway",
    pathname: "/Users/hanxiao/Documents/_jina/jina/flow/__init__.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797308.2787452,
    filename: "__init__.py",
    funcName: "start",
    levelname: "INFO",
    lineno: 466,
    module: "__init__",
    msg: "start logserver...",
    name: "connector",
    pathname: "/Users/hanxiao/Documents/_jina/jina/flow/__init__.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797309.39764,
    filename: "__init__.py",
    funcName: "start_log_server",
    levelname: "SUCCESS",
    lineno: 448,
    module: "__init__",
    msg: "logserver is started and available at http://0.0.0.0:5000",
    name: "Flow",
    pathname: "/Users/hanxiao/Documents/_jina/jina/flow/__init__.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797309.4010859,
    filename: "profile.py",
    funcName: "__enter__",
    levelname: "INFO",
    lineno: 126,
    module: "profile",
    msg: "post initiating, this may take some time...",
    name: "BaseExecutor",
    pathname: "/Users/hanxiao/Documents/_jina/jina/logging/profile.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797309.401885,
    filename: "profile.py",
    funcName: "__exit__",
    levelname: "INFO",
    lineno: 134,
    module: "profile",
    msg: "post initiating, this may take some time takes 0.001 secs",
    name: "BaseExecutor",
    pathname: "/Users/hanxiao/Documents/_jina/jina/logging/profile.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797309.4047549,
    filename: "gateway.py",
    funcName: "start",
    levelname: "SUCCESS",
    lineno: 54,
    module: "gateway",
    msg: "gateway is listening at: 0.0.0.0:53785",
    name: "GatewayPea",
    pathname: "/Users/hanxiao/Documents/_jina/jina/peapods/gateway.py",
    process: 25131,
    thread: 4406160832,
  },
  {
    created: 1586797309.416149,
    filename: "profile.py",
    funcName: "__enter__",
    levelname: "INFO",
    lineno: 126,
    module: "profile",
    msg: "post initiating, this may take some time...",
    name: "BaseExecutor",
    pathname: "/Users/hanxiao/Documents/_jina/jina/logging/profile.py",
    process: 25134,
    thread: 4406160832,
  },
  {
    created: 1586797309.4166,
    filename: "profile.py",
    funcName: "__exit__",
    levelname: "INFO",
    lineno: 134,
    module: "profile",
    msg: "post initiating, this may take some time takes 0.000 secs",
    name: "BaseExecutor",
    pathname: "/Users/hanxiao/Documents/_jina/jina/logging/profile.py",
    process: 25134,
    thread: 4406160832,
  },
  {
    created: 1586797309.416706,
    filename: "__init__.py",
    funcName: "_get_instance_from_yaml",
    levelname: "SUCCESS",
    lineno: 472,
    module: "__init__",
    msg: "initialize BaseExecutor from a yaml config",
    name: "BaseExecutor",
    pathname: "/Users/hanxiao/Documents/_jina/jina/executors/__init__.py",
    process: 25134,
    thread: 4406160832,
  },
  {
    created: 1586797309.417137,
    filename: "zmq.py",
    funcName: "init_sockets",
    levelname: "INFO",
    lineno: 112,
    module: "zmq",
    msg: "setting up sockets...",
    name: "chunk_seg-head",
    pathname: "/Users/hanxiao/Documents/_jina/jina/peapods/zmq.py",
    process: 25134,
    thread: 4406160832,
  },
  {
    created: 1586797309.418656,
    filename: "zmq.py",
    funcName: "init_sockets",
    levelname: "INFO",
    lineno: 136,
    module: "zmq",
    msg:
      "input tcp://0.0.0.0:53786 (PULL_BIND) \t output tcp://0.0.0.0:53791 (ROUTER_BIND)\t control over tcp://0.0.0.0:53790 (PAIR_BIND)",
    name: "chunk_seg-head",
    pathname: "/Users/hanxiao/Documents/_jina/jina/peapods/zmq.py",
    process: 25134,
    thread: 4406160832,
  },
].map((d) => ({ ...d, id: nanoid() }));

function LogsView() {
  const [logs, setLogs] = useState(init);
  const [flowPods, setFlowPods] = useState();
  function getData() {
    // const newLogs = Store.getLogs();
    const { nodes } = Store.getFlowchart();
    // setLogs([...newLogs]);
    setFlowPods(Object.keys(nodes));
  }
  const loadMore = () => {
    console.log("more");
    return new Promise((res) => {
      const newLogs = Store.getLogs();
      console.log(newLogs);
      setLogs([...newLogs]);
      res();
    });
  };
  useEffect(() => {
    // Store.on("update-logs", getData);
    // setLogs([...Store.getLogs()]);
    return () => Store.removeListener("update-logs", getData);
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
        <LogsTable loadMoreItems={loadMore} pods={flowPods} data={logs} />
      </div>
    </Container>
  );
}

export { LogsView };
