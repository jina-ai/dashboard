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
  Divider,
  ListSubheader,
} from "@material-ui/core"

import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Collapse } from "react-bootstrap"
import { Add, Close } from "@material-ui/icons"
import { nanoid } from "nanoid"
import { formatDebugRequest } from "../../helpers/format"
import _ from "lodash"

const TextInput = styled(TextField)`
  width: 100%;
`

const FileInput = styled.input`
  display: none;
`

type TabPanelProps = {
  children: any
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabPanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  )
}

type Props = {
  requestBody: string
  setRequestBody: (body: string) => void
}

const Request = ({ requestBody, setRequestBody }: Props) => {
  const [tab, setTab] = useState(0)
  const [textQuery, setTextQuery] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [rows, setRows] = useState<string[]>([nanoid()])
  const [locations, setLocations] = useState<{ [key: string]: string }>({})
  const [keys, setKeys] = useState<{ [key: string]: string }>({})
  const [values, setValues] = useState<{ [key: string]: string }>({})

  const toggleShowCustom = () => setShowCustom((prev) => !prev)

  useEffect(() => {
    const handleUpdate = async () => {
      const formattedBody = await formatDebugRequest(
        textQuery,
        files,
        rows,
        locations,
        keys,
        values
      )
      setRequestBody(formattedBody)
    }
    handleUpdate()
  }, [textQuery, files, rows, locations, keys, values, setRequestBody])

  const addRow = () => {
    const rowId = nanoid()
    setRows((prev) => {
      return [...prev, rowId]
    })
  }

  const removeRow = (rowId: string) => {
    const index = rows.indexOf(rowId)
    setRows((prev) => {
      prev.splice(index, 1)
      return prev.length === 0 ? [nanoid()] : [...prev]
    })
  }

  const setLocation = (id: string, location: string) => {
    setLocations((prev) => {
      prev[id] = location
      return { ...prev }
    })
  }

  const setKey = (id: string, key: string) => {
    setKeys((prev) => {
      prev[id] = key
      return { ...prev }
    })
  }

  const setValue = (id: string, value: string) => {
    setValues((prev) => {
      prev[id] = value
      return { ...prev }
    })
  }

  const removeFiles = () => {
    setFiles(null)
    const rowsToRemove = rows.filter(
      (id) => locations[id] && locations[id].startsWith("file")
    )
    rowsToRemove.forEach((row) => removeRow(row))
  }

  const numCustomFields = _.reduce(
    rows,
    (acc, rowId) => {
      if (values[rowId] && keys[rowId]) return acc + 1
      return acc
    },
    0
  )

  return (
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
              <Grid item xs={12}>
                <TextInput
                  label="Text Query (optional)"
                  placeholder="Text Query"
                  variant="outlined"
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <FileInput
                type="file"
                multiple
                id="attach-files-button"
                onChange={(e) => setFiles(e.target.files)}
              />
              <label htmlFor="attach-files-button">
                <Button size="large" component="span">
                  Attach Files
                </Button>
              </label>
              {files?.length ? (
                <Box display="inline" marginLeft={3}>
                  {files.length} files selected{" "}
                  <Button onClick={removeFiles}>Remove</Button>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="right" onClick={toggleShowCustom}>
                <Button size="large">
                  {showCustom ? "Hide " : "Show "}Custom Fields
                  {numCustomFields ? ` (${numCustomFields})` : ""}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Collapse in={showCustom}>
            <Box>
              <Divider />
              {rows.map((id) => (
                <Grid key={id} container spacing={2} paddingTop={3}>
                  <Grid item xs={2}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Attach To
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={locations[id] || "parameters"}
                        onChange={(e) => setLocation(id, e.target.value)}
                        label="Response Mode"
                      >
                        <MenuItem value="root">root</MenuItem>
                        <MenuItem value="parameters">parameters</MenuItem>
                        {(textQuery || files?.length) && (
                          <ListSubheader>Data</ListSubheader>
                        )}
                        {textQuery ? (
                          <MenuItem value="textQuery">text query</MenuItem>
                        ) : (
                          false
                        )}
                        {files?.length &&
                          Array.from(files).map((file) => (
                            <MenuItem
                              value={`file-${file.name}`}
                              key={file.name}
                            >
                              {file.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextInput
                      label="Key"
                      placeholder="Text Query"
                      variant="outlined"
                      value={keys[id] || ""}
                      onChange={(e) => setKey(id, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                      label="Value"
                      placeholder="Text Query"
                      variant="outlined"
                      value={values[id] || ""}
                      onChange={(e) => setValue(id, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button size="large" onClick={() => removeRow(id)}>
                      <Close />
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Box paddingTop={3}>
                <Button size="large" onClick={addRow}>
                  <Add /> Add Field
                </Button>
              </Box>
            </Box>
          </Collapse>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TextInput
            id="filled-textarea"
            label="Request body"
            placeholder="Request body"
            multiline
            minRows={10}
            maxRows={20}
            variant="outlined"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default Request
