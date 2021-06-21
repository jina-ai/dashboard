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
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: 0.01rem;
    color: ${(props) => props.theme.palette.text.primary};
  }
  h2 {
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.01rem;
    color: ${(props) => props.theme.palette.primary.main};
  }
  p {
    font-size: 0.85rem;
    line-height: 1.5rem;
    color: ${(props) => props.theme.palette.text.secondary};
    font-family: Roboto;
  }
  a {
    text-decoration: underline;
  }
  .code,
  pre {
    font-family: "Monaco";
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
