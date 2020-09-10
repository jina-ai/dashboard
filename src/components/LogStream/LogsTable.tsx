/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect, useRef } from "react";
import { useLunr } from "./useLunr";
import { useLunrIndex } from "./useLunrIndex";
import { FixedSizeList as List } from "react-window";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { applyFilters } from "./useFilters";
import { LogItem } from "./LogItem";
import {
  Card,
  Row,
  Col,
  Form,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
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

const ROW_SIZE = 30;

const fields = ["filename", "funcName", "msg", "name", "module", "pathname"];

type Format = "json" | "csv" | "tsv" | "txt";

type Props = {
  data: any[];
  downloadLogs: (format: Format) => void;
};

const buildStore = <T, K extends keyof T>(data: T[], refField: keyof K) => {
  return data.reduce((acc: any, curr: any) => {
    acc[curr[refField]] = curr;
    return acc;
  }, {});
};

const itemKey = (index: number, data: { items: RawLog[] }) =>
  data.items[index].created + data.items[index].name;

const arrayLikeToArray = (arrayLike: Readonly<any[]> | Set<any>) =>
  Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);

const toOption = (list: Readonly<any[]> | Set<any>) =>
  arrayLikeToArray(list).map((item) => ({ label: item, value: item }));

function LogsTable({ data, downloadLogs }: Props) {
  const [scrolledToBottom, setScrolledToBottom] = React.useState(true);
  const windowListRef = useRef<any>();
  const index = useLunrIndex({
    documents: data,
    fields: fields,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const store = React.useMemo(() => buildStore(data, "idx" as any), [
    data.length,
    data,
  ]);
  const [selectedSources, setSelectedSources] = React.useState<any[]>([]);
  const [selectedLevels, setSelectedLevels] = React.useState<any[]>([]);
  const [searchString, setSearchString] = React.useState("");
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
    if (windowListRef.current && scrolledToBottom) {
      windowListRef.current.scrollToItem(resultData.length);
    }
  }, [resultData.length, scrolledToBottom]);

  return (
    <Card className="mb-4">
      <Card.Header className="p-3">
        <Row>
          <Col md="8">
            <MultiFilterSelect
              options={toOption(sources)}
              onFilterChange={setSelectedSources}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Logsources"
            />
            <MultiFilterSelect
              options={toOption(levels as any) as any}
              onFilterChange={setSelectedLevels}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Levels"
            />
            <DropdownButton
              as={ButtonGroup}
              title="Download Logs"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item onClick={() => downloadLogs("csv")}>
                Download as CSV
              </Dropdown.Item>
              <Dropdown.Item onClick={() => downloadLogs("json")}>
                Download as JSON
              </Dropdown.Item>
              <Dropdown.Item onClick={() => downloadLogs("txt")}>
                Download as TXT
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md="4">
            <Form.Control
              placeholder="search logs..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value as string)}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body
        className="log-stream-container p-1 border-top"
        id="log-stream-container"
      >
        {!scrolledToBottom && (
          <div
            onClick={() =>
              windowListRef.current.scrollToItem(resultData.length)
            }
            className={`back-to-bottom active`}
          >
            <i className="material-icons">arrow_downward</i> Back to Bottom
          </div>
        )}
        <AutoSizer>
          {({ height, width }) => {
            const firstCol = 250;
            const secondCol = 250;
            const thirdCol = width - (firstCol + secondCol);
            return (
              <List
                onScroll={({ scrollOffset }) => {
                  setScrolledToBottom(
                    (scrollOffset + height) / ROW_SIZE - resultData.length === 0
                  );
                }}
                height={height}
                width={width}
                itemCount={resultData.length}
                itemSize={ROW_SIZE}
                itemKey={itemKey}
                itemData={{
                  items: resultData,
                  columns: { firstCol, secondCol, thirdCol },
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
