import React from "react"
import styled from "@emotion/styled"
import { CardWithOutline } from "../Common/Card"
import CardContent from "@material-ui/core/CardContent"
import PieChart from "./PieChartBase"
import { LogLevels } from "../../redux/logStream/logStream.types"

type Props = {
  data: LogLevels
}
const PieChartContainer = styled(CardWithOutline)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  box-sizing: border-box;
`

function LogLevelPieChart({ data }: Props) {
  return (
    <PieChartContainer>
      <span>Log Levels</span>
      <CardContent>
        <PieChart data={data} />
      </CardContent>
    </PieChartContainer>
  )
}

export { LogLevelPieChart }
