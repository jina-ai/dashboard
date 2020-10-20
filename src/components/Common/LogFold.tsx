/** @jsx jsx */
import { jsx } from "@emotion/core";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  Badge,
} from "@material-ui/core";
import { useTheme } from "emotion-theming";
import { ExpandMore, Error } from "@material-ui/icons";
// import { FixedSizeList as List } from "react-window";
// import { ProcessedLog } from "../../flux/tranformLog";
// const itemKey = (index: number, data: { items: ProcessedLog[] }) =>
//   data.items[index].id;

type Props = {
  name: string;
  value: any;
};

function Log({ log }: any) {
  const { name, msg, levelname, process, formattedTimestamp, idx } = log;
  let logName = String(name);
  logName = logName.length > 20 ? logName.substring(0, 20) : logName;
  let levelInitial = String(levelname)[0];
  const { palette } = useTheme();

  return (
    <TableRow>
      <TableCell variant="body">
        <span css={{ fontFamily: "Roboto Mono" }}>{idx}</span>
      </TableCell>
      <TableCell variant="body">
        <span css={{ fontFamily: "Roboto Mono" }}>{formattedTimestamp}</span>
      </TableCell>
      <TableCell variant="body" align="right">
        <span css={{ fontFamily: "Roboto Mono", fontWeight: "bold" }}>
          {logName}@{process}[{levelInitial}]:
        </span>
      </TableCell>
      <TableCell variant="body" align="left">
        <span
          css={{
            fontFamily: "Roboto Mono",
            color: palette[levelname.toLowerCase()].main,
          }}
        >
          {msg}
        </span>
      </TableCell>
    </TableRow>
  );
}
function AccordionComponent({ name, value }: Props) {
  const { palette } = useTheme();
  console.log(palette);
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
        <Badge badgeContent={value.length} color="primary">
          <Error style={{ color: palette.primary.main }} />
        </Badge>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          {/* <AutoSizer>
            {({ height, width }) => {
              const firstCol = 300;
              const secondCol = 300;
              const thirdCol = width - (firstCol + secondCol);
              return (
                <List
                  height={400}
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
          </AutoSizer> */}
          <Table size="small">
            {value.map((log: any) => (
              <Log key={log.idx} log={log} />
            ))}
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
type LogFoldProps = {
  data: any;
};

function LogFold({ data }: LogFoldProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {data.map(({ key, value }: { key: string; value: any }) => (
        <AccordionComponent key={key} name={key} value={value} />
      ))}
    </div>
  );
}
export { LogFold };
