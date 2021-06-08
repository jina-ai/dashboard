import React, { useState } from "react"
import styled from "@emotion/styled"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Matches from "./Matches"
import Scores from "./Scores"

type ResponseProps = {
  response: any
}
const ResponseContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.palette.grey[500]};
  border-radius: 0.25rem;
`
const ResponseTitle = styled.h6`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.grey[700]};
`

const Response = ({ response }: ResponseProps) => {
  const [score, setScore] = useState({})
  const onMatchSelection = (score: any) => {
    setScore(score)
  }
  return (
    <Box>
      <ResponseContainer>
        <Grid container>
          <Grid item xs={8}>
            <ResponseTitle>Documents and matches</ResponseTitle>
            {response && response?.data?.docs[0] ? (
              <Matches
                doc={response?.data?.docs[0]}
                onMatchSelection={onMatchSelection}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={4}>
            <ResponseTitle>Scores</ResponseTitle>
            {response && response?.data?.docs?.length > 0 && score ? (
              <Scores score={score} />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </ResponseContainer>
    </Box>
  )
}
export default Response
