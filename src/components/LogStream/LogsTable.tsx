/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment, useEffect, useRef } from "react";
import { useLunr } from "./useLunr";
import { useLunrIndex } from "./useLunrIndex";
import { FixedSizeList as List } from "react-window";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { applyFilters } from "./useFilters";
import { LogItem } from "./LogItem";
import { Card, Row, Col, Form } from "react-bootstrap";
import AutoSizer from "react-virtualized-auto-sizer";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
type Level = typeof levels[number];

type RawLog = {
  created: number;
  filename: string;
  funcName: string;
  levelname: Level;
  lineno: number;
  module: string;
  msg: string;
  name: string;
  pathname: string;
  process: number;
  processName: string;
  thread: number;
  threadName: string;
};

const ROW_SIZE = 84;

const columns = [
  { dataKey: "created", width: 200 },
  { dataKey: "name", width: 200 },
  { dataKey: "levelname", width: 200 },
];

const fields = ["filename", "funcName", "msg", "name", "module", "pathname"];

type Props = {
  data: any[];
};
const buildStore = (data: any, refField: any) => {
  return data.reduce((acc: any, curr: any) => {
    acc[curr[refField]] = curr;
    return acc;
  }, {});
};
const width = 900;

const itemKey = (index: number, data: { items: RawLog[] }) =>
  data.items[index].created;

const arrayLikeToArray = (arrayLike: Readonly<any[]> | Set<any>) =>
  Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);

const toOption = (list: Readonly<any[]> | Set<any>) =>
  arrayLikeToArray(list).map((item) => ({ label: item, value: item }));

function LogsTable({ data }: Props) {
  const windowListRef = useRef<any>();
  const index = useLunrIndex({
    documents: data,
    fields: fields,
  });

  const store = React.useMemo(() => buildStore(data, "idx"), [data.length]);
  const [selectedSources, setSelectedSources] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [searchString, setSearchString] = React.useState();
  const results = useLunr(searchString, index, store);
  const unfiltered = searchString ? Object.values(results) : data;

  const resultData = unfiltered.filter((result) =>
    applyFilters(result, {
      levelname: selectedLevels.map(({ value }) => value),
      name: selectedSources.map(({ value }) => value),
    })
  );
  const sources = data.reduce((acc, curr) => acc.add(curr.name), new Set());
  useEffect(() => {
    if (windowListRef.current) {
      windowListRef.current.scrollToItem(resultData.length);
    }
  }, [resultData.length]);

  return (
    <Card className="mb-4">
      <Card.Header className="p-3">
        <Row>
          <Col md="8" xs="6">
            <MultiFilterSelect
              options={toOption(sources)}
              onChange={setSelectedSources as any}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Logsources"
            />
            <MultiFilterSelect
              options={toOption(levels as any) as any}
              onChange={setSelectedLevels as any}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Levels"
            />
          </Col>
          <Col md="4" xs="6">
            <Form.Control
              placeholder="search logs..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value as any)}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body
        className="log-stream-container p-1 border-top"
        id="log-stream-container"
      >
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                height={height}
                width={width}
                itemCount={resultData.length}
                itemSize={ROW_SIZE}
                itemKey={itemKey}
                itemData={{
                  columns,
                  items: resultData,
                }}
                ref={windowListRef}
              >
                {LogItem}
              </List>
            );
          }}
        </AutoSizer>
      </Card.Body>
    </Card>
  );
}

export { LogsTable };
