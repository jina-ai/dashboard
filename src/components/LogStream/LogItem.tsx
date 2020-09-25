/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Row, Col } from "react-bootstrap";
import { memo } from "react";
import { areEqual } from "react-window";

type Props = {
  index: number;
  style: any;
  data: {
    columns: { firstCol: number; secondCol: number; thirdCol: number };
    items: any[];
    showLogDetails: (log: any) => void;
  };
};

const LogItem = memo(
  ({ index, style, data: { columns, items, showLogDetails } }: Props) => {
    const logData = items[index];
    const { name, msg, levelname, process, formattedTimestamp, idx } = logData;
    let logName = String(name);
    logName = logName.length > 20 ? logName.substring(0, 20) : logName;
    let levelInitial = String(levelname)[0];
    const { firstCol, secondCol, thirdCol } = columns;
    return (
      <div
        className={`log log-${String(
          levelname
        ).toLowerCase()} px-4 border-bottom py-1`}
        css={{ maxHeight: 84 }}
        style={style}
        onClick={() => showLogDetails(logData)}
      >
        <Row>
          <Col
            className="log-prefix text-muted px-0 d-flex flex-row"
            css={{ maxWidth: firstCol }}
          >
            <div className="text-bold mr-2">{idx}</div>
            <div className="ml-auto">{formattedTimestamp}</div>
          </Col>
          <Col
            className="log-prefix px-0 text-left text-md-right text-bold cursor-pointer"
            css={{ maxWidth: secondCol }}
          >
            {logName}@{process}[{levelInitial}]:
          </Col>
          <Col
            className="px-0"
            css={{
              maxHeight: 84,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: thirdCol,
              whiteSpace: "nowrap",
              paddingRight: 0,
              marginRight: 0,
            }}
          >
            {msg}
          </Col>
        </Row>
      </div>
    );
  },
  areEqual
);

export { LogItem };
