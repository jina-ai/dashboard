import React, { useEffect, useState } from "react"
import Matches from "./Matches"
import Scores from "./Scores"
import { DebugResponse, Score } from "../../views/DebuggingTool"
import { Card, CardHeader, CardContent, Box } from "@material-ui/core"
import { DocumentTabs } from "./DocumentTabs"

const HEIGHT = 600

type ResponseProps = {
  response: DebugResponse | null
}

const Response = ({ response }: ResponseProps) => {
  const [docIndex, setDocIndex] = useState(0)
  const [score, setScore] = useState<Score | null>(null)
  const [showScore, setShowScore] = useState(false)
  const onScoreClick = (score: any) => {
    console.log("on score click: ", score)
    setShowScore(true)
    setScore(score)
  }
  useEffect(() => {
    setScore(null)
    setDocIndex(0)
  }, [response])
  const docs = Array.isArray(response?.data)
    ? response?.data
    : response?.data.docs
  const hasResponse = response !== null && docs && docs?.length > 0

  return (
    <Card>
      <CardHeader
        title="Documents and matches"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
        <Box display="flex" flexDirection="row">
          {docs && (
            <>
              <DocumentTabs
                height={HEIGHT}
                docs={docs}
                docIndex={docIndex}
                setDocIndex={setDocIndex}
              />
              <Box position="relative" flex="1">
                {hasResponse && (
                  <Matches
                    height={HEIGHT}
                    doc={docs[docIndex]}
                    onScoreClick={onScoreClick}
                  />
                )}
                {hasResponse && score && showScore && (
                  <Scores score={score} close={() => setShowScore(false)} />
                )}
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
export default Response
