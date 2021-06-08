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
const DebuggingTool = () => {
  const [response, setResponse] = useState([])
  const [host, setHost] = useState("127.0.0.1")
  const [port, setPort] = useState("45678")
  const [requestBody, setRequestBody] = useState()
  const handleRequest = async () => {
    const searchResult = await axios({
      method: "post",
      url: `http://${host}:${port}/search`,
      data: requestBody,
      headers: {
        mode: "no-cors",
      },
    })
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
          <TextInput
            id="filled-textarea"
            label="Request body"
            placeholder="Request body"
            multiline
            minRows={4}
            variant="outlined"
            value={requestBody}
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
          <Response response={response} />
        </Grid>
      </Grid>
    </Container>
  )
}
export default DebuggingTool
