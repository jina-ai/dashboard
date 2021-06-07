import React from "react"
import Card from "@material-ui/core/Card"
import styled from "@emotion/styled"

type ScoreProps = {
  score: Score
}
export type Score = {
  value?: number
  op_name?: string
  description: string
  operands?: Score[]
  ref_id?: string
}

const ScoreCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.25rem;
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
      {value ? <span>Score value: {value} </span> : <></>}
      {operands ? (
        operands.map((operand) => <Scores score={operand} key={ref_id} />)
      ) : (
        <></>
      )}
    </ScoreCard>
  )
}

export default Scores
