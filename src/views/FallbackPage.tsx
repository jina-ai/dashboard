import React from "react"
import { FallbackProps } from "react-error-boundary"
import Button from "../components/Common/Button"
import { PageTitle } from "../components/Common/PageTitle"

function FallbackPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="main-content-container p-5">
      <div className="page-header mb-4">
        <PageTitle
          title="Error"
          subtitle="This should not have happened"
          className="text-sm-left my-3"
        />
      </div>
      <div className="page-header mb-4">
        <div>
          <p>Something went wrong:</p>
          <pre>
            <code className="text-warning">{error!.message}</code>
          </pre>
        </div>
      </div>
      <div className="page-header">
        <div>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    </div>
  )
}

export { FallbackPage }
