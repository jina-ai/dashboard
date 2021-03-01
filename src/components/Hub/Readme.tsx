import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody } from "shards-react"
import { getDocumentationHTML } from "../../services/hubApi"
import SpinningLoader from "../Common/SpinningLoader"

type Props = {
  documentation: string
}

export default function ReadMe({ documentation }: Props) {
  let [readme, setReadme] = useState("")
  useEffect(() => {
    ;(async () => {
      const readmeHTML = await getDocumentationHTML(documentation)
      setReadme(readmeHTML)
    })()
  }, [documentation])
  return (
    <Card className="readme-container mb-4">
      <CardHeader className="border-bottom d-flex flex-row">
        <h6 className="m-0 d-inline-block">README.md</h6>
        <div className="flex-fill d-inline-block" />
        <a
          href={documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary"
        >
          <i className="fab fa-github"></i> View on GitHub
        </a>
      </CardHeader>
      <CardBody>
        {readme ? (
          <div
            className="markup"
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        ) : (
          <SpinningLoader />
        )}
      </CardBody>
    </Card>
  )
}
