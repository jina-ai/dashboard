import {
  Box,
  Grid,
  Tab,
  Tabs,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core"
import React from "react"
import styled from "@emotion/styled"

const TextInput = styled(TextField)`
  width: 100%;
`

const FileInput = styled.input`
  display: none;
`

function TabPanel(props: any) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  )
}

type Props = {
  tab: number
  setTab: (tab: number) => void
  textQuery: string
  setTextQuery: (text: string) => void
  mode: string
  setMode: (mode: string) => void
  files: FileList | null
  setFiles: (files: FileList | null) => void
  requestBody: string
  setRequestBody: (body: string) => void
}

const Request = ({
  tab,
  setTab,
  textQuery,
  setTextQuery,
  mode,
  setMode,
  setFiles,
  files,
  requestBody,
  setRequestBody,
}: Props) => (
  <Grid container direction={"row"}>
    <Grid item xs={2}>
      <Box p={2}>
        <Tabs
          orientation="vertical"
          aria-label="request type"
          value={tab}
          onChange={(e, v) => setTab(v)}
        >
          <Tab label="Formatted" />
          <Tab label="Raw" />
        </Tabs>
      </Box>
    </Grid>
    <Grid item xs={10}>
      <TabPanel value={tab} index={0}>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextInput
                label="Text Query (optional)"
                placeholder="Text Query"
                variant="outlined"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Response Mode
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  label="Response Mode"
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <FileInput
          type="file"
          multiple
          id="attach-files-button"
          onChange={(e) => setFiles(e.target.files)}
        />
        <label htmlFor="attach-files-button">
          <Button variant="contained" size="large" component="span">
            Attach Files
          </Button>
        </label>
        {files?.length ? (
          <div>
            {files.length} selected{" "}
            <Button onClick={() => setFiles(null)}>Remove</Button>
          </div>
        ) : (
          ""
        )}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TextInput
          id="filled-textarea"
          label="Request body"
          placeholder="Request body"
          multiline
          minRows={4}
          maxRows={4}
          variant="outlined"
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
        />
      </TabPanel>
    </Grid>
  </Grid>
)

export default Request
