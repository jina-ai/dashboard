import React, { useState, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import { FixedSizeList as List } from "react-window";
import { Card, Row, Col } from "react-bootstrap";
import AutoSizer from "react-virtualized-auto-sizer";
import FlexSearch from "flexsearch";
import { saveAs } from "file-saver";

import { MultiFilterSelect } from "../Common/MultiFilterSelect";
import { LogItem } from "./LogItem";
import { LogsTableHeader } from "./LogsTableHeader";
import { ProcessedLog } from "../../flux/tranformLog";
import { ExpandingSearchbar } from "../Common/ExpandingSearchbar";
import { LogGroup } from "./LogGroup";

import {
  serializeLogsToCSVBlob,
  serializeLogsToJSONBlob,
  serializeLogsToTextBlob,
} from "../../helpers";

const ROW_SIZE = 30;
const DEFAULT_VIEW = "table";
const VIEW_PREFERENCE_NAME = "logs-view-preference";
const POD_NAME_SPLIT_CHAR = "-";

const SEARCH_FIELDS = ["filename","funcName","module","message","pathname","name"];

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;

const saveOptions = [
  { value: "csv", label: "CSV" },
  { value: "json", label: "JSON" },
  { value: "txt", label: "TXT" },
];

const viewOptions: { [key: string]: { value: string; label: string } } = {
  table: {
    value: "table",
    label: "Table View",
  },
  "group-pod": {
    value: "group-pod",
    label: "Group by Pod",
  },
  "group-level": {
    value: "group-level",
    label: "Group by Level",
  },
};

function getUserViewPreference() {
  const preference = localStorage.getItem(VIEW_PREFERENCE_NAME);
  if (preference && viewOptions[preference]) return preference;
  return false;
}

function setUserViewPreference(preference: string) {
  localStorage.setItem(VIEW_PREFERENCE_NAME, preference);
}

function getInitialView() {
  return getUserViewPreference() || DEFAULT_VIEW;
}

let _lastNumLogs = 0;
let _searchIndex = FlexSearch.create({
  doc: {
    id: "id",
    field: SEARCH_FIELDS
  }
});

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

type Format = "json" | "csv" | "txt";

type View = "group-pod" | "group-level" | "table";

const generateFileName = (format: Format) =>
  `jina-logs-${new Date()}.${format}`;

const saveLogData = (data: any, format: Format) => {
  const filename = generateFileName(format);
  if (format === "csv") return saveAs(serializeLogsToCSVBlob(data), filename);
  if (format === "json") return saveAs(serializeLogsToJSONBlob(data), filename);
  if (format === "txt") return saveAs(serializeLogsToTextBlob(data), filename);
};

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

function LogsList({ data, firstCol, secondCol, showLogDetails, small }: any) {
  const listRef = useRef<any>();
  const [scrolledToBottom, setScrolledToBottom] = useState(true);

  useEffect(() => {
    if (listRef.current && scrolledToBottom) {
      listRef.current.scrollToItem(data.length);
    }
  }, [data.length, scrolledToBottom]);

  return (
    <div>
      <LogsTableHeader columns={{ firstCol, secondCol }} border={!small} />
      <div
        className={`log-stream-container${
          small ? "-small" : ""
        } p-0 border-top`}
      >
        {!scrolledToBottom && (
          <div
            onClick={() => listRef.current.scrollToItem(data.length)}
            className={`back-to-bottom active`}
          >
            <i className="material-icons">arrow_downward</i> Back to Bottom
          </div>
        )}
        <AutoSizer>
          {({ height, width }) => {
            const thirdCol = width - (firstCol + secondCol);
            return (
              <List
                onScroll={({ scrollOffset }) => {
                  setScrolledToBottom(
                    (scrollOffset + height) / ROW_SIZE - data.length === 0
                  );
                }}
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={ROW_SIZE}
                itemKey={itemKey}
                itemData={{
                  items: data,
                  columns: { firstCol, secondCol, thirdCol },
                  showLogDetails,
                }}
                ref={listRef}
              >
                {LogItem}
              </List>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
}

type GroupedLogProps = {
  groupedData: any;
  grouping: string;
  firstCol: any;
  secondCol: any;
  showLogDetails: any;
};

function GroupedLogs({
  groupedData,
  grouping,
  firstCol,
  secondCol,
  showLogDetails,
}: GroupedLogProps) {
  return (
    <Card.Body className="log-stream-container p-0 border-top">
      {Object.keys(groupedData).length && (
        <div className="log-group-container">
          {Object.entries(groupedData).map(([key, data]: any, idx: number) => (
            <LogGroup
              group={grouping}
              key={idx}
              title={key}
              levels={data.levels}
              numItems={data.data.length}
              body={
                <LogsList
                  firstCol={firstCol}
                  secondCol={secondCol}
                  data={data.data}
                  showLogDetails={showLogDetails}
                  small
                />
              }
            />
          ))}
        </div>
      )}
    </Card.Body>
  );
}

function LogsTable({ data, showLogDetails }: Props) {
  const [currentView, setCurrentView] = useState(() => getInitialView());

  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<any[]>([]);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");

  const search = useCallback(async () => {
    const newData = data.slice(_lastNumLogs,data.length)
    _searchIndex.add(newData);
    _lastNumLogs = data.length;
    const searchResults = await _searchIndex.search(searchString);
    setSearchResults(searchResults);
    // @ts-ignore
  }, [searchString, data.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchString && data.length) search();
  }, [data.length, searchString, search]);

  function setView(view: View) {
    setCurrentView(view);
    setUserViewPreference(view);
  }

  const unfiltered = searchString ? searchResults : data;
  const sources = data.reduce((acc, curr) => acc.add(curr.name), new Set());

  let groupedData: any;

  let resultData = (unfiltered || []).filter((result) =>
    applyFilters(result as any, {
      level: selectedLevels.map(({ value }) => value),
      name: selectedSources.map(({ value }) => value),
    })
  );

  if (currentView === "group-pod") {
    const podNames = arrayLikeToArray(sources).map(
      (name: string) => name.toLowerCase().split(POD_NAME_SPLIT_CHAR)[0]
    );
    groupedData = {};
    podNames.forEach((podName: string) => {
      const pod: any = {};

      pod.data = (resultData || []).filter(
        (log: any) => log.name && log.name.toLowerCase().startsWith(podName)
      );

      if (!pod.data.length) return;
      pod.levels = _.countBy(pod.data, "level");
      groupedData[podName] = pod;
    });
  } else if (currentView === "group-level") {
    groupedData = {};
    levels.forEach((level: string) => {
      const levelItem: any = {};

      levelItem.data = (resultData || []).filter(
        (log: any) => log.level === level
      );

      if (!levelItem.data.length) return;
      groupedData[level] = levelItem;
    });
  }

  const firstCol = 300;
  const secondCol = 300;

  return (
    <Card className="mb-4">
      <Card.Header className="p-0">
        <Row className="p-3">
          <Col md="8">
            <MultiFilterSelect
              clearAfter
              options={Object.values(viewOptions)}
              onFilterChange={(option: any[]) => setView(option[0].value)}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder={
                currentView === "table" ? (
                  <span>
                    <i className="material-icons mr-2">table_rows</i>Table View
                  </span>
                ) : (
                  <span>
                    <i className="material-icons mr-2">view_list</i>
                    {viewOptions[currentView].label}
                  </span>
                )
              }
              isSearchable={false}
            />
            {currentView === "table" && (
              <MultiFilterSelect
                isMulti
                options={toOption(sources)}
                onFilterChange={setSelectedSources}
                className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
                placeholder={
                  <span>
                    <i className="material-icons mr-2">mediation</i>All Sources
                  </span>
                }
              />
            )}
            <MultiFilterSelect
              isMulti
              options={toOption(levels as any) as any}
              onFilterChange={setSelectedLevels}
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder={
                <span>
                  <i className="material-icons mr-2">bar_chart</i>All Levels
                </span>
              }
            />
            <MultiFilterSelect
              clearAfter
              options={saveOptions}
              onFilterChange={(option: any[]) =>
                saveLogData(data, option[0].value)
              }
              className="logstream-select mb-2 mr-0 mb-md-0 mr-md-2"
              placeholder={
                <span>
                  <i className="material-icons mr-2">download</i>Download Logs
                </span>
              }
              isSearchable={false}
            />
          </Col>
          <Col md="4">
            <ExpandingSearchbar
              placeholder="search logs..."
              value={searchString}
              onChange={setSearchString}
            />
          </Col>
        </Row>
      </Card.Header>
      {currentView === "table" ? (
        <LogsList
          firstCol={firstCol}
          secondCol={secondCol}
          data={resultData}
          showLogDetails={showLogDetails}
        />
      ) : (
        <GroupedLogs
          firstCol={firstCol}
          secondCol={secondCol}
          grouping={currentView}
          groupedData={groupedData}
          showLogDetails={showLogDetails}
        />
      )}
    </Card>
  );
}

export { LogsTable };
