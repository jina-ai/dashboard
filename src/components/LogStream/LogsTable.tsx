/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useEffect, useRef } from "react";
import { useMiniSearch } from "react-minisearch";
import { usePrevious } from "./usePrevious";
import { FixedSizeList as List } from "react-window";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { applyFilters } from "./useFilters";
import { LogItem } from "./LogItem";
import { ProcessedLog } from "../../flux/tranformLog";
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
import { useDebounce } from "../../hooks/useDebounce";
const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
const ROW_SIZE = 30;

const fields = ["filename", "funcName", "msg", "name", "module", "pathname"];
const miniSearchOptions = { fields };

type Format = "json" | "csv" | "tsv" | "txt";

type Props = {
  data: ProcessedLog[];
  downloadLogs: (format: Format) => void;
};

const itemKey = (index: number, data: { items: ProcessedLog[] }) =>
  data.items[index].id;

const arrayLikeToArray = (arrayLike: Readonly<any[]> | Set<any>) =>
  Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);

const toOption = (list: Readonly<any[]> | Set<any>) =>
  arrayLikeToArray(list).map((item) => ({ label: item, value: item }));

function LogsTable({ data, downloadLogs }: Props) {
  const [scrolledToBottom, setScrolledToBottom] = React.useState(true);
  const windowListRef = useRef<any>();
  const [pods, setPods] = React.useState<Set<string>>(new Set());
  const [selectedSources, setSelectedSources] = React.useState<any[]>([]);
  const [selectedPods, setSelectedPods] = React.useState<any[]>([]);
  const [selectedLevels, setSelectedLevels] = React.useState<
    { value: ProcessedLog["levelname"] }[]
  >([]);
  const [searchString, setSearchString] = React.useState("");
  const { search, searchResults, addAllAsync } = useMiniSearch(
    data,
    miniSearchOptions
  );
  const buffer = useRef<any[]>([]);
  const previousLength = usePrevious(data.length);
  useEffect(() => {
    if (previousLength && previousLength! > 0) {
      const newLog = data[previousLength! - 1];
      setPods((prevPods) => prevPods.add(newLog.pod));
      addAllAsync([newLog]);
      buffer.current.push(newLog);
      console.log(buffer.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousLength, searchString]);

  const unfiltered = searchString ? searchResults : data;

  const resultData = (unfiltered || []).filter((result) =>
    applyFilters(result as any, {
      levelname: selectedLevels.map(({ value }) => value),
      name: selectedSources.map(({ value }) => value),
      pod: selectedPods.map(({ value }) => value),
    })
  );
  const sources = data.reduce((acc, curr) => acc.add(curr.name), new Set());
  useEffect(() => {
    if (windowListRef.current && scrolledToBottom) {
      windowListRef.current.scrollToItem(resultData.length);
    }
  }, [resultData.length, scrolledToBottom]);
  useDebounce(
    () => {
      search(searchString);
    },
    1000,
    [searchString]
  );

  return (
    <Card className="mb-4">
      <Card.Header className="p-3">
        <Row>
          <Col md="8">
            <MultiFilterSelect
              options={toOption(pods)}
              onFilterChange={setSelectedPods}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Pods"
            />
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
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
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
            const firstCol = 300;
            const secondCol = 300;
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
