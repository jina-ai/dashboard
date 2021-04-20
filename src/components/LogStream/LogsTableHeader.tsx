/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import { Row, Col } from "react-bootstrap"

type Props = {
  columns: { firstCol: number; secondCol: number }
  border?: boolean
}

const LogsTableHeader = ({
  columns: { firstCol, secondCol },
  border,
}: Props) => {
  return (
    <div
      className={`px-4 py-1 bg-light text-monospace ${
        border ? "border-top" : ""
      }`}
      css={{ maxHeight: 84 }}
    >
      <Row>
        <Col
          className="log-prefix text-muted px-0 d-flex flex-row"
          css={{ maxWidth: firstCol }}
        >
          <div className="text-bold mr-2">#</div>
          <div className="ml-auto">timestamp</div>
        </Col>
        <Col
          className="log-prefix px-0 text-left text-md-right text-bold"
          css={{ maxWidth: secondCol }}
        >
          source@process[level]:
        </Col>
        <Col
          className="px-0"
          css={{
            maxHeight: 84,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // width: "1",
            whiteSpace: "nowrap",
            paddingRight: 0,
            marginRight: 0,
          }}
        >
          message
        </Col>
      </Row>
    </div>
  )
}

export { LogsTableHeader }
