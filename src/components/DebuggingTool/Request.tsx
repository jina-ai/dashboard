import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { nanoid } from "nanoid"
import { reduce } from "lodash"
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  Divider,
} from "@material-ui/core"

import { Close, Add } from "@material-ui/icons"
import {
  fileToBase64,
  formatDocumentRequest,
  parseDocumentRequest,
} from "../../helpers/utils"

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

export const DocumentRequest = ({ requestBody, setRequestBody }: Props) => {
  const [textDocuments, setTextDocuments] = useState("")
  const [uris, setURIs] = useState<string[]>([])
  const [showCustom, setShowCustom] = useState(false)
  const [rows, setRows] = useState<string[]>([])
  const [keys, setKeys] = useState<{ [key: string]: string }>({})
  const [values, setValues] = useState<{ [key: string]: string }>({})

  const toggleShowCustom = () => setShowCustom((prev) => !prev)

  useEffect(() => {
    const {
      rows: initialRows,
      keys: initialKeys,
      values: initialValues,
      text: initialText,
      uris: initialURIs,
    } = parseDocumentRequest(requestBody)

    setTextDocuments(initialText)
    setRows(initialRows.length ? initialRows : [nanoid()])
    setValues(initialValues)
    setKeys(initialKeys)
    setURIs(initialURIs)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleUpdate = async () => {
      const formattedBody = await formatDocumentRequest(
        textDocuments,
        uris,
        rows,
        keys,
        values
      )
      setRequestBody(formattedBody)
    }
    handleUpdate()
  }, [textDocuments, uris, rows, keys, values, setRequestBody])

  const addRow = () => {
    const rowId = nanoid()
    setRows((prev) => {
      return [...prev, rowId]
    })
  }

  const handleFileSelect = async (files: FileList | null) => {
    const uris: string[] = []
    const filesArray = Array.from(files || [])

    for (let file of filesArray) {
      const uri = await fileToBase64(file)
      uris.push(uri)
    }

    setURIs(uris)
  }

  const removeRow = (rowId: string) => {
    const index = rows.indexOf(rowId)
    setRows((prev) => {
      prev.splice(index, 1)
      return prev.length === 0 ? [nanoid()] : [...prev]
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
    setURIs([])
  }

  const numCustomFields = reduce(
    rows,
    (acc, rowId) => {
      if (values[rowId] && keys[rowId]) return acc + 1
      return acc
    },
    0
  )

  return (
    <>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              label="Text Documents"
              placeholder="Text Documents"
              variant="outlined"
              multiline
              minRows={3}
              maxRows={25}
              type="custom-text"
              value={textDocuments}
              onChange={(e) => setTextDocuments(e.target.value)}
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
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <label htmlFor="attach-files-button">
            <Button size="large" component="span">
              Select Files
            </Button>
          </label>
          {uris?.length ? (
            <Box display="inline" marginLeft={3}>
              {uris.length} files selected{" "}
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
        <Box width="100%">
          <Divider />
          {rows.map((id) => (
            <Grid key={id} container spacing={2} paddingTop={3}>
              <Grid item xs={4}>
                <TextInput
                  label="Key"
                  placeholder="Text Query"
                  variant="outlined"
                  type="custom-input"
                  value={keys[id] || ""}
                  onChange={(e) => setKey(id, e.target.value)}
                />
              </Grid>
              <Grid item xs={7}>
                <TextInput
                  label="Value"
                  placeholder="Text Query"
                  variant="outlined"
                  type="custom-input"
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
    </>
  )
}

const DocumentCard = styled(Card)`
  textarea {
    min-height: auto !important;
    background: none;
    border: none;
    padding: none !important;
    font-size: 1rem;
    font-family: inherit !important;
    font-weight: 400;
  }

  textarea:focus {
    border: none;
  }
`

export const DocumentRequestCard = ({ requestBody, setRequestBody }: Props) => {
  let numDocuments = 0

  try {
    const req = JSON.parse(requestBody)
    numDocuments = req.data.length
  } catch (e) {}

  return (
    <DocumentCard>
      <CardHeader
        title={`Documents (${numDocuments})`}
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
        <DocumentRequest
          requestBody={requestBody}
          setRequestBody={setRequestBody}
        />
      </CardContent>
    </DocumentCard>
  )
}

const Request = ({ requestBody, setRequestBody }: Props) => {
  const [tab, setTab] = useState(0)

  return (
    <Card>
      <CardHeader
        title="Request Body"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
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
              <DocumentRequest
                requestBody={requestBody}
                setRequestBody={setRequestBody}
              />
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
      </CardContent>
    </Card>
  )
}

export default Request
