import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
type Props = {
  name: string;
  value: any;
};
function AccordionComponent({ name, value }: Props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<button>expand more</button>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{JSON.stringify(value)}</Typography>
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
