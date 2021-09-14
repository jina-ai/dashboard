/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"

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
      <div className="flex">
        <div
          className="log-prefix text-muted px-0 flex md:flex-1"
          css={{ maxWidth: firstCol }}
        >
          <div className="text-bold mr-2 text-lightGray">#</div>
          <div className="ml-auto text-lightGray">timestamp</div>
        </div>
        <div
          className="log-prefix px-0 text-right text-md-right text-bold md:flex-1"
          css={{ maxWidth: secondCol }}
        >
          source@process[level]:
        </div>
        <div
          className="px-0 md:flex-1 text-lightGray"
          css={{
            maxHeight: 84,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingRight: 0,
            marginRight: 0,
          }}
        >
          message
        </div>
      </div>
    </div>
  )
}

export { LogsTableHeader }
