import React, { useState } from "react"
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from "@material-ui/core"
import styled from "@emotion/styled"
import { Score } from "../../views/DebuggingTool"
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
  top: 3.5em;
  right: 1em;
  height: calc(800px - 1.5em);
  width: 300px;
  background: white;
  z-index: 10;
`

const ScoresCardContent = styled(CardContent)`
  height: 100%;
  overflow-y: auto;
`

const ScoreValue = ({ value }: { value?: number }) => {
  const { palette } = useTheme()
  const displayString = String(value || "0.0")
  let fontSize
  let backgroundColor = palette.grey[600]
  if (displayString.length > 4) {
    fontSize = "0.85rem"
  }
  if (displayString === "0.0") {
    backgroundColor = palette.grey[300]
  }
  return (
    <Avatar variant="rounded" style={{ backgroundColor, fontSize }}>
      {displayString}
    </Avatar>
  )
}

const Scores = ({ score, nested }: ScoreProps) => {
  const [show, setShow] = useState(false)

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
        <ListItemAvatar>
          <ScoreValue value={score.value} />
        </ListItemAvatar>
        <ListItemText primary={op_name} secondary={description} />
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

const ScoresSidebar = ({ score, close }: SidebarProps) => (
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
export default ScoresSidebar
