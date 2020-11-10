/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useEffect, useRef } from "react";
import { useMiniSearch } from "react-minisearch";
import { FixedSizeList as List } from "react-window";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { LogItem } from "./LogItem";
import { LogsTableHeader } from "./LogsTableHeader";
import { ProcessedLog } from "../../flux/tranformLog";
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDebounce } from "../../hooks/useDebounce";
import {
  serializeLogsToCSVBlob,
  serializeLogsToJSONBlob,
  serializeLogsToTextBlob,
} from "../../helpers";
import { saveAs } from "file-saver";
import { ExpandingSearchbar } from "../Common/ExpandingSearchbar";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
const ROW_SIZE = 30;

const saveOptions = [
  { value: "csv", label: "CSV" },
  { value: "json", label: "JSON" },
  { value: "txt", label: "TXT" },
];

const fields = ["filename", "funcName", "msg", "name", "module", "pathname"];
const miniSearchOptions = { fields };

const applyFilters = <T extends Record<string, any>, K>(
  item: T,
  filters: { [key in keyof T]: any }
) =>
  Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc && Array.isArray(value)
      ? value.length === 0
        ? true
        : value.includes(item[key] as any)
      : value === item[key];
  }, true as boolean);

function usePrevious(value: any) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const generateFormatFileName = (format: Format) =>
  `jina-logs-${new Date()}.${format}`;

const saveLogData = (data: any, format: Format) => {
  const filename = generateFormatFileName(format);
  if (format === "csv") return saveAs(serializeLogsToCSVBlob(data), filename);
  if (format === "json") return saveAs(serializeLogsToJSONBlob(data), filename);
  if (format === "txt") return saveAs(serializeLogsToTextBlob(data), filename);
};

type Format = "json" | "csv" | "txt";

type Props = {
  data: ProcessedLog[];
  showLogDetails: (log: ProcessedLog) => void;
};

const itemKey = (index: number, data: { items: ProcessedLog[] }) =>
  data.items[index].id;

const arrayLikeToArray = (arrayLike: Readonly<any[]> | Set<any>) =>
  Array.isArray(arrayLike) ? arrayLike : Array.from(arrayLike);

const toOption = (list: Readonly<any[]> | Set<any>) =>
  arrayLikeToArray(list).map((item) => ({ label: item, value: item }));

function LogsTable({ data, showLogDetails }: Props) {
  const [scrolledToBottom, setScrolledToBottom] = React.useState(true);
  const windowListRef = useRef<any>();
  const [selectedSources, setSelectedSources] = React.useState<any[]>([]);
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
      addAllAsync([newLog]);
      buffer.current.push(newLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousLength, searchString]);

  const unfiltered = searchString ? searchResults : data;

  const resultData = (unfiltered || []).filter((result) =>
    applyFilters(result as any, {
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
  useDebounce(
    () => {
      search(searchString);
    },
    1000,
    [searchString]
  );

  const firstCol = 300;
  const secondCol = 300;

  return (
    <Card className="mb-4">
      <Card.Header className="p-0">
        <Row className="p-3">
          <Col md="8">
            <MultiFilterSelect
              isMulti
              options={toOption(sources)}
              onFilterChange={setSelectedSources}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Sources"
            />
            <MultiFilterSelect
              isMulti
              options={toOption(levels as any) as any}
              onFilterChange={setSelectedLevels}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="All Levels"
            />
            <MultiFilterSelect
              clearAfter
              options={saveOptions}
              onFilterChange={(option: any[]) =>
                saveLogData(data, option[0].value)
              }
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder="Download Logs"
              isSearchable={false}
            />
          </Col>
          <Col md="4">
            <ExpandingSearchbar
              value={searchString}
              onChange={setSearchString}
            />
          </Col>
        </Row>
        <LogsTableHeader columns={{ firstCol, secondCol }} />
      </Card.Header>
      <Card.Body className="log-stream-container p-0 border-top" id="log-stream-container">
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
        {resultData.length ? (
          <AutoSizer>
            {({ height, width }) => {
              const thirdCol = width - (firstCol + secondCol);
              return (
                <List
                  onScroll={({ scrollOffset }) => {
                    setScrolledToBottom(
                      (scrollOffset + height) / ROW_SIZE - resultData.length ===
                        0
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
                    showLogDetails,
                  }}
                  ref={windowListRef}
                >
                  {LogItem}
                </List>
              );
            }}
          </AutoSizer>
        ) : (
          <div className="my-5 py-5 text-center opacity-5">
            <h1>
              <i className="material-icons">inbox</i>
            </h1>
            <h3>No logs to display</h3>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export { LogsTable };
