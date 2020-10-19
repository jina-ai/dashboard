/** @jsx jsx */
import { jsx } from "@emotion/core";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Table, TableRow, TableCell } from "@material-ui/core";
import { useTheme } from "emotion-theming";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          {value.map((log: any) => (
            <Log key={log.idx} log={log} />
          ))}
        </Table>
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
