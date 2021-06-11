import React from "react"
import Card from "@material-ui/core/Card"
import styled from "@emotion/styled"
import { Score } from "../../views/DebuggingTool"

type ScoreProps = {
  score: Score
}

const ScoreCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.25rem;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
`

const Scores = ({ score }: ScoreProps) => {
  let { op_name, operands, value, ref_id } = score
  if (!op_name && !operands && !value) {
    return <></>
  }
  return (
    <ScoreCard>
      {op_name ? <span> {op_name} </span> : <></>}
      {/* Protobuff removes float values that are 0.0. Hence the default value 0.0 */}
      {value ? (
        <span>Score value: {value} </span>
      ) : (
        <span>Score value: 0.0</span>
      )}
      {operands ? (
        operands.map((operand) => <Scores score={operand} key={ref_id} />)
      ) : (
        <></>
      )}
    </ScoreCard>
  )
}

export default Scores
