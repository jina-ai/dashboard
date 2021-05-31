import React, { useState } from "react"
import styled from "@emotion/styled"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import axios from "axios"
import gatewayClient from "../services/gatewayClient"

const TextInput = styled(TextField)`
    width: 100%
`
const FullSizeButton = styled(Button)`
    width: 100%;
    height: 100%;
`
const ResponseContainer = styled.div`
    padding: .5rem;
    border: 1px solid ${props => props.theme.palette.grey[500]};
    border-radius: .25rem;
`
const ResponseTitle = styled.h6`
    font-size: 1rem;
    color: ${props => props.theme.palette.grey[700]}
`

const DebuggingTool = () => {
    const [response, setResponse] = useState([])
    const handleRequest = async () => {
        const searchResult = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10")
        if (searchResult) {
            setResponse(searchResult.data)
        }
    }
    return (
        <Container data-name="debuggingTool">
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextInput label="Host" variant="outlined" />
                </Grid>
                <Grid item xs={5}>
                    <TextInput label="Port" variant="outlined" />
                </Grid>
                <Grid item xs={2}>
                    <FullSizeButton onClick={handleRequest} variant="contained">Go</FullSizeButton>
                </Grid>
                <Grid item xs={12}>
                    <TextInput
                        id="filled-textarea"
                        label="Request body"
                        placeholder="Request body"
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <ResponseContainer>
                            <ResponseTitle>
                                Routes (List of Pods)
                        </ResponseTitle>
                            {JSON.stringify(response)}
                        </ResponseContainer>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <ResponseContainer>
                            <ResponseTitle>
                                Documents and matches
                        </ResponseTitle>
                            {response && response.length > 0 ? <>{
                                response.map(item => (<img src={item.url} key={item.id} width={200} />))
                            }</> : <></>}
                        </ResponseContainer>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DebuggingTool
