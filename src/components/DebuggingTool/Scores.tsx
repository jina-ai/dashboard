import React, { useState } from "react"
import { Score } from "../../views/DebuggingTool"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemSecondaryAction,
  Grid,
  Typography,
  Box,
} from "@material-ui/core"

import { Close, ExpandLess, ExpandMore } from "@material-ui/icons"

type SidebarProps = {
  score: Score
  close: () => void
}

type ScoreProps = {
  score: Score
  nested?: boolean
}

const ScoresCard = styled(Card)`
  position: absolute;
  top: 1em;
  right: 1em;
  height: calc(800px - 2em);
  width: 300px;
  background: white;
  z-index: 10;
`

const ScoresCardContent = styled(CardContent)`
  height: 100%;
  overflow-y: auto;
`

const Scores = ({ score, nested }: ScoreProps) => {
  const [show, setShow] = useState(false)
  const { palette } = useTheme()

  let { op_name, operands, value, ref_id, description } = score
  if (!op_name && !operands && !value) {
    return <></>
  }

  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  const canToggle = operands && operands.length > 0

  return (
    <div style={{ paddingLeft: nested ? "10px" : "0px" }}>
      <ListItem button={canToggle} onClick={toggleShow}>
        <Grid container>
          <Grid item xs={4}>
            <Box paddingTop="0.75rem">
              <Typography noWrap fontSize="1.25rem">
                {score.value || "0.12341234"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box>
              <Typography noWrap>{op_name}</Typography>
              <Typography noWrap color={palette.grey[500]}>
                {description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {canToggle && (
          <ListItemSecondaryAction>
            ({operands?.length}){show ? <ExpandLess /> : <ExpandMore />}
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {operands && (
        <div>
          <Collapse in={show}>
            <List>
              {operands.map((operand, index) => (
                <Scores score={operand} key={`${index}-${ref_id}`} nested />
              ))}
            </List>
          </Collapse>
        </div>
      )}
    </div>
  )
}

const ScoresSidebar = ({ score, close }: SidebarProps) => {
  return (
    <ScoresCard elevation={5}>
      <CardHeader
        action={
          <IconButton aria-label="close" onClick={close}>
            <Close />
          </IconButton>
        }
        title="Score"
      />
      <ScoresCardContent>
        <List>
          <Scores score={score} />
        </List>
      </ScoresCardContent>
    </ScoresCard>
  )
}
export default ScoresSidebar
