import React, { useEffect, useState } from "react"
import Matches from "./Matches"
import Scores from "./Scores"
import { DebugResponse, Score } from "../../views/DebuggingTool"
import { Card, CardHeader, CardContent, Box } from "@material-ui/core"

type ResponseProps = {
  response: DebugResponse | null
}

const Response = ({ response }: ResponseProps) => {
  const [score, setScore] = useState<Score | null>(null)
  const [showScore, setShowScore] = useState(false)
  const onScoreClick = (score: any) => {
    console.log("on score click: ", score)
    setShowScore(true)
    setScore(score)
  }
  useEffect(() => {
    setScore(null)
  }, [response])
  const hasResponse = response !== null && response?.data?.docs?.length > 0
  return (
    <Card>
      <CardHeader
        title="Documents and matches"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
        <Box position="relative">
          {hasResponse && (
            <Matches doc={response.data.docs[0]} onScoreClick={onScoreClick} />
          )}
          {hasResponse && score && showScore && (
            <Scores score={score} close={() => setShowScore(false)} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
export default Response
