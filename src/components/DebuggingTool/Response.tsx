import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Box from "@material-ui/core/Box"
import Matches from "./Matches"
import Scores from "./Scores"
import { DebugResponse, Score } from "../../views/DebuggingTool"

type ResponseProps = {
  response: DebugResponse | null
}

const ResponseContainer = styled.div`
  padding: 0.5rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.palette.grey[500]};
  border-radius: 0.25rem;
`
const ResponseTitle = styled.h6`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.grey[700]};
`

const Response = ({ response }: ResponseProps) => {
  const [score, setScore] = useState<Score | null>(null)
  const [showScore, setShowScore] = useState(false)
  const onMatchSelection = (score: any) => {
    setShowScore(true)
    setScore(score)
  }
  useEffect(() => {
    setScore(null)
  }, [response])
  const hasResponse = response !== null && response?.data?.docs?.length > 0
  return (
    <Box>
      <ResponseContainer>
        <ResponseTitle>Documents and matches</ResponseTitle>
        {hasResponse && (
          <Matches
            doc={response.data.docs[0]}
            onMatchSelection={onMatchSelection}
          />
        )}
        {hasResponse && score && showScore && (
          <Scores score={score} close={() => setShowScore(false)} />
        )}
      </ResponseContainer>
    </Box>
  )
}
export default Response
