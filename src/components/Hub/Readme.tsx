import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { getDocumentationHTML } from "../../services/hubApi"
import SpinningLoader from "../Common/SpinningLoader"

type Props = {
  documentation: string
}

const ReadmeContainer = styled.div`
  h1 {
    font-size: 1rem;
  }
  h2 {
    font-size: 1rem;
    color: ${(props) => props.theme.palette.primary.main};
  }
  pre {
    background: ${(props) => props.theme.palette.grey[200]};
    padding: 0.5rem;
  }
`

export default function ReadMe({ documentation }: Props) {
  let [readme, setReadme] = useState("")
  useEffect(() => {
    ;(async () => {
      const readmeHTML = await getDocumentationHTML(documentation)
      setReadme(readmeHTML)
    })()
  }, [documentation])
  return (
    <ReadmeContainer>
      {readme ? (
        <div className="markup" dangerouslySetInnerHTML={{ __html: readme }} />
      ) : (
        <SpinningLoader />
      )}
    </ReadmeContainer>
  )
}
