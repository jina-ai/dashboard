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
    font-family: "Roboto";
    font-weight: 600;
    line-height: 1.5rem;
    letter-spacing: 0.01rem;
    color: ${(props) => props.theme.palette.text.primary};
  }
  h2 {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.palette.primary.main};
  }
  p {
    font-size: 0.8rem;
    color: ${(props) => props.theme.palette.text.secondary};
    font-family: Roboto;
  }
  a {
    text-decoration: underline;
  }
  .code {
    font-family: "Monaco";
    background: ${(props) => props.theme.palette.grey[200]};
    padding: 0.5rem;
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
