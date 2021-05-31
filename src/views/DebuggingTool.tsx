import React, { useState } from "react"
import styled from "@emotion/styled"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import axios from "axios"

const TextInput = styled(TextField)`
  width: 100%;
`
const FullSizeButton = styled(Button)`
  width: 100%;
  height: 100%;
`
const ResponseContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.palette.grey[500]};
  border-radius: 0.25rem;
`
const ResponseTitle = styled.h6`
  font-size: 1rem;
  color: ${(props) => props.theme.palette.grey[700]};
`
type Route = {
  pod: string
  pod_id: string
  start_time: string
  end_time?: string
}

const DebuggingTool = () => {
  const [response, setResponse] = useState([])
  const [host, setHost] = useState("")
  const [port, setPort] = useState("")
  const [requestBody, setRequestBody] = useState("")
  const handleRequest = async () => {
    const searchResult = await axios.post(
      `http://${host}:${port}/search`,
      requestBody
    )
    if (searchResult) {
      setResponse(searchResult.data)
    }
  }
  return (
    <Container data-name="debuggingTool">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextInput
            label="Host"
            variant="outlined"
            onChange={(e) => setHost(e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextInput
            label="Port"
            variant="outlined"
            onChange={(e) => setPort(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FullSizeButton onClick={handleRequest} variant="contained">
            Go
          </FullSizeButton>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            id="filled-textarea"
            label="Request body"
            placeholder="Request body"
            multiline
            minRows={4}
            variant="outlined"
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <ResponseContainer>
              <ResponseTitle>Routes (List of Pods)</ResponseTitle>
              {response && response?.routes?.length > 0 ? (
                <RoutesTable routes={response.routes} />
              ) : (
                <></>
              )}
            </ResponseContainer>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <ResponseContainer>
              <ResponseTitle>Documents and matches</ResponseTitle>
              {response && response.length > 0 ? <>{}</> : <></>}
            </ResponseContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

type RoutesTableProps = {
  routes: Route[]
}

const RoutesTable = ({ routes }: RoutesTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pod</TableCell>
          <TableCell>Pod Id</TableCell>
          <TableCell>Start time</TableCell>
          <TableCell>End time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {routes.map((route) => (
          <TableRow key={route.pod_id}>
            <TableCell> {route.pod} </TableCell>
            <TableCell>{route.pod_id}</TableCell>
            <TableCell>{route.start_time}</TableCell>
            <TableCell>{route.end_time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DebuggingTool
