import React, { useState } from "react"

import { Snackbar, IconButton } from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"
import Copy from "../../assets/icons/Copy.svg"
import styled from "@emotion/styled"
import { copyToClipboard } from "../../helpers/utils"

type Props = {
  codeSnippet: string
}

const CodeContainer = styled.div`
  display: flex;
  background: ${(props) => props.theme.palette.grey[200]};
  padding: 0.5rem 1rem;
  border-radius: 0.125rem;
`

const CodeSnippetContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CopyIcon = styled.img`
  margin-left: 0.5rem;
  cursor: pointer;
`

export default function CodeSnippetWithCopy({ codeSnippet }: Props) {
  const [openFeedback, setOpenFeedback] = useState(false)
  const handleCopyClick = () => {
    copyToClipboard(codeSnippet)
    if (!openFeedback) setOpenFeedback(true)
  }
  const handleClose = () => {
    setOpenFeedback(false)
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
    <div>
      <CodeContainer onClick={() => handleCopyClick()}>
        <CodeSnippetContainer>{codeSnippet}</CodeSnippetContainer>
        <CopyIcon src={Copy} />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openFeedback}
          autoHideDuration={1}
          action={action}
          message="Command copied"
        />
      </CodeContainer>
    </div>
  )
}
