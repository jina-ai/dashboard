/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import Grid from "@material-ui/core/Grid"

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
      <Grid container spacing={2}>
        <Grid
          item
          className="log-prefix text-muted px-0 d-flex flex-row"
          css={{ maxWidth: firstCol }}
        >
          <div className="text-bold mr-2">#</div>
        </Grid>
        <Grid item>
          <div className="ml-auto">timestamp</div>
        </Grid>
        <Grid
          item
          className="log-prefix px-0 text-left text-md-right text-bold"
          css={{ maxWidth: secondCol }}
        >
          source@process[level]:
        </Grid>
        <Grid
          item
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
        </Grid>
      </Grid>
    </div>
  )
}

export { LogsTableHeader }
