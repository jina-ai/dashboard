/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Row, Col } from "react-bootstrap";

type Props = {
  index: number;
  style: any;
  data: {
    columns: { firstCol: number; secondCol: number; thirdCol: number };
    items: any[];
  };
};

function LogItem({ index, style, data: { columns, items } }: Props) {
  const { name, msg, levelname, process, formattedTimestamp, idx } = items[
    index
  ];
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
    >
      <Row>
        <Col
          lg="2"
          md="3"
          className="log-prefix text-muted px-0 d-flex flex-row"
          css={{ maxWidth: firstCol }}
        >
          <div className="text-bold mr-2">{idx}</div>
          <div className="ml-auto">{formattedTimestamp}</div>
        </Col>
        <Col
          lg="3"
          md="4"
          className="log-prefix px-0 text-left text-md-right text-bold cursor-pointer"
          css={{ maxWidth: secondCol }}
        >
          {logName}@{process}[{levelInitial}]:
        </Col>
        <Col
          sm="12"
          md="5"
          lg="7"
          className="px-0"
          css={{
            maxHeight: 84,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: thirdCol,
            whiteSpace: "nowrap",
          }}
        >
          {msg}
        </Col>
      </Row>
    </div>
  );
}

export { LogItem };
