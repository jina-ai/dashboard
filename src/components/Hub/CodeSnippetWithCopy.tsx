import React, { useState } from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CopyIcon from '@material-ui/icons/FileCopyRounded'
import styled from "@emotion/styled";
import {copyToClipboard} from "../../helpers/utils"

type Props = {
  codeSnippet: string
}

const CodeSnippetContainer = styled.div`
  background: ${(props) => props.theme.palette.tagBackground};
`

export default function CodeSnippetWithCopy({codeSnippet}: Props) {
  const [openFeedback, setOpenFeedback] = useState(false)
  const handleCopyClick = () => {
    copyToClipboard(codeSnippet)
    setOpenFeedback(true)
  }
  const handleClose = () => {
    setOpenFeedback(false);
  }
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <Card className="mb-4">
      <CardContent className="py-2 px-3 pt-4 code-usage">
        <CodeSnippetContainer
          onClick={() => handleCopyClick()}
        >
          {codeSnippet}
          <CopyIcon fontSize="small" />
        </CodeSnippetContainer>
        <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openFeedback}
        autoHideDuration={1}
        action={action}
        message="Command copied"
      />
      </CardContent>
    </Card>
  )
}
