import React, { useState } from "react"
import styled from "@emotion/styled"
import {
  Container,
  TextField,
  Button,
  Grid,
  LinearProgress,
  Card,
  CardContent,
} from "@material-ui/core"
import axios from "axios"
import RoutesTable from "../components/DebuggingTool/RouteTable"
import Response from "../components/DebuggingTool/Response"
import Request from "../components/DebuggingTool/Request"

const TextInput = styled(TextField)`
  width: 100%;
`
const FullSizeButton = styled(Button)`
  width: 100%;
  height: 100%;
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
  scores: {
    values: {
      [key: string]: Score
    }
  }
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
  tags: { [key: string]: string }
  adjacency?: number
  modality?: string
  score?: { value: number }
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
  data: any
}

const DebuggingTool = () => {
  const [response, setResponse] = useState<DebugResponse | null>(null)
  const [host, setHost] = useState("127.0.0.1")
  const [port, setPort] = useState("45678")
  const [endpoint, setEndpoint] = useState("search")
  const [requestBody, setRequestBody] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRequest = async () => {
    setLoading(true)

    console.log("Sending Request Body", JSON.parse(requestBody))

    try {
      const searchResult = await axios.request<DebugResponse>({
        method: "post",
        url: `http://${host}:${port}/${endpoint}`,
        data: requestBody,
        headers: {
          mode: "no-cors",
        },
      })

      console.log("Search Result:", searchResult)
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
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextInput
                    label="Host"
                    variant="outlined"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextInput
                    label="Port"
                    variant="outlined"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextInput
                    label="Endpoint"
                    variant="outlined"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FullSizeButton onClick={handleRequest} variant="contained">
                    Go
                  </FullSizeButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {loading && <LinearProgress />}
        </Grid>
        <Grid item xs={12}>
          <Request requestBody={requestBody} setRequestBody={setRequestBody} />
        </Grid>
        {response && (
          <>
            <Grid item xs={12}>
              <RoutesTable routes={response?.routes} />
            </Grid>
            <Grid item xs={12}>
              <Response response={response} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  )
}
export default DebuggingTool
