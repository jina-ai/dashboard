import React, { useState } from "react"
import styled from "@emotion/styled"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import axios from "axios"
import RoutesTable from "../components/DebuggingTool/RouteTable"
import Response from "../components/DebuggingTool/Response"
import Request from "../components/DebuggingTool/Request"
import { LinearProgress } from "@material-ui/core"
import { formatDemoRequest } from "../helpers/format"

const TextInput = styled(TextField)`
  width: 100%;
`
const FullSizeButton = styled(Button)`
  width: 100%;
  height: 100%;
`
const SectionContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.palette.grey[500]};
  border-radius: 0.25rem;
`
const SectionTitle = styled.h6`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.grey[700]};
`

export type ResponseMode = "text" | "image" | "audio" | "video"

export type Route = {
  end_time: string
  start_time: string
  pod: string
  pod_id: string
}

export type Score = {
  description: string
  op_name: string
  ref_id: string
  operands?: Score[]
  value?: number
}

export type Match = {
  id: string
  score: Score
  mime_type: string
  adjacency?: number
  granularity?: number
  text?: string
  uri?: string
}

export type Chunk = {
  id: string
  granularity?: number
  content_hash: string
  mime_type: string
  parent_id: string
  text?: string
  uri?: string
  matches: Match[]
}

export type Doc = {
  id: string
  tags: any
  text?: string
  uri?: string
  mime_type?: string
  matches?: Match[]
  chunks?: Chunk[]
}

export type DebugResponse = {
  request_id: string
  parameters: { mode: ResponseMode }
  routes: Route[]
  header: {
    exec_endpoint: string
  }
  data: {
    docs: Doc[]
  }
}

const DebuggingTool = () => {
  const [response, setResponse] = useState<DebugResponse | null>(null)
  const [files, setFiles] = useState<FileList | null>(null)
  const [host, setHost] = useState("127.0.0.1")
  const [port, setPort] = useState("45678")
  const [textQuery, setTextQuery] = useState("")
  const [mode, setMode] = useState<ResponseMode>("text")
  const [requestBody, setRequestBody] = useState("")
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleRequest = async () => {
    setLoading(true)
    let formattedRequest
    if (tab === 0) {
      formattedRequest = await formatDemoRequest(textQuery, files, mode)
      console.log("formattedRequest:", formattedRequest)
    } else {
      formattedRequest = requestBody
    }

    try {
      const searchResult = await axios({
        method: "post",
        url: `http://${host}:${port}/search`,
        data: formattedRequest,
        headers: {
          mode: "no-cors",
        },
      })

      console.log("searchResult:", searchResult)

      setLoading(false)

      if (searchResult.data) {
        setResponse(searchResult.data)
      }
    } catch (e) {
      setLoading(false)
      alert("Error: " + e)
    }
  }

  return (
    <Container data-name="debuggingTool">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextInput
            label="Host"
            variant="outlined"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextInput
            label="Port"
            variant="outlined"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FullSizeButton onClick={handleRequest} variant="contained">
            Go
          </FullSizeButton>
        </Grid>
        <Grid item xs={12}>
          {loading && <LinearProgress />}
        </Grid>
        <Grid item xs={12}>
          <SectionContainer>
            <SectionTitle>Request Body</SectionTitle>
            <Request
              tab={tab}
              setTab={setTab}
              textQuery={textQuery}
              setTextQuery={setTextQuery}
              mode={mode}
              setMode={(newMode: string) => setMode(newMode as ResponseMode)}
              files={files}
              setFiles={setFiles}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
            />
          </SectionContainer>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <SectionContainer>
              <SectionTitle>Routes (List of Pods)</SectionTitle>
              {response && response.routes?.length && (
                <RoutesTable routes={response.routes} />
              )}
            </SectionContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Response response={response} />
        </Grid>
      </Grid>
    </Container>
  )
}
export default DebuggingTool
