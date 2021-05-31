import React from "react"
import styled from "@emotion/styled"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const DebuggingTool = () => (
  <Container data-name="debuggingTool">
    <FormContainer>
      <TextField id="standard-basic" label="Host" variant="standard" />
      <TextField id="standard-basic" label="Port" variant="standard" />
      <Button variant="contained">Go</Button>
    </FormContainer>
  </Container>
)

export default DebuggingTool
