/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import Grid from "@material-ui/core/Grid"
import { CSSProperties, memo } from "react"
import { areEqual } from "react-window"
import { ProcessedLog } from "../../redux/logStream/logStream.types"

type Props = {
  index: number
  style: CSSProperties
  data: {
    columns: { firstCol: number; secondCol: number; thirdCol: number }
    items: ProcessedLog[]
    showLogDetails: (log: ProcessedLog) => void
  }
}

const LogItem = memo(
  ({ index, style, data: { columns, items, showLogDetails } }: Props) => {
    const logData = items[index]
    const { name, message, level, process, formattedTimestamp, idx } = logData
    let logName = String(name)
    logName = logName.length > 20 ? logName.substring(0, 20) : logName
    let levelInitial = String(level)[0]
    const { firstCol, secondCol, thirdCol } = columns
    return (
      <div
        data-name={`logItem-${index}`}
        className={`log log-${String(
          level
        ).toLowerCase()} px-4 border-bottom py-1`}
        css={{ maxHeight: 84 }}
        style={style}
        onClick={() => showLogDetails(logData)}
      >
        <Grid container>
          <Grid item
            className="log-prefix text-muted px-0 d-flex flex-row"
            css={{ maxWidth: firstCol }}
          >
            <div className="text-bold mr-2">{idx}</div>
            <div className="ml-auto">{formattedTimestamp}</div>
          </Grid>
          <Grid item
            className="log-prefix px-0 text-left text-md-right text-bold cursor-pointer"
            css={{ maxWidth: secondCol }}
          >
            {logName}@{process}[{levelInitial}]:
          </Grid>
          <Grid item
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
            {message}
          </Grid>
        </Grid>
      </div>
    )
  },
  areEqual
)

export { LogItem }
